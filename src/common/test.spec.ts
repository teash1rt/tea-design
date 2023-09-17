import { describe, expect, it, vi } from 'vitest'
import { CanvasObject } from './canvas'
import { useDark } from './functions'
import { transparentColor } from './functions'

describe('test the useDark function', () => {
    it('test the useDark function', () => {
        let isDark = useDark()
        expect(isDark).toBeFalsy()
        isDark = useDark(!isDark)
        expect(isDark).toBeTruthy()
    })
})

describe('test the CanvasObject function', () => {
    it('should call by requestAnimation', async () => {
        const canvas = new CanvasObject()
        const initCall = vi.spyOn(canvas, 'init')
        const updateCall = vi.spyOn(canvas, 'update')
        expect(initCall).not.toHaveBeenCalled()
        expect(updateCall).not.toHaveBeenCalled()
        canvas.init()
        expect(initCall).toHaveBeenCalled()
        await new Promise(resolve => setTimeout(resolve, 100))
        expect(updateCall).toHaveBeenCalled()
    })

    it('should destroy', async () => {
        const canvas = new CanvasObject()
        const initCall = vi.spyOn(canvas, 'init')
        const updateCall = vi.spyOn(canvas, 'update')
        const destroyCall = vi.spyOn(canvas, 'destroy')
        expect(initCall).not.toHaveBeenCalled()
        expect(updateCall).not.toHaveBeenCalled()
        expect(destroyCall).not.toHaveBeenCalled()
        canvas.init()
        canvas.destroy()
        expect(destroyCall).toHaveBeenCalled()
        await new Promise(resolve => setTimeout(resolve, 100))
        expect(updateCall).not.toHaveBeenCalled()
    })
})

describe('test the transparentColor function', () => {
    it('should be different color', async () => {
        const color = ['rgb(100,100,100)', 'rgba(255,255,255,0.2)', '#0000ff']
        for (const e of color) {
            expect(transparentColor(e, Math.random())).not.toBe(e)
        }
    })
})
