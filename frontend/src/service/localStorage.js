export function removeItem(item) {
    window.localStorage.removeItem(item);
}

export function getItem(item) {
    window.localStorage.getItem(item);
}

export function addItem(localStorageName, item) {
    const result = window.localStorage.setItem(localStorageName,item);
    console.log(result);
}