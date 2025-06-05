class Conciser {
    constructor() {
        if (this.constructor == Conciser) {
            throw new Error("Abstract classes can't be instantiated.")
        }
    }

    conciseThisText() {
        throw new Error("Method 'say()' must be implemented.")
    }
}

export default Conciser
