const DB_NAME = "JerrysMartDB"
const DB_VERSION = 2

/**
 * This function's purpose is to init an IndexDB at the browser. 
 * @returns {OpenDB} A promise which if resolved, creates de DB.
 */
function openDB(): OpenDB {
  return new Promise((resolve, reject) => {
    // DB creation
    const request: IDBOpenDBRequest = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

      // Articles Store
      if (!db.objectStoreNames.contains("articles")) {
        const articulosStore = db.createObjectStore("articles", {
          keyPath: "id",
          autoIncrement: false,
        });
        articulosStore.createIndex("item", "item", { unique: false});
        articulosStore.createIndex("tax_status", "tax_status", { unique: false });
      }

      if (!db.objectStoreNames.contains("sells")) {
        const receiptsStore = db.createObjectStore("sells", {
          keyPath: "id",
          autoIncrement: true,
        })
        receiptsStore.createIndex("date", "date", { unique: false })
      }
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onerror = (event: Event) => {
      const error = (event.target as IDBOpenDBRequest).error;
      reject(error);
    };
  });
}

window.openDB = openDB;