const formatTime = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return {
        year,
        month,
        day
    }
}

const isToday = (date: Date) => {
    const { year, month, day } = formatTime(new Date())
    return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year
}

const isCurMonth = (date: Date, month: number, year: number) => {
    return date.getMonth() === month && date.getFullYear() === year
}

const getEngMonth = (month: number, size: string) => {
    return size !== 'mini'
        ? [
              null,
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
          ][month]
        : [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]
}

const getDateName = (year: number, month: number, lang: string, size: string) => {
    return lang === 'zh' ? `${year}年${month}月` : `${getEngMonth(month, size)} ${year}`
}

const getWeekName = (lang: string, mondayFirst: boolean) => {
    const week = lang === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['日', '一', '二', '三', '四', '五', '六']
    if (mondayFirst) {
        week.push(week.shift()!)
    }
    return week
}

export { formatTime, isToday, isCurMonth, getDateName, getWeekName }
