

const includeElement = (jsonValue: string, value: string | number | null): string => {

    if (!value) return jsonValue;

    const array = JSON.parse(jsonValue);
    array.push(value);
    return JSON.stringify(array);
}

export default includeElement;
