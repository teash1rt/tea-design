const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${date.getFullYear()}-${month}-${day}`
}

const verifyDateString = (dateString: string) => {
    // 验证字符串是否是 YYYY-MM-DD 且合理的形式
    const pattern = /^\d{4}-\d{2}-\d{2}$/
    return pattern.test(dateString) && new Date(dateString).toString() !== 'Invalid Date'
}

export { formatDate, verifyDateString }
