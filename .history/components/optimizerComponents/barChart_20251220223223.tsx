import { Color } from "@/constants/GlobalStyles";
import { scaleBand, scaleLinear } from "d3-scale";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
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

  // Store animated values for each bar's usable and unusable amounts
  const animatedValuesRef = useRef<
    Map<
      number,
      {
        usable: Animated.Value;
        unusable: Animated.Value;
        total: Animated.Value;
      }
    >
  >(new Map());

  // Store previous data for comparison
  const prevDataRef = useRef<AminoAcidData[]>([]);
  const [animatedData, setAnimatedData] = useState<AminoAcidData[]>(data);

  // Initialize or update animated values when data changes
  useEffect(() => {
    // Initialize animated values for new data items
    data.forEach((item, index) => {
      if (!animatedValuesRef.current.has(index)) {
        const prevItem = prevDataRef.current[index];
        animatedValuesRef.current.set(index, {
          usable: new Animated.Value(prevItem?.usable ?? item.usable),
          unusable: new Animated.Value(prevItem?.unusable ?? item.unusable),
          total: new Animated.Value(
            (prevItem?.usable ?? item.usable) +
              (prevItem?.unusable ?? item.unusable)
          ),
        });
      }
    });

    // Animate to new values
    const animations = data.map((item, index) => {
      const animated = animatedValuesRef.current.get(index);
      if (!animated) return null;

      const newTotal = item.usable + item.unusable;
      const prevItem = prevDataRef.current[index];
      const prevTotal = prevItem?.usable + prevItem?.unusable ?? newTotal;

      return Animated.parallel([
        Animated.timing(animated.usable, {
          toValue: item.usable,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(animated.unusable, {
          toValue: item.unusable,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(animated.total, {
          toValue: newTotal,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]);
    });

    // Start all animations
    Animated.parallel(
      animations.filter(
        (anim): anim is Animated.CompositeAnimation => anim !== null
      )
    ).start();

    // Update animated data using listeners
    const listeners = data.map((item, index) => {
      const animated = animatedValuesRef.current.get(index);
      if (!animated) return null;

      const id = animated.usable.addListener(({ value: usable }) => {
        const unusableValue = animated.unusable._value;
        setAnimatedData(prev => {
          const updated = [...prev];
          updated[index] = {
            name: item.name,
            usable: usable,
            unusable: unusableValue,
          };
          return updated;
        });
      });

      return { index, id };
    });

    // Store current data as previous for next update
    prevDataRef.current = data;

    // Cleanup listeners
    return () => {
      listeners.forEach(listener => {
        if (listener) {
          const animated = animatedValuesRef.current.get(listener.index);
          if (animated) {
            animated.usable.removeListener(listener.id);
          }
        }
      });
    };
  }, [data]);

  // Use animated data for rendering
  const displayData = animatedData.length === data.length ? animatedData : data;

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
          const unusableHeight = total > 0 ? (d.unusable / total) * barHeight : 0;
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
          x1={10}
          y1={yScale(limitingAS)}
          x2={chartWidth + 10}
          y2={yScale(limitingAS)}
          stroke="white"
          strokeWidth={1.5}
        />
        {/* Text label for limitingAS */}
        <SvgText
          x={chartWidth + 15}
          y={yScale(limitingAS) + 5}
          fontSize="15"
          fill="white"
          textAnchor="start"
        >
          {limitingAS}%
        </SvgText>
      </G>
    </Svg>
  );
}
