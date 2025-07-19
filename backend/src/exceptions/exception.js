function handleError(error) {
    if (error instanceof Error) {
        console.error(` [${new Date().toISOString()}] [${error.name}] - ${error.message}`)
        console.error(error.stack);
    } else {
        console.error('[UNEXPECTED ERROR] - ', error)
    }
}

export default handleError
