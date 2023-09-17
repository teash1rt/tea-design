import { PropType } from 'vue'
import { isNumber, isInteger, isNull } from '../../../../common/checks'
import type { DeepRequired } from '../../../../common/generics'
import { merge } from '../../../../common/functions'
import { throwError } from '../../../../common/errors'

const RadarChartProps = {
    context: {
        type: Object as PropType<RadarChartContext>,
        default: (): RadarChartContextRequired => defaultContext,
        validator(value: RadarChartContext) {
            const defaultContextCopy = JSON.parse(JSON.stringify(defaultContext))
            const mergeContext = merge(defaultContextCopy, value) as RadarChartContextRequired
            const count = mergeContext.style.edgeCount
            if (!isInteger(count) || count < 3) {
                throwError('radar-chart -> edgeCount', '边数应为大于3的整数')
            }

            if (mergeContext.axis.axisMax.length !== count) {
                throwError('radar-chart -> axisMax', '坐标最大值长度应与边数保持一致')
            }

            if (mergeContext.data.length > 0) {
                for (const data of mergeContext.data) {
                    if (data && data.length !== count) {
                        throwError('radar-chart -> data', '数据长度应与边数保持一致')
                    }
                    for (const e of data!) {
                        if (!isNumber(e)) {
                            throwError('radar-chart -> data', '数据应为number类型')
                        }
                    }
                }
            }
            return true
        }
    }
}

type RadarChartContext = {
    style?: {
        canvasSize?: number
        edgeCount?: number
        baseLineCount?: number
        mainColor?: string[]
        fillColor?: string[]
    }
    axis?: {
        label?: string[]
        labelStyle?: string
        labelColor?: string
        axisMax?: number[]
    }
    data?: number[][]
}

type RadarChartContextRequired = DeepRequired<RadarChartContext>

const defaultContext: RadarChartContextRequired = {
    style: {
        canvasSize: 600,
        edgeCount: 6,
        baseLineCount: 2,
        mainColor: ['#91cc75', '#4aa7e3', '#f1a731', '#ee6666', '#8055cd'],
        fillColor: ['#00ff00', '#00aeec', '#ffff00', '#ff0000', '#800080']
    },
    axis: {
        label: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6'],
        labelStyle: '22px Arial',
        labelColor: '#000000',
        axisMax: [100, 100, 100, 100, 100, 100]
    },
    data: [[65, 65, 65, 65, 65, 65]]
}

const RadarChartEmits = {
    hover: (value: number | null) => isNumber(value) || isNull(value)
}

export { RadarChartProps, defaultContext, RadarChartEmits }

export type { RadarChartContext, RadarChartContextRequired }
