import type { Position } from '../../../../common/types'

const getDistance = (point1: Position, point2: Position) => {
    const dx = point2.x - point1.x
    const dy = point2.y - point1.y
    return {
        dx,
        dy,
        d: Math.sqrt(dx * dx + dy * dy)
    }
}

const isInside = (center: Position, mouse: Position, radius: number) => {
    return getDistance(center, mouse).d <= radius
}

const getIntersection = (startPosition: Position, endPosition: Position, radius: number) => {
    const { dx, dy, d } = getDistance(startPosition, endPosition)
    return {
        d,
        start: {
            x: (radius * dx) / d + startPosition.x,
            y: (radius * dy) / d + startPosition.y
        },
        end: {
            x: endPosition.x - (radius * dx) / d,
            y: endPosition.y - (radius * dy) / d
        }
    }
}

const getBounce = (
    sourcePoint: Position,
    targetPoint: Position,
    validDistance: number,
    isDraggingPoint: boolean,
    isNormalAdjust: boolean, // 普通调整
    isSimplePoint: boolean // 入度 <= 2
) => {
    if (isDraggingPoint) {
        return targetPoint
    }
    const { dx, dy, d } = getDistance(sourcePoint, targetPoint)
    let ratio: number
    // isNormalAdjust 是用在不相连的调整上 如果不需要就删掉
    if (isNormalAdjust) {
        ratio = Math.max(1, validDistance / d)
    } else if (isSimplePoint) {
        ratio = validDistance / d
    } else {
        ratio = d > 0.6 * validDistance && d < 1.2 * validDistance ? 1 : validDistance / d
    }

    // TODO 这里可设置弹性系数
    return {
        x: targetPoint.x - (1 - ratio) * dx * 0.01,
        y: targetPoint.y - (1 - ratio) * dy * 0.01
    }
}

const getEid = (pidA: number, pidB: number) => {
    return 1000 * Math.min(pidA, pidB) + Math.max(pidA, pidB)
}

const checkValidity = (total: number, deletedPoints: number[], ...points: number[]) => {
    for (const point of points) {
        if (!Number.isInteger(point) || point < 0 || point >= total || deletedPoints.includes(point)) {
            return false
        }
    }
    return true
}

export { isInside, getIntersection, getBounce, getEid, checkValidity }
