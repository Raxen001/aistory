class audioGen {
    constructor() {
        if (this.constructor == audioGen) {
            throw new Error("Abstract classes can't be instantiated.")
        }
    }

    /**
     * Should have the following params
     *
     * @param userInputText
     */
    GenerateAudio() {
        throw new Error("Method 'say()' must be implemented.")
    }
}

export default audioGen
