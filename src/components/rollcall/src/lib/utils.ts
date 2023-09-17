const shuffle = <T>(target: T[]): T[] => {
    const array = [...target]
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const temp = array[randomIndex]
        array[randomIndex] = array[i]
        array[i] = temp
    }
    return array
}

export { shuffle }
