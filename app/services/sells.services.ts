interface Receipt {
  id?: number;          
  date: string;         
  items_amount: number; 
  subtotal: number;
  tax: number;
  total: number;
  cash: number;
  change: number;   
  items: Array<{ item: string; quantity: number; unit_price: number, total: number }>;
}

async function createReceipt(receipt: Receipt): Promise<boolean> {
  if (!window.db) throw new Error("DB not initialized");

  return new Promise<boolean>((resolve, reject) => {
    const tx = window.db.transaction("sells", "readwrite");
    const store = tx.objectStore("sells");

    const req = store.add(receipt);

    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);

    tx.onerror = () => reject(tx.error);
  });
}

async function findAllReceipts(): Promise<Receipt[]> {
  if (!window.db) throw new Error("DB not initialized");

  return new Promise<Receipt[]>((resolve, reject) => {
    const tx = window.db.transaction("sells", "readonly");
    const store = tx.objectStore("sells");

    const req = store.getAll();

    req.onsuccess = () => resolve(req.result as Receipt[]);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Converts all receipts into a downloadable .txt file
 */
function exportReceipt(): void {
  if (!window.db) throw new Error("DB not initialized");

}

window.sellsService = {
  createReceipt,
  findAllReceipts,
  exportReceipt
};
