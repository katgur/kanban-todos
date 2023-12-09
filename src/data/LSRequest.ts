export const getItem = function(key: string) {
    return new Promise(resolve => {
        setTimeout(() => {
            const response = localStorage.getItem(key);
            resolve(response);
        }, 100);
    });
}

export const setItem = function(key: string, value: string) {
    return new Promise(resolve => {
        setTimeout(() => {
            const response = localStorage.setItem(key, value);
            resolve(response);
        }, 100);
    });
}

export default { getItem, setItem };