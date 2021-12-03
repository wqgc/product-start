class Utils {
    // Convert USD string to cents
    static toCents(str: string) {
        return Math.floor(parseFloat(str.replace(/,/g, '')) * 100);
    }
}

export default Utils;
