import { TCalendar, TCalendarInstall } from './calendar'
import { TCalendarHeatmap, TCalendarHeatmapInstall } from './calendar-heatmap'
import { TTooltip, TTooltipInstall } from './tooltip'
import { TFloatButton, TFloatItem, TFloatButtonInstall, TFloatItemInstall } from './float-button'
import { TRollcall, TRollcallInstall } from './rollcall'
import type { RollcallRef } from './rollcall'
import { TRadarChart, TRadarChartInstall } from './radar-chart'
import type { RadarChartContext } from './radar-chart'
import { useTypewrite } from './typewrite'
import type { TypewriteContext } from './typewrite'
import { TGraph, TGraphInstall } from './graph'
import type { GraphRef, GraphContext } from './graph'

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
