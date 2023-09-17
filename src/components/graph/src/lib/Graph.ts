import { CanvasObject } from '../../../../common/canvas'
import { Point } from './Point'
import { Edge } from './Edge'
import { Text } from './Text'
import type { Position } from '../../../../common/types'
import type { PointContext, EdgeContext, GraphContextRequired } from './settings'
import * as utils from './utils'
import { getRandomId } from '../../../../common/functions'

export class Graph extends CanvasObject {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    graph: { [key: number]: number[] }
    context: GraphContextRequired
    mouse: Position
    mousedown: boolean
    points: Point[]
    edges: Edge[]
    deletedPoints: number[]
    edgesMap: { [key: number]: number }
    textsMap: { [key: string]: Text }
    draggingPoint: number | null
    dragOffset: Position
    sysLock: boolean
    userLock: boolean
    constructor(canvas: HTMLCanvasElement, context: GraphContextRequired) {
        super()
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')!
        this.graph = {}
        this.context = context
        this.mouse = { x: 0, y: 0 }
        this.mousedown = false
        this.points = []
        this.edges = []
        this.deletedPoints = []
        this.edgesMap = {}
        this.textsMap = {}
        this.draggingPoint = null
        this.dragOffset = { x: 0, y: 0 }
        this.sysLock = false
        this.userLock = false
        this.canvas.addEventListener('mousemove', e => {
            const canvasRect = this.canvas.getBoundingClientRect()
            this.mouse.x = e.x - canvasRect.left
            this.mouse.y = e.y - canvasRect.top
        })
        this.canvas.addEventListener('mousedown', () => {
            this.mousedown = true
        })
        this.canvas.addEventListener('mouseup', () => {
            this.mousedown = false
            this.draggingPoint = null
        })
    }

    init(): void {
        for (let i = 0; i < this.context.point.pointCount; i++) {
            this.graph[i] = []
            this.points.push(
                new Point(this.ctx, {
                    pid: i,
                    initialPosition: this.context.point.initialPosition[i],
                    radius: this.context.point.radius,
                    content: this.context.point.content[i] === undefined ? '' : this.context.point.content[i],
                    positionUpdate: this.updatePosition.bind(this),
                    arcColor: this.context.point.arcColor,
                    fillColor: this.context.point.fillColor,
                    fontColor: this.context.point.fontColor,
                    withoutAnimation: true
                } as PointContext)
            )
        }

        for (let i = 0; i < this.context.edge.connectionStatus.length; i++) {
            const eid = utils.getEid(this.context.edge.connectionStatus[i][0], this.context.edge.connectionStatus[i][1])
            if (this.context.edge.connectionStatus[i][0] === this.context.edge.connectionStatus[i][1] || eid in this.edgesMap) {
                continue
            }

            this.graph[this.context.edge.connectionStatus[i][0]].push(this.context.edge.connectionStatus[i][1])
            this.graph[this.context.edge.connectionStatus[i][1]].push(this.context.edge.connectionStatus[i][0])

            this.edges.push(
                new Edge(this.ctx, {
                    eid: eid,
                    radius: this.context.point.radius,
                    startPosition: this.points[this.context.edge.connectionStatus[i][0]].position,
                    endPosition: this.points[this.context.edge.connectionStatus[i][1]].position,
                    color: this.context.edge.color,
                    withoutAnimation: true
                } as EdgeContext)
            )
            this.edgesMap[eid] = i
        }
    }

    update(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (this.draggingPoint === null) {
            for (const [index, point] of this.points.entries()) {
                if (utils.isInside(point.position, this.mouse, this.context.point.radius) && this.mousedown) {
                    this.draggingPoint = index
                    this.dragOffset = {
                        x: this.points[index].position.x - this.mouse.x,
                        y: this.points[index].position.y - this.mouse.y
                    }
                    break
                }
            }
        } else if (!this.isLocked()) {
            this.points[this.draggingPoint].shiftTo({
                x: this.mouse.x + this.dragOffset.x,
                y: this.mouse.y + this.dragOffset.y
            })
            const queue = [this.draggingPoint]
            const flag = Array(this.context.point.pointCount).fill(false)
            while (queue.length) {
                const header = queue.shift()!
                flag[header] = true
                for (const pointIndex of this.graph[header]) {
                    const fixedPosition = utils.getBounce(
                        this.points[header].position,
                        this.points[pointIndex].position,
                        this.context.edge.distance,
                        pointIndex === this.draggingPoint,
                        false,
                        this.graph[pointIndex].length <= 2
                    )
                    this.points[pointIndex].shiftTo(fixedPosition)
                    if (!flag[pointIndex]) {
                        queue.push(pointIndex)
                    }
                }
            }
            if (!this.context.point.withoutRepulsion) {
                for (let i = 0; i < this.points.length; i++) {
                    for (let j = 0; j < this.points.length; j++) {
                        if (i === j) {
                            continue
                        }
                        const fixedPosition = utils.getBounce(
                            this.points[i].position,
                            this.points[j].position,
                            100,
                            false,
                            true,
                            false
                        )
                        this.points[j].shiftTo(fixedPosition)
                    }
                }
            }
        }
    }

    isLocked(): boolean {
        return this.sysLock ? true : this.userLock
    }

    updatePosition(pid: number, position: Position): void {
        if (this.deletedPoints.includes(pid)) {
            return
        }
        this.points[pid].position = position
        for (const pointIndex of this.graph[pid]) {
            const edgeIndex = this.edgesMap[utils.getEid(pid, pointIndex)]
            this.edges[edgeIndex].setPosition(this.points[pointIndex].position, this.points[pid].position)
        }
    }

    async moveTo(targetPoint: number, targetPosition: Position): Promise<void> {
        if (!utils.checkValidity(this.context.point.pointCount, this.deletedPoints, targetPoint)) {
            return
        }
        this.sysLock = true
        await Promise.all([this.points[targetPoint].moveTo(targetPosition, 2)])
        this.sysLock = false
    }

    async swap(pointA: number, pointB: number): Promise<void> {
        if (!utils.checkValidity(this.context.point.pointCount, this.deletedPoints, pointA, pointB) || pointA === pointB) {
            return
        }
        this.sysLock = true
        const positionA = this.points[pointA].position
        const positionB = this.points[pointB].position
        await Promise.all([this.points[pointA].moveTo(positionB, 1), this.points[pointB].moveTo(positionA, 0)])
        this.sysLock = false
    }

    async shallowSwap(pointA: number, pointB: number): Promise<void> {
        if (!utils.checkValidity(this.context.point.pointCount, this.deletedPoints, pointA, pointB) || pointA === pointB) {
            return
        }
        this.sysLock = true
        const recodeMap: { [key: number]: number } = {}
        const positionA = this.points[pointA].position
        const positionB = this.points[pointB].position
        const graph = JSON.parse(JSON.stringify(this.graph))
        for (let i = 0; i < this.graph[pointA].length; i++) {
            const eid = utils.getEid(pointA, this.graph[pointA][i])
            const edgeIndex = this.edgesMap[eid]
            // 防止两点直接联通计算出来的 newEid 是新值
            if (pointB !== this.graph[pointA][i]) {
                const newEid = utils.getEid(pointB, this.graph[pointA][i])
                delete this.edgesMap[eid]
                recodeMap[newEid] = edgeIndex
            }
        }
        for (let i = 0; i < this.graph[pointB].length; i++) {
            const eid = utils.getEid(pointB, this.graph[pointB][i])
            const edgeIndex = this.edgesMap[eid]
            if (pointA !== this.graph[pointB][i]) {
                const newEid = utils.getEid(pointA, this.graph[pointB][i])
                delete this.edgesMap[eid]
                recodeMap[newEid] = edgeIndex
            }
        }
        this.graph[pointA] = []
        this.graph[pointB] = []
        for (const key of Object.keys(this.graph)) {
            for (let i = 0; i < this.graph[Number(key)].length; i++) {
                if (this.graph[Number(key)][i] === pointA || this.graph[Number(key)][i] === pointB) {
                    this.graph[Number(key)].splice(i, 1)
                    i -= 1
                }
            }
        }
        await Promise.all([this.points[pointA].moveTo(positionB, 1), this.points[pointB].moveTo(positionA, 0)])
        this.graph = JSON.parse(JSON.stringify(graph))
        for (let i = 0; i < this.context.edge.connectionStatus.length; i++) {
            for (let j = 0; j <= 1; j++) {
                if (this.context.edge.connectionStatus[i][j] === pointA || this.context.edge.connectionStatus[i][j] === pointB) {
                    this.context.edge.connectionStatus[i][j] = pointA + pointB - this.context.edge.connectionStatus[i][j]
                }
            }
        }
        ;[this.graph[pointA], this.graph[pointB]] = [this.graph[pointB], this.graph[pointA]]
        for (const key of Object.keys(this.graph)) {
            for (let i = 0; i < this.graph[Number(key)].length; i++) {
                if (this.graph[Number(key)][i] === pointA || this.graph[Number(key)][i] === pointB) {
                    this.graph[Number(key)][i] = pointA + pointB - this.graph[Number(key)][i]
                }
            }
        }
        for (const key of Object.keys(recodeMap)) {
            this.edgesMap[Number(key)] = recodeMap[Number(key)]
        }
        this.sysLock = false
    }

    async renderEdge(startPoint: number, endPoint: number, color: string): Promise<void> {
        const eid = utils.getEid(startPoint, endPoint)
        if (
            !utils.checkValidity(this.context.point.pointCount, this.deletedPoints, startPoint, endPoint) ||
            !(eid in this.edgesMap)
        ) {
            return
        }
        this.sysLock = true
        const edgeIndex = this.edgesMap[eid]
        await Promise.all([this.edges[edgeIndex].render(this.points[startPoint].position, this.points[endPoint].position, color)])
        this.sysLock = false
    }

    addPoint(
        content: string | number | undefined,
        position: Position,
        arcColor: string,
        fillColor: string,
        fontColor: string,
        withoutAnimation: boolean
    ): number {
        this.context.point.pointCount += 1
        this.graph[this.context.point.pointCount - 1] = []
        this.points.push(
            new Point(this.ctx, {
                pid: this.context.point.pointCount - 1,
                initialPosition: position,
                radius: this.context.point.radius,
                content: content === undefined ? this.context.point.pointCount - 1 : content,
                positionUpdate: this.updatePosition.bind(this),
                arcColor: arcColor,
                fillColor: fillColor,
                fontColor: fontColor,
                withoutAnimation: withoutAnimation
            } as PointContext)
        )
        return this.context.point.pointCount - 1
    }

    delPoint(targetPoint: number): void {
        if (!utils.checkValidity(this.context.point.pointCount, this.deletedPoints, targetPoint)) {
            return
        }
        for (let i = 0; i < this.context.edge.connectionStatus.length; i++) {
            const pointA = this.context.edge.connectionStatus[i][0]
            const pointB = this.context.edge.connectionStatus[i][1]
            if (pointA === targetPoint || pointB === targetPoint) {
                this.context.edge.connectionStatus.splice(i, 1)
                const eid = utils.getEid(pointA, pointB)
                this.edges[this.edgesMap[eid]].destroy()
                delete this.edgesMap[eid]
                i -= 1
            }
        }
        this.deletedPoints.push(targetPoint)
        delete this.graph[targetPoint]
        for (const key of Object.keys(this.graph)) {
            for (let i = 0; i < this.graph[Number(key)].length; i++) {
                if (this.graph[Number(key)][i] === targetPoint) {
                    this.graph[Number(key)].splice(i, 1)
                    i -= 1
                }
            }
        }
        this.points[targetPoint].destroy()
    }

    addEdge(startPoint: number, endPoint: number, color: string, withoutAnimation: boolean): void {
        const eid = utils.getEid(startPoint, endPoint)
        if (
            !utils.checkValidity(this.context.point.pointCount, this.deletedPoints, startPoint, endPoint) ||
            eid in this.edgesMap
        ) {
            return
        }
        this.context.edge.connectionStatus.push([startPoint, endPoint])
        this.edges.push(
            new Edge(this.ctx, {
                eid: eid,
                radius: this.context.point.radius,
                startPosition: this.points[startPoint].position,
                endPosition: this.points[endPoint].position,
                color: color,
                withoutAnimation: withoutAnimation
            } as EdgeContext)
        )
        this.graph[startPoint].push(endPoint)
        this.graph[endPoint].push(startPoint)
        this.edgesMap[eid] = this.edges.length - 1
    }

    delEdge(startPoint: number, endPoint: number): void {
        const eid = utils.getEid(startPoint, endPoint)
        if (
            !utils.checkValidity(this.context.point.pointCount, this.deletedPoints, startPoint, endPoint) ||
            !(eid in this.edgesMap)
        ) {
            return
        }
        for (let i = 0; i < this.context.edge.connectionStatus.length; i++) {
            const pointA = this.context.edge.connectionStatus[i][0]
            const pointB = this.context.edge.connectionStatus[i][1]
            if ((pointA === startPoint && pointB === endPoint) || (pointB === startPoint && pointA === endPoint)) {
                this.context.edge.connectionStatus.splice(i, 1)
                break
            }
        }
        for (let i = 0; i < this.graph[startPoint].length; i++) {
            if (this.graph[startPoint][i] === endPoint) {
                this.graph[startPoint].splice(i, 1)
                break
            }
        }
        for (let i = 0; i < this.graph[endPoint].length; i++) {
            if (this.graph[endPoint][i] === startPoint) {
                this.graph[endPoint].splice(i, 1)
                break
            }
        }
        this.edges[this.edgesMap[eid]].destroy()
        delete this.edgesMap[eid]
    }

    setPointColor(targetPoint: number, arcColor: string, fillColor: string, fontColor: string, withoutAnimation: boolean): void {
        if (!utils.checkValidity(this.context.point.pointCount, this.deletedPoints, targetPoint)) {
            return
        }
        this.points[targetPoint].setColor(arcColor, fillColor, fontColor, withoutAnimation)
    }

    setContent(targetPoint: number, content: string | number, withoutAnimation: boolean): void {
        if (!utils.checkValidity(this.context.point.pointCount, this.deletedPoints, targetPoint)) {
            return
        }
        this.points[targetPoint].setContent(content, withoutAnimation)
    }

    setEdgeColor(startPoint: number, endPoint: number, color: string, withoutAnimation: boolean): void {
        const eid = utils.getEid(startPoint, endPoint)
        if (
            !utils.checkValidity(this.context.point.pointCount, this.deletedPoints, startPoint, endPoint) ||
            !(eid in this.edgesMap)
        ) {
            return
        }
        this.edges[this.edgesMap[eid]].setColor(color, withoutAnimation)
    }

    setText(content: string, position: Position, fontColor: string, fontStyle: string, withoutAnimation: boolean): string {
        const tid = getRandomId(8)
        this.textsMap[tid] = new Text(this.ctx, { content, position, fontColor, fontStyle, withoutAnimation })
        return tid
    }

    setTextColor(tid: string, color: string, startIndex: number, endIndex: number, withoutAnimation: boolean): void {
        if (!(tid in this.textsMap)) {
            return
        }
        const content: string = this.textsMap[tid].context.content
        if (startIndex > endIndex || content[startIndex] === undefined || content[endIndex] === undefined) {
            return
        }
        this.textsMap[tid].setColor(color, startIndex, endIndex, withoutAnimation)
    }

    delText(tid: string): void {
        if (!(tid in this.textsMap)) {
            return
        }
        this.textsMap[tid].destroy()
        delete this.textsMap[tid]
    }

    async blink(targetPoint: number, count: number, arcColor: string, fillColor: string, fontColor: string): Promise<void> {
        if (!utils.checkValidity(this.context.point.pointCount, this.deletedPoints, targetPoint)) {
            return
        }
        for (let i = 0; i < count; i++) {
            await Promise.all([this.points[targetPoint].blink(arcColor, fillColor, fontColor)])
        }
    }

    lock(status: boolean): void {
        this.userLock = status
    }

    async wait(time: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, time * 1000)
        })
    }

    getPositions(targetPoint?: number): (Position | undefined)[] | Position | undefined {
        if (targetPoint === undefined) {
            const positions = []
            for (let i = 0; i < this.points.length; i++) {
                positions.push(this.deletedPoints.includes(i) ? undefined : this.points[i].position)
            }
            return positions
        }
        return utils.checkValidity(this.context.point.pointCount, this.deletedPoints, targetPoint)
            ? this.points[targetPoint].position
            : undefined
    }

    getConnectedPoints(targetPoint: number): number[] {
        if (!utils.checkValidity(this.context.point.pointCount, this.deletedPoints, targetPoint)) {
            return []
        }
        const points = []
        for (const pointIndex of this.graph[targetPoint]) {
            points.push(pointIndex)
        }
        return points
    }

    getGraph(): { [key: number]: number[] } {
        return this.graph
    }
}
