const Capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export default Capitalize;
