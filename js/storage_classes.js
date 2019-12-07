var useLocalStorage = false;
function isOnline() {
    return window.navigator.onLine;
}

class LocalStorage {
    constructor() {
    }
    add(key, value) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            alert("Local storage")
        } catch (exeption) {
            if (exeption == 'QUOTA_EXCEEDED_ERR') {
                alert("Local storage is overflowed");
            }
        }
    }

    get(key, callback) {
        callback(JSON.parse(window.localStorage.getItem(key)));
    }

    delete(key) {
        window.localStorage.removeItem(key);
    }
}


class IndexedDB {



    constructor() {
        this.request = window.indexedDB.open("beatles_db", 1);
        this.request.onerror = () => {
            alert("Rejected " + event.target.errorCode);
        };
        this.request.onsuccess = () => {
            this.indexed_db = this.request.result;
        };
        this.request.onupgradeneeded = () => {
            this.indexed_db = this.request.result;
            this.indexed_db.createObjectStore("fans_appeal", { keyPath: "id", autoIncrement: true });
            this.indexed_db.createObjectStore("news", { keyPath: "id", autoIncrement: true });
        };
    }

    add(key, value) {
        var transaction = this.indexed_db.transaction(key, "readwrite");
        var objectStore = transaction.objectStore(key);
        objectStore.clear();
        for (var i = 0; i < value.length; i++) {
            objectStore.add(value[i]);
        }
        // this.request.onsuccess = () => {
        //     callback(this.request.result);
        // }
    }

    get(key, callback) {
        if (this.indexed_db != null) {
            var transaction = this.indexed_db.transaction(key, "readwrite");
            var objectStore = transaction.objectStore(key);
            var request = objectStore.getAll();
            request.onsuccess = function() {
                callback(request.result);
            }
        }
    }
    delete(key,) {
        if (this.indexed_db != null) {
            var transaction = this.indexed_db.transaction(key, "readwrite");
            var objectStore = transaction.objectStore(key);
            objectStore.clear();
            // this.request.onsuccess = () => {
            //     callback(this.request.result);
            // }
        }
    }
}

var Storage = function () {
    this.storage = !useLocalStorage ? new IndexedDB() : new LocalStorage();
}

storage = new Storage();