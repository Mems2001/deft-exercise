async function findAllArticles(): Promise<Article[]> {

  if (!window.db) throw new Error("DB not initialized");

  const tx = window.db.transaction("articles", "readonly");
  const store = tx.objectStore("articles");

  return new Promise<Article[]>((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result as Article[]);
    req.onerror = () => reject(req.error);
  });
}

window.articlesService = {
  findAllArticles
}