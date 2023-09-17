import type { Position } from '../../../../common/types'

const position = (i: number, radius: number, edgeCount: number, canvasSize: number) => {
    const deg = (((i * 360) / edgeCount - 45) * Math.PI) / 180
    return {
        x: radius * Math.sin(deg) + radius * Math.cos(deg) + canvasSize / 2,
        y: radius * Math.sin(deg) - radius * Math.cos(deg) + canvasSize / 2
    }
}

const isOnPoint = (x1: number, y1: number, x2: number, y2: number, dis: number) => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= dis
}

const isOnSegment = (x1: number, y1: number, x2: number, y2: number, x: number, y: number, threshold: number) => {
    const minX = Math.min(x1, x2)
    const maxX = Math.max(x1, x2)
    const minY = Math.min(y1, y2)
    const maxY = Math.max(y1, y2)
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
        const dx = x2 - x1
        const dy = y2 - y1
        const px = x - x1
        const py = y - y1
        const distance = Math.abs(dx * py - dy * px) / Math.sqrt(dx * dx + dy * dy)
        if (distance <= threshold) {
            return true
        }
    }
    return false
}

// 判断鼠标和多边形位置关系
const isInside = (point: Position, vertices: Position[], isFill: boolean) => {
    let inside = false
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x
        const yi = vertices[i].y
        const xj = vertices[j].x
        const yj = vertices[j].y

        const isOnOutline = isOnPoint(xi, yi, point.x, point.y, 10) || isOnSegment(xi, yi, xj, yj, point.x, point.y, 5)
        const isContained = yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi
        if (isOnOutline) {
            return true
        }

        if (isFill && isContained) {
            inside = !inside
        }
    }
    return inside
}

// 悬浮时提高亮度
const lightenColor = (color: string) => {
    if (color.startsWith('rgb(') && color.endsWith(')')) {
        const values = color.slice(4, -1).split(',')
        const r = parseInt(values[0].trim(), 10)
        const g = parseInt(values[1].trim(), 10)
        const b = parseInt(values[2].trim(), 10)
        const newR = r + (255 - r) * 0.25
        const newG = g + (255 - g) * 0.25
        const newB = b + (255 - b) * 0.25
        return `rgb(${newR}, ${newG}, ${newB})`
    } else if (color.startsWith('rgba(') && color.endsWith(')')) {
        const values = color.slice(5, -1).split(',')
        const r = parseInt(values[0].trim(), 10)
        const g = parseInt(values[1].trim(), 10)
        const b = parseInt(values[2].trim(), 10)
        const a = parseFloat(values[3].trim())
        const newR = r + (255 - r) * 0.25
        const newG = g + (255 - g) * 0.25
        const newB = b + (255 - b) * 0.25
        return `rgba(${newR}, ${newG}, ${newB}, ${a})`
    } else if (color.startsWith('#') && (color.length === 4 || color.length === 7)) {
        const num = parseInt(color.substring(1), 16)
        const r = (num >> 16) & 255
        const g = (num >> 8) & 255
        const b = num & 255
        const newR = r + (255 - r) * 0.25
        const newG = g + (255 - g) * 0.25
        const newB = b + (255 - b) * 0.25
        return `#${((1 << 24) | (newR << 16) | (newG << 8) | newB).toString(16).slice(1)}`
    }
    return color
}

export { position, isInside, lightenColor }
