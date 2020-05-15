if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
}

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;

let request = indexedDB.open('BUDGET_DB', 1);
let db;
request.onsuccess = function (event) {
    console.log('[onsuccess]', request.result);
    db = event.target.result; // === request.result
};
request.onerror = function (event) {
    console.log('[onerror]', request.error);
};
request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
};

function saveRecord(record) {
    const transaction = db.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending');
    store.add(record);
}