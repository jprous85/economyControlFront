

const deleteElement = (jsonValue: string, value: string | number | null): string => {

    if (!value) return jsonValue;

    const array = JSON.parse(jsonValue);
    const index = array.indexOf(value);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
    return JSON.stringify(array);
}

export default deleteElement;
