class TeaDesignError extends Error {
    constructor(msg: string) {
        super(msg)
        this.name = 'TeaDesign'
    }
}

const throwError = (component: string, msg: string) => {
    throw new TeaDesignError(`[${component}] ${msg}`)
}

export { throwError }
