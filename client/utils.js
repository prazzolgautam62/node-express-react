function setToStorage(key, value) {
    localStorage.setItem(btoa(key), value);
}
function getFromStorage(key) {
    return localStorage.getItem(btoa(key));
}
function clearFromStorage(key) {
    localStorage.removeItem(btoa(key));
}

function checkEmptyObject(objToCheck) {
    return (
        Object.keys(objToCheck).length === 0 &&
        objToCheck.constructor === Object
    );
}

export { setToStorage, getFromStorage, clearFromStorage, checkEmptyObject };
