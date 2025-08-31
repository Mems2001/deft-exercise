async function findAllArticles(): Promise<Article[]> {

  if (!window.db) throw new Error("DB not initialized")

  const tx = window.db.transaction("articles", "readonly")
  const store = tx.objectStore("articles")

  return new Promise<Article[]>((resolve, reject) => {
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result as Article[])
    req.onerror = () => reject(req.error)
  })
}

async function createInventory(files:any): Promise<boolean> {
  if (!window.db) throw new Error("DB not initialized")

  let totalArticles:Article[] = []
  for (const file of files) {
    const text = await file.text()
    console.log(text)
    const articles = parseInventory(text)
    console.log(articles)
    totalArticles = [...totalArticles, ...articles]
  }

    return new Promise<boolean>((resolve, reject) => {
      const tx = window.db.transaction("articles", "readwrite")
      const store = tx.objectStore("articles")

      for (const article of totalArticles) {
        const req = store.add({ id: generateUUID(), ...article });
        req.onerror = () => reject(req.error);
      }

    tx.oncomplete = () => resolve(true)
    tx.onerror = () => reject(tx.error)
  })
}

/**
 * Converts an articles array from the DB into a .txt file ready to be sent to the controller, then the front-end, to finally be downloaded.
 * @returns 
 */
async function exportInventory():Promise<File|null> {
  if (!window.db) throw new Error("DB not initialized")
  
  try {
    const allArticles = await findAllArticles()
  
    const lines = allArticles.map(a => 
      `${a.item}: ${a.quantity}, $${a.regular_price.toFixed(2)}, $${a.member_price.toFixed(2)}, ${a.tax_stratus}`
    )
  
    const fileContent = lines.join("\n")
  
    const txtFile = stringToTxtFile(fileContent)
  
    return txtFile
  } catch (error) {
    return null
  }
}

window.articlesService = {
  findAllArticles,
  createInventory,
  exportInventory
}