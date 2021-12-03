class Utils {
    // Convert USD string to cents
    static toCents(str) {
        return Math.floor(parseFloat(str.replace(/,/g, '')) * 100);
    }
}
export default Utils;
//# sourceMappingURL=utils.js.map