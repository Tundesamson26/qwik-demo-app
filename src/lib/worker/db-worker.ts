import { client as api } from '../ts-rest/client';
import { initDB } from '../indexDB';

let db: IDBDatabase | null = null;

async function syncWithAPI() {
  const { status, body } = await api.getItems();
  if (status === 200) {
    const transaction = db!.transaction(['items'], 'readwrite');
    const store = transaction.objectStore('items');
    await Promise.all(body.map(item => new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onerror = reject;
      request.onsuccess = resolve;
    })));
    return body;
  }
  throw new Error('Failed to fetch items from API');
}

self.onmessage = async (event) => {
  const { type, payload } = event.data;
  
  if (!db) {
    db = await initDB();
  }

  switch (type) {
    case 'SYNC_ITEMS':
      try {
        const items = await syncWithAPI();
        self.postMessage({ type: 'ITEMS_SYNCED', payload: items });
      } catch (error) {
        self.postMessage({ type: 'ERROR', payload: error });
      }
      break;
    case 'ADD_ITEM':
      try {
        const { status, body } = await api.addItem({ body: payload });
        if (status === 201) {
          const transaction = db.transaction(['items'], 'readwrite');
          const store = transaction.objectStore('items');
          const request = store.add(body);
          request.onsuccess = () => {
            self.postMessage({ type: 'ITEM_ADDED', payload: body });
          };
        } else {
          throw new Error('Failed to add item to API');
        }
      } catch (error) {
        self.postMessage({ type: 'ERROR', payload: error });
      }
      break;
    case 'RETRIEVE_ITEMS':
      try {
        const transaction = db.transaction(['items'], 'readonly');
        const store = transaction.objectStore('items');
        const request = store.getAll();
        request.onsuccess = () => {
          self.postMessage({ type: 'ITEMS_RETRIEVED', payload: request.result });
        };
      } catch (error) {
        self.postMessage({ type: 'ERROR', payload: error });
      }
      break;
  }
};
