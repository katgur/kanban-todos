export const getItem = function(key) {
    return new Promise(resolve => {
        setTimeout(() => {
            const response = localStorage.getItem(key);
            resolve(response);
        }, 500);
    });
}

export const setItem = function(key, value) {
    return new Promise(resolve => {
        setTimeout(() => {
            const response = localStorage.setItem(key, value);
            resolve(response);
        }, 500);
    });
}

export default { getItem, setItem };