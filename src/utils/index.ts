export const getDate = () => {
    const date = new Date().toJSON().split('T');
    const time = date[1].split(':');
    return `${date[0]} ${time[0]}:${time[1]}`;
}