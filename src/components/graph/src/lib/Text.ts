import { CanvasObject } from '../../../../common/canvas'
import { TextContext } from './settings'
import { transparentColor } from '../../../../common/functions'

type Snippet = {
    color: string
    startIndex: number
    endIndex: number
    startTimestamp: number
    withoutAnimation: boolean
}

export class Text extends CanvasObject {
    ctx: CanvasRenderingContext2D
    context: TextContext
    fontColor: string
    initialTimestamp: number | null
    colorSnippets: Snippet[]
    constructor(ctx: CanvasRenderingContext2D, context: TextContext) {
        super()
        this.ctx = ctx
        this.context = context
        this.fontColor = context.fontColor
        this.initialTimestamp = null
        this.colorSnippets = []
    }

    init(): void {
        if (!this.context.withoutAnimation) {
            this.initialTimestamp = new Date().getTime()
        }
    }

    update(): void {
        this.ctx.font = this.context.fontStyle
        const timestamp = new Date().getTime()
        if (this.initialTimestamp) {
            const progress = (timestamp - this.initialTimestamp) / 1000
            if (progress > 1) {
                this.initialTimestamp = null
            } else {
                const radio = Math.sin((Math.PI * progress) / 2)
                this.fontColor = transparentColor(this.fontColor, radio)
            }
        }

        const colorArray = Array(this.context.content.length).fill(this.fontColor)
        for (let i = 0; i < this.colorSnippets.length; i++) {
            if (!this.colorSnippets[i].withoutAnimation) {
                const progress = (timestamp - this.colorSnippets[i].startTimestamp) / 1000
                if (progress > 1) {
                    this.colorSnippets[i].withoutAnimation = true
                } else {
                    const radio = Math.sin((Math.PI * progress) / 2)
                    this.colorSnippets[i].color = transparentColor(this.colorSnippets[i].color, radio)
                }
            }
            for (let j = this.colorSnippets[i].startIndex; j <= this.colorSnippets[i].endIndex; j++) {
                colorArray[j] = this.colorSnippets[i].color
            }
        }

        for (let i = 0; i < this.context.content.length; i++) {
            const width = i ? this.ctx.measureText(this.context.content.substring(0, i)).width : 0
            this.ctx.fillStyle = colorArray[i]
            this.ctx.fillText(this.context.content[i], this.context.position.x + width, this.context.position.y)
        }
    }

    setColor(color: string, startIndex: number, endIndex: number, withoutAnimation: boolean): void {
        const timestamp = new Date().getTime()
        this.colorSnippets.push({
            color: color,
            startIndex: startIndex,
            endIndex: endIndex,
            startTimestamp: timestamp,
            withoutAnimation: withoutAnimation
        })
    }
}
