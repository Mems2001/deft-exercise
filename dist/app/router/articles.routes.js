"use strict";
const articleRoutes = {
    "api/articles": {
        GET: getAllArticles
    },
    "api/articles/inventory": {
        POST: postInventory,
        GET: getInventoryFile
    }
};
