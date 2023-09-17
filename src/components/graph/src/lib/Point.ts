import { CanvasObject } from '../../../../common/canvas'
import type { Position } from '../../../../common/types'
import type { PointContext } from './settings'
import { transparentColor } from '../../../../common/functions'

export class Point extends CanvasObject {
    ctx: CanvasRenderingContext2D
    context: PointContext
    position: Position
    arcColor: string
    fillColor: string
    fontColor: string
    content: string | number
    setContentTimestamp: number | null
    moveTimestamp: number | null
    moveStartPosition: Position | null
    moveEndPosition: Position | null
    moveArcDirection: number | null // 0，1 左右交换变y上下弧 | 2，3 上下交换变x左右弧
    blinkTimestamp: number | null
    blinkArcColor: string | null
    blinkFillColor: string | null
    blinkFontColor: string | null
    fullAnimation: boolean
    constructor(ctx: CanvasRenderingContext2D, context: PointContext) {
        super()
        this.ctx = ctx
        this.context = context
        this.position = context.initialPosition
        this.arcColor = context.arcColor
        this.fillColor = context.fillColor
        this.fontColor = context.fontColor
        this.content = this.context.content
        this.setContentTimestamp = null
        this.moveTimestamp = null
        this.moveStartPosition = null
        this.moveEndPosition = null
        this.moveArcDirection = null
        this.blinkTimestamp = null
        this.blinkArcColor = null
        this.blinkFillColor = null
        this.blinkFontColor = null
        this.fullAnimation = context.withoutAnimation
    }

    init(): void {
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        if (!this.fullAnimation) {
            this.blink(this.arcColor, this.fillColor, this.fontColor)
        }
    }

    update(): void {
        const timestamp = new Date().getTime()
        this.ctx.font = '24px Arial'
        this.ctx.beginPath()
        if (this.moveTimestamp) {
            const progress = (timestamp - this.moveTimestamp) / 1500
            if (progress > 1) {
                this.moveTimestamp = null
                this.moveStartPosition = null
                this.moveArcDirection = null
                this.shiftTo({ x: this.moveEndPosition!.x, y: this.moveEndPosition!.y })
            } else {
                let x = this.moveStartPosition!.x + (this.moveEndPosition!.x - this.moveStartPosition!.x) * progress
                let y = this.moveStartPosition!.y + (this.moveEndPosition!.y - this.moveStartPosition!.y) * progress
                switch (this.moveArcDirection) {
                    case 0:
                        y += 100 * Math.sqrt(Math.sin(Math.PI * progress) * 0.3)
                        break
                    case 1:
                        y -= 100 * Math.sqrt(Math.sin(Math.PI * progress) * 0.3)
                        break
                    case 2:
                        x += 100 * Math.sqrt(Math.sin(Math.PI * progress) * 0.3)
                        break
                    case 3:
                        x -= 100 * Math.sqrt(Math.sin(Math.PI * progress) * 0.3)
                        break
                    default:
                        break
                }
                this.shiftTo({ x, y })
            }
        }
        if (this.blinkTimestamp) {
            const progress = (timestamp - this.blinkTimestamp) / (this.fullAnimation ? 1200 : 800)
            if (progress >= 1) {
                this.blinkTimestamp = null
                this.blinkArcColor = null
                this.blinkFillColor = null
                this.blinkFontColor = null
                this.fullAnimation = true
            } else {
                const radio = Math.sin((Math.PI * progress) / (this.fullAnimation ? 1 : 2))
                this.blinkArcColor = transparentColor(this.blinkArcColor!, radio)
                this.blinkFillColor = transparentColor(this.blinkFillColor!, radio)
                this.blinkFontColor = transparentColor(this.blinkFontColor!, radio)
            }
        }
        if (this.setContentTimestamp) {
            const progress = (timestamp - this.setContentTimestamp) / 2000
            if (progress >= 1) {
                this.setContentTimestamp = null
                this.blinkFontColor = null
            } else {
                const radio = Math.sin((Math.PI * progress) / 2)
                this.blinkFontColor = transparentColor(this.blinkFontColor!, radio)
            }
        }
        this.ctx.closePath()
        this.drawPoint()
    }

    drawPoint(): void {
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = this.blinkArcColor === null ? this.arcColor : this.blinkArcColor
        this.ctx.fillStyle = this.blinkFillColor === null ? this.fillColor : this.blinkFillColor
        this.ctx.arc(this.position.x, this.position.y, this.context.radius, 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.fillStyle = this.blinkFontColor === null ? this.fontColor : this.blinkFontColor
        this.ctx.fillText(String(this.content), this.position.x, this.position.y)
    }

    shiftTo(newPosition: Position): void {
        this.position = newPosition
        this.context.positionUpdate(this.context.pid, this.position)
    }

    moveTo(newPosition: Position, moveArcDirection: number): Promise<void> {
        this.moveTimestamp = new Date().getTime()
        this.moveStartPosition = this.position
        this.moveEndPosition = newPosition
        if (moveArcDirection === 2) {
            this.moveArcDirection = -1
        } else if (
            Math.abs(this.moveEndPosition.x - this.moveStartPosition.x) >=
            Math.abs(this.moveEndPosition.y - this.moveStartPosition.y)
        ) {
            this.moveArcDirection = moveArcDirection ? 0 : 1
        } else {
            this.moveArcDirection = moveArcDirection ? 2 : 3
        }
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 1500)
        })
    }

    setColor(arcColor: string, fillColor: string, fontColor: string, withoutAnimation: boolean) {
        this.arcColor = arcColor
        this.fillColor = fillColor
        this.fontColor = fontColor
        if (!withoutAnimation) {
            this.blink(arcColor, fillColor, fontColor)
            this.fullAnimation = false
        }
    }

    setContent(content: string | number, withoutAnimation: boolean) {
        if (!withoutAnimation) {
            this.setContentTimestamp = new Date().getTime()
            this.blinkFontColor = this.fontColor
        }
        this.content = content
    }

    blink(arcColor: string, fillColor: string, fontColor: string): Promise<void> {
        this.blinkTimestamp = new Date().getTime()
        this.blinkArcColor = arcColor
        this.blinkFillColor = fillColor
        this.blinkFontColor = fontColor
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 1200)
        })
    }
}
