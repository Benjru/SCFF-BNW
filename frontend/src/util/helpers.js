const removeItemFromArray = (array, item) => {
    let removed = false;
    let i = 0;
    while (i < array.length && !removed){
        if(array[i]===item){
            array.splice(i,1);
            i--;
            removed = true;
        }
        i++;
    }
    return array;
}

export {removeItemFromArray};