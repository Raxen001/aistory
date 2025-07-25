function handleError(message , error) {
    if (error instanceof Error) {
        console.error(` [${new Date().toISOString()}] : ${message} -  [${error.name}] - ${error.message}`)
        console.error(error.stack);
    } else {
        console.error('[UNEXPECTED ERROR] - ', error)
    }
}

export default handleError
