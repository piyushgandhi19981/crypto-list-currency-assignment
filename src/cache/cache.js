import axios from 'axios';

const DB_NAME = 'ApiCache';
const STORE_NAME = 'Responses';
const DB_VERSION = 1;

/**
 * Initialize the IndexedDB database.
 */
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'url' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

/**
 * Store API response in IndexedDB.
 * @param {string} url - API URL.
 * @param {any} data - Response data.
 */
const setCache = async (url, data) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    store.put({ url, data, timestamp: Date.now() });

    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Retrieve cached API response from IndexedDB.
 * @param {string} url - API URL.
 * @returns {any|null} - Cached data or null if not found.
 */
const getCache = async (url) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.get(url);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Clear cache older than a certain time limit.
 * @param {number} timeLimit - Time in milliseconds.
 */
const clearOldCache = async (timeLimit) => {
  const db = await initDB();
  const cutoffTime = Date.now() - timeLimit;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.openCursor();

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const { timestamp } = cursor.value;
        if (timestamp < cutoffTime) {
          cursor.delete();
        }
        cursor.continue();
      }
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Axios wrapper with caching.
 * @param {Object} config - Axios request configuration.
 * @param {number} cacheTime - Cache duration in milliseconds (default: 5 minutes).
 */
export const axiosWithCache = async (config, cacheTime = 300000) => {
  const url = config.url;

  // Clear old cache
  await clearOldCache(cacheTime);

  // Check cache
  const cachedResponse = await getCache(url);
  if (cachedResponse && Date.now() - cachedResponse.timestamp <= cacheTime) {
    console.log('Returning cached data for:', url);
    return cachedResponse;
  }

  // Fetch from API
  try {
    const response = await axios(config);
    // Cache response
    await setCache(url, response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
