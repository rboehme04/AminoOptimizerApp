import { Color } from "@/constants/GlobalStyles";
import { scaleBand, scaleLinear } from "d3-scale";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import Svg, { G, Line, Rect, Text as SvgText, TSpan } from "react-native-svg";

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
  animationDuration?: number; // Animation duration in milliseconds
};

export default function StackedBarChart({
  data,
  limitingAS,
  width = 300,
  height = 200,
  animationDuration = 400,
}: StackedBarChartProps) {
  const margin = { top: 6, right: 55, bottom: 25, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Store previous data and animation progress
  const prevDataRef = useRef<AminoAcidData[]>(data);
  const animationProgress = useRef(new Animated.Value(0)).current;
  const [interpolatedData, setInterpolatedData] =
    useState<AminoAcidData[]>(data);

  // Animate limitingAS position
  const prevLimitingASRef = useRef<number>(limitingAS);
  const limitingASAnimation = useRef(new Animated.Value(limitingAS)).current;
  const [animatedLimitingAS, setAnimatedLimitingAS] = useState(limitingAS);

  // Animate when data changes
  useEffect(() => {
    // Check if data actually changed
    const dataChanged =
      prevDataRef.current.length !== data.length ||
      prevDataRef.current.some(
        (prev, i) =>
          !data[i] ||
          prev.usable !== data[i].usable ||
          prev.unusable !== data[i].unusable ||
          prev.name !== data[i].name
      );

    if (!dataChanged) {
      // Ensure interpolated data matches current data
      setInterpolatedData(data);
      return;
    }

    // Capture previous data snapshot before updating (deep copy)
    const previousDataSnapshot = prevDataRef.current.map(item => ({
      ...item,
    }));

    // Start from previous data
    setInterpolatedData(previousDataSnapshot);

    // Reset animation and start it
    animationProgress.setValue(0);

    // Update interpolated data during animation
    const listenerId = animationProgress.addListener(({ value }) => {
      const interpolated = data.map((item, index) => {
        const prevItem = previousDataSnapshot[index];
        if (!prevItem) return item;

        return {
          name: item.name,
          usable: prevItem.usable + (item.usable - prevItem.usable) * value,
          unusable:
            prevItem.unusable + (item.unusable - prevItem.unusable) * value,
        };
      });
      setInterpolatedData(interpolated);
    });

    // Start animation
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      // After animation completes, ensure we're at the target values
      setInterpolatedData(data);
      // Update previous data reference for next animation
      prevDataRef.current = data;
    });

    return () => {
      animationProgress.removeListener(listenerId);
    };
  }, [data, animationProgress]);

  // Animate limitingAS position when it changes
  useEffect(() => {
    if (prevLimitingASRef.current !== limitingAS) {
      // Set the animation value to start from the previous value
      limitingASAnimation.setValue(prevLimitingASRef.current);

      // Update interpolated limitingAS during animation
      const listenerId = limitingASAnimation.addListener(({ value }) => {
        setAnimatedLimitingAS(value);
      });

      // Start animation
      Animated.timing(limitingASAnimation, {
        toValue: limitingAS,
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(() => {
        // After animation completes, ensure we're at the target value
        setAnimatedLimitingAS(limitingAS);
        prevLimitingASRef.current = limitingAS;
      });

      return () => {
        limitingASAnimation.removeListener(listenerId);
      };
    }
  }, [limitingAS, limitingASAnimation]);

  // Use interpolated data for rendering
  const displayData = interpolatedData;

  // Calculate max value for scaling
  const maxValue = Math.max(...displayData.map(d => d.usable + d.unusable));

  // Create scales
  const xScale = scaleBand()
    .domain(displayData.map((_, i) => i.toString()))
    .range([0, chartWidth])
    .padding(0.65);

  const yScale = scaleLinear()
    .domain([0, 250]) // Set domain to 0-250 for percentage display
    .range([chartHeight, 0]);

  // Generate y-axis ticks (0% to 250% in 50% increments)
  const yAxisTicks = [0, 50, 100, 150, 200];

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
              x={-22}
              y={yPos + 3}
              fontSize="10"
              fill={Color.neutralTextOrTabGrey}
              textAnchor="start"
            >
              {tick}%
            </SvgText>
          );
        })}
        {/* title for y axis */}
        <SvgText
          key={"title"}
          x={-22}
          y={yScale(yAxisTicks[yAxisTicks.length - 1]+50) + 3}
          fontSize="12"
          fill={Color.neutralTextOrTabGrey}
          textAnchor="start"
        >
          Amino Acid Score
        </SvgText>
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
        {displayData.map((d, i) => {
          const x = xScale(i.toString()) || 0;
          const total = d.usable + d.unusable;

          // In SVG, y=0 is at top, so we calculate from top to bottom
          // Total bar goes from yScale(total) (top) to chartHeight (bottom)
          const barTop = yScale(total);
          const barHeight = chartHeight - barTop;

          // Usable segment is at the bottom
          // It goes from (chartHeight - usable portion) to chartHeight
          const usableHeight = total > 0 ? (d.usable / total) * barHeight : 0;
          const usableY = chartHeight - usableHeight;

          // Unusable segment is on top of usable segment
          const unusableHeight =
            total > 0 ? (d.unusable / total) * barHeight : 0;
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
                opacity={0.6}
              />
              {/* Label */}
              <SvgText
                x={x + barWidth / 2}
                y={chartHeight + 15}
                fontSize="10"
                fill={Color.neutralTextOrTabGrey}
                textAnchor="middle"
              >
                {d.name.includes("\n")
                  ? d.name.split("\n").map((line, lineIndex) => (
                      <TSpan
                        key={lineIndex}
                        x={x + barWidth / 2}
                        dy={lineIndex === 0 ? 0 : 8}
                      >
                        {line}
                      </TSpan>
                    ))
                  : d.name.length > 8
                  ? d.name.substring(0, 8) + "..."
                  : d.name}
              </SvgText>
            </G>
          );
        })}
        {/* Horizontal line at limitingAS */}
        <Line
          x1={10}
          y1={yScale(animatedLimitingAS)}
          x2={chartWidth}
          y2={yScale(animatedLimitingAS)}
          stroke="white"
          strokeWidth={1.5}
        />
        {/* Text label for limitingAS */}
        <SvgText
          x={chartWidth + 5}
          y={yScale(animatedLimitingAS) + 5}
          fontSize="15"
          fill="white"
          textAnchor="start"
        >
          {Math.round(animatedLimitingAS)}%
        </SvgText>
      </G>
    </Svg>
  );
}
