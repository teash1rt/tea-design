import { PropType } from 'vue'
import type { Position } from '../../../../common/types'
import type { DeepRequired } from '../../../../common/generics'
import { merge } from '../../../../common/functions'
import { throwError } from '../../../../common/errors'
import { isNumber } from '../../../../common/checks'

const GraphProps = {
    context: {
        type: Object as PropType<GraphContext>,
        default: (): GraphContextRequired => defaultContext,
        validator(value: GraphContext) {
            const defaultContextCopy = JSON.parse(JSON.stringify(defaultContext))
            const mergeContext = merge(defaultContextCopy, value) as GraphContextRequired
            const count = mergeContext.point.pointCount
            if (mergeContext.point.initialPosition.length !== count) {
                throwError('graph -> initialPosition', '点的初始位置未全部正确初始化')
            }

            for (const edge of mergeContext.edge.connectionStatus) {
                if (edge[0] >= count || edge[1] >= count) {
                    throwError('graph -> connectionStatus', '连接情况应在0 ~ pointCount - 1之间')
                }
            }

            if (!isNumber(mergeContext.point.radius)) {
                return false
            }

            return true
        }
    }
}

type PointContext = {
    pid: number
    initialPosition: Position
    radius: number
    content: number | string
    positionUpdate(pid: number, position: Position): void
    arcColor: string
    fillColor: string
    fontColor: string
    withoutAnimation: boolean
}

type EdgeContext = {
    eid: number
    radius: number
    startPosition: Position
    endPosition: Position
    color: string
    withoutAnimation: boolean
}

type TextContext = {
    content: string
    position: Position
    fontColor: string
    fontStyle: string
    withoutAnimation: boolean
}

type GraphContext = {
    style?: {
        canvasWidth?: number
        canvasHeight?: number
    }
    point?: {
        pointCount?: number
        radius?: number
        content?: (string | number)[]
        initialPosition?: Position[]
        arcColor?: string
        fillColor?: string
        fontColor?: string
        withoutRepulsion?: boolean
    }
    edge?: {
        connectionStatus?: number[][]
        distance?: number
        color?: string
    }
}

type GraphContextRequired = DeepRequired<GraphContext>

const defaultContext: GraphContextRequired = {
    style: {
        canvasWidth: 1000,
        canvasHeight: 800
    },
    point: {
        pointCount: 3,
        radius: 22,
        content: [0, 1, 2],
        initialPosition: [
            { x: 300, y: 100 },
            { x: 500, y: 100 },
            { x: 400, y: 245 }
        ],
        arcColor: '#000000',
        fillColor: '#ffffff',
        fontColor: '#000000',
        withoutRepulsion: false
    },
    edge: {
        connectionStatus: [
            [0, 1],
            [1, 2],
            [0, 2]
        ],
        distance: 150,
        color: '#000000'
    }
}

export { GraphProps, defaultContext }

export type { PointContext, EdgeContext, TextContext, GraphContext, GraphContextRequired }
