import { TCalendar, TCalendarInstall } from './calendar'
import { TCalendarHeatmap, TCalendarHeatmapInstall } from './calendar-heatmap'
import { TTooltip, TTooltipInstall } from './tooltip'
import { TFloatButton, TFloatItem, TFloatButtonInstall, TFloatItemInstall } from './float-button'
import { TRollcall, TRollcallInstall, type RollcallRef } from './rollcall'
import { TRadarChart, TRadarChartInstall, type RadarChartContext } from './radar-chart'
import { useTypewrite, type TypewriteContext } from './typewrite'
import { TGraph, TGraphInstall, type GraphRef, GraphContext } from './graph'

export { TCalendar, TCalendarHeatmap, TTooltip, TFloatButton, TFloatItem, TRollcall, TRadarChart, useTypewrite, TGraph }

export type { RollcallRef, RadarChartContext, TypewriteContext, GraphRef, GraphContext }

export const components = [
    TCalendarInstall,
    TCalendarHeatmapInstall,
    TTooltipInstall,
    TFloatButtonInstall,
    TFloatItemInstall,
    TRollcallInstall,
    TRadarChartInstall,
    TGraphInstall
]
