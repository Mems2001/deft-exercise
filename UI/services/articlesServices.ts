class ArticlesServices {
  static async getAllArticles(): Promise<Article[]|undefined> {
    try {
        const res = await simulateRequest("api/articles", "GET")

        console.log("Articles:", res)

        return res.data
    } catch(error:any) {
        throw new Error(`HTTP error! error: ${error.message}`)
    }
  }
}

window.ArticlesServices = ArticlesServices