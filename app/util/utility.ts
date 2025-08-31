function generateUUID(): string {
  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  });
}

function formatDateDDMMYYYY(date: Date | string): string {
  const d = new Date(date)
  const day = d.getDate().toString().padStart(2, "0")
  const month = (d.getMonth() + 1).toString().padStart(2, "0")
  const year = d.getFullYear()
  return `${day}${month}${year}`
}

/**
 * This function obtains an Array of Article type elements parsing them from each line of a .txt inventory file.
 * @param {string} txt The string obtained from the .txt file. 
 * @returns {Article[]} An Array of Articles
 */
function parseInventory(txt: string): Article[] {
  const lines = txt.split("\n").map(l => l.trim()).filter(l => l.length > 0);

  const articles: Article[] = lines.map(line => {
    let [itemNquantity, regular_priceA, member_priceA, tax_statusA] = line.split(",")
    if (!(itemNquantity && regular_priceA && member_priceA && tax_statusA)) throw new Error(`Incomplete article at: ${line}`);

    let [itemA, quantityA] = itemNquantity.split(':')

    const item = itemA.trim()
    const quantity = Number(quantityA.trim())
    const regular_price = Number(regular_priceA.trim().replace("$", ""))
    const member_price = Number(member_priceA.trim().replace("$", ""))
    const tax_status = tax_statusA.trim() as "Taxable" | "Tax-Exempt"

    return {
      id: generateUUID(),
      item,
      quantity,
      regular_price,
      member_price,
      tax_status,
    }
  })

  return articles
}

/**
 * Use it to convert a string to a .txt file, ideal to send back the inventory.
 * @param content 
 * @param filename 
 * @returns 
 */
function stringToTxtFile(content: string, filename:string = "updated-inventory.txt"): File {
    const blob = new Blob([content], { type: "text/plain" })
    return new File([blob], filename, { type: "text/plain" })
}

async function cartItemToReceiptItem(cartItem: Article):Promise<ReceiptItem> {
  const price_type: PriceType = cartItem.customer === "Regular Customer" ? "regular_price" : "member_price" 
  const article = await findArticleByItem(cartItem.item)
  console.log("found:", article)

  return {
    item: cartItem.item,
    quantity: cartItem.quantity,
    unit_price: article[price_type],
    total: cartItem[price_type]
  }
}

function receiptToTxt(receipt: Receipt): File {
  const dateStr = new Date(receipt.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stringId = receipt.id!.toString()
  const transactionId = stringId.padStart(6, "0") || "000000"

  const itemsLines = receipt.items.map(i => {
    const total = i.total ?? i.quantity * i.unit_price
    return `${i.item} ${i.quantity} $${i.unit_price.toFixed(2)} $${total.toFixed(2)}`
  })

  const divider = "*".repeat(36);

  let savingsLine:string|null = null
  if (receipt.savings > 0) {
    savingsLine = `YOU SAVED: $${receipt.savings.toFixed(2)}!`
  }

  const textString = [
    dateStr,
    `TRANSACTION: ${transactionId}`,
    "ITEM QUANTITY UNIT PRICE TOTAL",
    ...itemsLines,
    divider,
    `TOTAL NUMBER OF ITEMS SOLD: ${receipt.items_amount}`,
    `SUB-TOTAL: $${receipt.subtotal.toFixed(2)}`,
    `TAX: $${receipt.tax.toFixed(2)}`,
    `TOTAL: $${receipt.total.toFixed(2)}`,
    `CASH: $${receipt.cash.toFixed(2)}`,
    `CHANGE: $${receipt.change.toFixed(2)}`,
    divider,
    savingsLine ?? ''
  ].filter(Boolean).join("\n")

  const dateForFileName = formatDateDDMMYYYY(receipt.date)
  const fileName = `transaction_${transactionId}_${dateForFileName}`

  return stringToTxtFile(textString, fileName)
}