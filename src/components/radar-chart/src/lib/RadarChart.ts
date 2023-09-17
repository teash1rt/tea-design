import * as utils from './utils'
import { CanvasObject } from '../../../../common/canvas'
import type { RadarChartContextRequired } from './settings'
import type { Position } from '../../../../common/types'
import { transparentColor } from '../../../../common/functions'

class RadarChart extends CanvasObject {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    context: RadarChartContextRequired
    mouse: Position
    axis: Position[]
    vertices: Position[][]
    baseLine: Position[][]
    text: Position[]
    lastMousePosition: Position
    constructor(canvas: HTMLCanvasElement, context: RadarChartContextRequired) {
        super()
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')!
        this.context = context
        this.mouse = { x: 0, y: 0 }
        this.lastMousePosition = { x: 0, y: 0 }
        this.canvas.addEventListener('wheel', e => {
            this.lastMousePosition = { x: e.x, y: e.y }
        })
        window.addEventListener('scroll', () => {
            const canvasRect = this.canvas.getBoundingClientRect()
            this.mouse.x = this.lastMousePosition.x - canvasRect.left
            this.mouse.y = this.lastMousePosition.y - canvasRect.top
        })
        this.canvas.addEventListener('mousemove', e => {
            const canvasRect = this.canvas.getBoundingClientRect()
            this.mouse.x = e.x - canvasRect.left
            this.mouse.y = e.y - canvasRect.top
        })
        this.axis = []
        this.vertices = Array(this.context.data.length)
            .fill([])
            .map(() => [])
        this.baseLine = Array(this.context.style.baseLineCount + 2)
            .fill([])
            .map(() => [])
        this.text = []
    }

    init(): void {
        const edgeCount = this.context.style.edgeCount
        const axisLength = 0.25 * this.context.style.canvasSize

        // 坐标轴位置
        for (let i = 0; i < edgeCount; i++) {
            const { x, y } = utils.position(i, axisLength, this.context.style.edgeCount, this.context.style.canvasSize)
            this.axis.push({ x, y })
        }

        // 顶点位置
        for (let i = 0; i < this.context.data.length; i++) {
            for (let j = 0; j < edgeCount; j++) {
                const { x, y } = utils.position(
                    j,
                    (this.context.data[i][j] * axisLength) / this.context.axis.axisMax[j],
                    this.context.style.edgeCount,
                    this.context.style.canvasSize
                )
                this.vertices[i].push({ x, y })
            }
        }

        // 基准线位置
        if (this.context.style.baseLineCount > 0) {
            const gap = axisLength / (this.context.style.baseLineCount + 1)
            for (let i = 1; i <= this.context.style.baseLineCount + 1; i++) {
                for (let j = 0; j < edgeCount; j++) {
                    const { x, y } = utils.position(j, i * gap, this.context.style.edgeCount, this.context.style.canvasSize)
                    this.baseLine[i].push({ x, y })
                }
            }
        }

        // 坐标文字位置
        for (let i = 0; i < edgeCount; i++) {
            const { x, y } = utils.position(
                i,
                0.27 * this.context.style.canvasSize,
                this.context.style.edgeCount,
                this.context.style.canvasSize
            )
            this.text.push({ x, y })
        }
    }

    update(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        const insideElement: number | null = this.findInsideChart()
        this.canvas.style.cursor = insideElement !== null ? 'pointer' : 'auto'
        this.canvas.dispatchEvent(new CustomEvent('hover', { detail: insideElement }))
        this.renderBaseElement()

        for (let i = 0; i < this.context.data.length; i++) {
            if (i === insideElement) {
                continue
            }
            this.renderChart(i, false, this.context.data.length > 1)
        }

        if (insideElement !== null) {
            this.renderChart(insideElement, true, this.context.data.length > 1)
        }
    }

    renderBaseElement(): void {
        const edgeCount = this.context.style.edgeCount

        // 坐标线
        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = '#888888'
        for (const i of this.axis) {
            this.ctx.moveTo(this.context.style.canvasSize / 2, this.context.style.canvasSize / 2)
            const { x, y } = i
            this.ctx.lineTo(x, y)
        }
        this.ctx.stroke()

        // 基准线
        this.ctx.strokeStyle = '#bbbbbb'
        if (this.context.style.baseLineCount > 0) {
            for (let i = 1; i <= this.context.style.baseLineCount + 1; i++) {
                this.ctx.beginPath()
                for (const j of this.baseLine[i]) {
                    const { x, y } = j
                    this.ctx.lineTo(x, y)
                }
                this.ctx.closePath()
                this.ctx.stroke()
            }
        }

        // 坐标文字
        this.ctx.font = this.context.axis.labelStyle
        this.ctx.fillStyle = this.context.axis.labelColor
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'

        for (let i = 0; i < edgeCount; i++) {
            const { x, y } = this.text[i]
            // 文字偏移
            if (i === 0 || (edgeCount && i === edgeCount / 2)) {
                this.ctx.fillText(this.context.axis.label[i], x, i ? y + 10 : y - 10)
            } else {
                const textWidth = this.ctx.measureText(this.context.axis.label[i]).width
                if (i < edgeCount / 2) {
                    this.ctx.fillText(this.context.axis.label[i], x + textWidth / 2, y)
                } else {
                    this.ctx.fillText(this.context.axis.label[i], x - textWidth / 2, y)
                }
            }
        }
    }

    findInsideChart(): number | null {
        for (let i = 0; i < this.context.data.length; i++) {
            const isInside = utils.isInside(this.mouse, this.vertices[i], this.context.style.fillColor[i] !== 'none')
            if (isInside) {
                return i
            }
        }
        return null
    }

    renderChart(i: number, isInside: boolean, isMultiple: boolean): void {
        const mainColor = this.context.style.mainColor
        const fillColor = this.context.style.fillColor

        // 中心区域
        this.ctx.beginPath()
        this.ctx.lineWidth = isInside ? 5 : 3
        this.ctx.lineWidth = isInside ? 5 : 3
        this.ctx.strokeStyle = isInside ? utils.lightenColor(mainColor[i % mainColor.length]) : mainColor[i % mainColor.length]
        for (const j of this.vertices[i]) {
            const { x, y } = j
            this.ctx.lineTo(x, y)
        }
        this.ctx.closePath()
        if (fillColor[i] !== 'none') {
            this.ctx.fillStyle = isInside
                ? utils.lightenColor(transparentColor(fillColor[i % fillColor.length], isInside && isMultiple ? 0.45 : 0.2))
                : transparentColor(fillColor[i % fillColor.length], isInside && isMultiple ? 0.45 : 0.2)
            this.ctx.fill()
        }
        this.ctx.stroke()

        // 交点
        this.ctx.beginPath()
        this.ctx.fillStyle = mainColor[i % mainColor.length]
        for (const j of this.vertices[i]) {
            const { x, y } = j
            this.ctx.moveTo(x, y)
            this.ctx.arc(x, y, isInside ? 6 : 5.5, 0, 2 * Math.PI)
            this.ctx.fill()
        }
        this.ctx.closePath()
    }
}

export { RadarChart }
