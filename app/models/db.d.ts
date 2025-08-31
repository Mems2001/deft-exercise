interface DBArticle {
    id: string,
    item: string,
    quantity: number,
    regular_price: number,
    member_price: number,
    tax_status: "Taxable" | "Tax-Exempt"
}

interface Article {
    item: string,
    quantity: number,
    regular_price: number,
    member_price: number,
    tax_status: "Taxable" | "Tax-Exempt",
    customer?: CustomerType
}

interface Receipt {
  id?: number         
  date: Date        
  items_amount: number
  subtotal: number
  tax: number
  total: number
  cash: number
  change: number
  savings: number,
  items: Array<ReceiptItem>
}

interface Cart {
    items: Array<Article>,
    subtotal: number,
    tax: number,
    total: number,
    cash: number,
    change: number,
    savings: number
}

interface ReceiptItem {
    item: string,
    quantity: number,
    unit_price: number,
    total: number
}