import { Color } from "@/constants/GlobalStyles";
import { scaleBand, scaleLinear } from "d3-scale";
import React from "react";
import Svg, { G, Line, Rect, Text as SvgText } from "react-native-svg";

// Essential amino acids data structure
export type AminoAcidData = {
  name: string;
  usable: number; // Usable for muscles, cells, enzymes & immune system
  unusable: number; // Not usable, only used for energy
};

type StackedBarChartProps = {
  data: AminoAcidData[];
  limitingAS: number;
  width?: number;
  height?: number;
};

export default function StackedBarChart({
  data,
  limitingAS,
  width = 300,
  height = 200,
}: StackedBarChartProps) {
  const margin = { top: 20, right: 65, bottom: 20, left: 30 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(d => d.usable + d.unusable));

  // Create scales
  const xScale = scaleBand()
    .domain(data.map((_, i) => i.toString()))
    .range([0, chartWidth])
    .padding(0.65);

  const yScale = scaleLinear()
    .domain([0, 250]) // Set domain to 0-250 for percentage display
    .range([chartHeight, 0]);

  // Generate y-axis ticks (0% to 250% in 50% increments)
  const yAxisTicks = [0, 50, 100, 150, 200, 250];

  const barWidth = xScale.bandwidth();

  return (
    <Svg width={width} height={height}>
      <G x={margin.left} y={margin.top}>
        {/* Y-axis labels */}
        {yAxisTicks.map(tick => {
          const yPos = yScale(tick);
          return (
            <SvgText
              key={tick}
              x={-12}
              y={yPos}
              fontSize="6"
              fill={Color.neutralTextOrTabGrey}
              textAnchor="start"
            >
              {tick}%
            </SvgText>
          );
        })}
        {/* Horizontal grid lines */}
        {yAxisTicks.map(tick => {
          const yPos = yScale(tick);
          return (
            <Line
              key={`grid-${tick}`}
              x1={10}
              y1={yPos}
              x2={chartWidth}
              y2={yPos}
              stroke={Color.neutralTextOrTabGrey}
              strokeWidth={0.5}
              opacity={0.3}
            />
          );
        })}
        {data.map((d, i) => {
          const x = xScale(i.toString()) || 0;
          const total = d.usable + d.unusable;

          // In SVG, y=0 is at top, so we calculate from top to bottom
          // Total bar goes from yScale(total) (top) to chartHeight (bottom)
          const barTop = yScale(total);
          const barHeight = chartHeight - barTop;

          // Usable segment is at the bottom
          // It goes from (chartHeight - usable portion) to chartHeight
          const usableHeight = (d.usable / total) * barHeight;
          const usableY = chartHeight - usableHeight;

          // Unusable segment is on top of usable segment
          const unusableHeight = (d.unusable / total) * barHeight;
          const unusableY = usableY - unusableHeight;

          return (
            <G key={i}>
              {/* Usable segment (green) - bottom */}
              <Rect
                x={x}
                y={usableY}
                width={barWidth}
                height={usableHeight}
                fill={Color.success70}
              />
              {/* Unusable segment (gray) - top */}
              <Rect
                x={x}
                y={unusableY}
                width={barWidth}
                height={unusableHeight}
                fill={Color.neutralButtonInactive}
              />
              {/* Label */}
              <SvgText
                x={x + barWidth / 2}
                y={chartHeight + 15}
                fontSize="6"
                fill={Color.neutralTextOrTabGrey}
                textAnchor="middle"
              >
                {d.name.length > 8 ? d.name.substring(0, 8) + "..." : d.name}
              </SvgText>
            </G>
          );
        })}
        {/* Horizontal line at limitingAS */}
        <Line
          x1={0}
          y1={yScale(limitingAS)}
          x2={chartWidth + 10}
          y2={yScale(limitingAS)}
          stroke="white"
          strokeWidth={1.5}
        />
        {/* Text label for limitingAS */}
        <SvgText
          x={chartWidth + 15}
          y={yScale(limitingAS)}
          fontSize="12"
          fill="white"
          textAnchor="start"
        >
          {limitingAS}%
        </SvgText>
      </G>
    </Svg>
  );
}
