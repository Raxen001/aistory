class textToSpeech {
    constructor() {
        if (this.constructor === textToSpeech) {
            throw new Error("Abstract classes can't be instantiated.")
        }
    }

    /**
     * Should be implemented by subclass.
     * @param {string} text
     * @param {string} outputFileName
     */
    convertThisText(text, outputFileName) {
        throw new Error("Method 'convertThisText()' must be implemented.")
    }
}

export default textToSpeech
