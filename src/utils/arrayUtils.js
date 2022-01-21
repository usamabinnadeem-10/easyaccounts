export const findItemInArray = (itemToFind, array, key=null) => {
    console.log(itemToFind, array);
    return array.find((current) => {
        if (typeof current === 'object') {
            return current[key] === itemToFind;
        }else {
            return current === itemToFind;
        }
    })
}