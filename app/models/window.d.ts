interface Window {
    db: IDBDatabase,
    api_routes: any,

    articlesService: {
        findAllArticles():Promise<Article[]>,
        createInventory(files:any):Promise<boolean>,
        exportInventory():void
    }
}