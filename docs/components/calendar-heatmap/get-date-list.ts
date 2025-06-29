const getDateString = (offset: number) => {
    const date = new Date()
    const newDate = new Date(date.setDate(date.getDate() - offset))
    const year = newDate.getFullYear()
    const month = String(newDate.getMonth() + 1).padStart(2, '0')
    const day = String(newDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export const LIST1 = [
    getDateString(73),
    getDateString(68),
    getDateString(63),
    getDateString(62),
    getDateString(60),
    getDateString(53),
    getDateString(49),
    getDateString(44),
    getDateString(38),
    getDateString(33),
    getDateString(22),
    getDateString(9),
    getDateString(3)
]

export const LIST1_FOR_MD = LIST1.map(item => `'${item}'`)

export const LIST2 = [
    getDateString(23),
    getDateString(24),
    getDateString(34),
    getDateString(40),
    getDateString(45),
    getDateString(53),
    getDateString(20),
    getDateString(15),
    getDateString(20),
    getDateString(30),
    getDateString(4),
    getDateString(6),
    getDateString(0)
]

export const LIST2_FOR_MD = LIST2.map(item => `'${item}'`)
