const canvasObjects: CanvasObject[] = []

export class CanvasObject {
    hasInit: boolean
    constructor() {
        canvasObjects.push(this)
        this.hasInit = false
    }

    init(): void {}

    update(): void {}

    destroy(): void {
        for (let i = 0; i < canvasObjects.length; i++) {
            if (canvasObjects[i] === this) {
                canvasObjects.splice(i, 1)
                break
            }
        }
    }
}

const render = (): void => {
    for (const obj of canvasObjects) {
        if (!obj.hasInit) {
            obj.hasInit = true
            obj.init()
        } else {
            obj.update()
        }
    }

    if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(render)
    }
}

if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(render)
}
