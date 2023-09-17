import { CanvasObject } from '../../../../common/canvas'
import * as utils from './utils'
import type { Position } from '../../../../common/types'
import type { EdgeContext } from './settings'
import { transparentColor } from '../../../../common/functions'

export class Edge extends CanvasObject {
    ctx: CanvasRenderingContext2D
    context: EdgeContext
    edgeLength: number
    startPosition: Position
    endPosition: Position
    renderTimestamp: number | null
    connectTimestamp: number | null
    isRendering: boolean
    color: string
    renderColor: string
    constructor(ctx: CanvasRenderingContext2D, context: EdgeContext) {
        super()
        this.ctx = ctx
        this.context = context
        this.edgeLength = 0
        this.startPosition = context.startPosition
        this.endPosition = context.endPosition
        this.renderTimestamp = null
        this.connectTimestamp = null
        this.isRendering = false
        this.color = context.color
        this.renderColor = '#0ea0cd'
    }

    init(): void {
        if (!this.context.withoutAnimation) {
            this.connectTimestamp = new Date().getTime()
        }
    }

    update(): void {
        const timestamp = new Date().getTime()
        const { d, start, end } = utils.getIntersection(this.startPosition, this.endPosition, this.context.radius)
        this.edgeLength = d

        this.ctx.beginPath()
        this.ctx.moveTo(start.x, start.y)
        if (this.renderTimestamp) {
            const progress = (timestamp - this.renderTimestamp) / 2000
            if (progress >= 1) {
                this.renderTimestamp = null
            } else {
                this.ctx.lineWidth = 5
                const dividePoint = {
                    x: start.x + (end.x - start.x) * progress,
                    y: start.y + (end.y - start.y) * progress
                }
                this.ctx.strokeStyle = this.renderColor
                this.ctx.lineTo(dividePoint.x, dividePoint.y)
                this.ctx.stroke()

                this.ctx.beginPath()
                this.ctx.moveTo(dividePoint.x, dividePoint.y)
            }
        }
        if (this.connectTimestamp) {
            const progress = (timestamp - this.connectTimestamp) / 1500
            if (progress >= 1) {
                this.connectTimestamp = null
            } else {
                const radio = Math.sin((Math.PI * progress) / 2)
                this.color = transparentColor(this.color!, radio)
            }
        }
        this.ctx.lineWidth = this.isRendering ? 5 : 3
        this.ctx.strokeStyle = this.isRendering ? this.renderColor : this.color
        this.ctx.lineTo(end.x, end.y)
        this.ctx.stroke()
    }

    setPosition(startPosition: Position, endPosition: Position): void {
        this.startPosition = startPosition
        this.endPosition = endPosition
    }

    setColor(color: string, withoutAnimation: boolean): void {
        if (!withoutAnimation) {
            this.connectTimestamp = new Date().getTime()
        }
        this.isRendering = false
        this.color = color
    }

    render(startPosition: Position, endPosition: Position, color: string): Promise<void> {
        this.setPosition(startPosition, endPosition)
        this.renderTimestamp = new Date().getTime()
        this.renderColor = color
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
                this.isRendering = true
            }, 2000)
        })
    }
}
