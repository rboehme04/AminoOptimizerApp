import { Color } from "@/constants/GlobalStyles";
import { scaleLinear } from "d3-scale";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import Svg, {
  G,
  Line,
  Polygon,
  Text as SvgText,
  TSpan,
} from "react-native-svg";

// Essential amino acids data structure
export type AminoAcidData = {
  name: string;
  usable: number; // Usable for muscles, cells, enzymes & immune system
  unusable: number; // Not usable, only used for energy
};

type RadarChartProps = {
  data: AminoAcidData[];
  limitingAS: number;
  width?: number;
  height?: number;
  animationDuration?: number; // Animation duration in milliseconds
};

export default function RadarChart({
  data,
  limitingAS,
  width = 300,
  height = 200,
  animationDuration = 400,
}: RadarChartProps) {
  const margin = { top: 40, right: 0, bottom: 0, left: 30 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;
  const radius = Math.min(centerX, centerY) - 40; // Leave space for labels

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
  }, [data, animationProgress, animationDuration]);

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
  }, [limitingAS, limitingASAnimation, animationDuration]);

  // Use interpolated data for rendering
  const displayData = interpolatedData;

  // Calculate max value for scaling
  const maxValue = Math.max(
    ...displayData.map(d => d.usable + d.unusable),
    250 // Ensure we can show up to 250%
  );

  // Create scale for radius (0 to maxValue maps to 0 to radius)
  const rScale = scaleLinear()
    .domain([0, 250]) // Set domain to 0-250 for percentage display
    .range([0, radius]);

  // Generate grid lines (0% to 250% in 50% increments)
  const gridLevels = [0, 50, 100, 150, 200, 250];

  // Calculate number of data points
  const numPoints = displayData.length;
  const angleStep = (2 * Math.PI) / numPoints;
  const startAngle = -Math.PI / 2; // Start from top (12 o'clock)

  // Helper function to convert polar to cartesian coordinates
  const polarToCartesian = (angle: number, distance: number) => {
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    return { x, y };
  };

  // Generate points for usable polygon
  const usablePoints = displayData.map((d, i) => {
    const angle = startAngle + i * angleStep;
    const distance = rScale(d.usable);
    return polarToCartesian(angle, distance);
  });

  // Generate points for total (usable + unusable) polygon
  const totalPoints = displayData.map((d, i) => {
    const angle = startAngle + i * angleStep;
    const total = d.usable + d.unusable;
    const distance = rScale(total);
    return polarToCartesian(angle, distance);
  });

  // Convert points to path string for polygons
  const pointsToPath = (points: Array<{ x: number; y: number }>) => {
    return points.map(p => `${p.x},${p.y}`).join(" ");
  };

  // Calculate label positions (outside the chart)
  const labelPositions = displayData.map((d, i) => {
    const angle = startAngle + i * angleStep;
    // Single-line labels should be closer than multi-line labels
    const isMultiLine = d.name.includes("\n");
    const labelDistance = isMultiLine ? radius + 20 : radius + 15; // Multi-line labels need more space
    return polarToCartesian(angle, labelDistance);
  });

  return (
    <Svg width={width} height={height}>
      <G x={margin.left} y={margin.top}>
        {/* Title */}
        <SvgText
          x={centerX}
          y={-15}
          fontSize="12"
          fill={Color.neutralTextOrTabGrey}
          textAnchor="middle"
        >
          Amino Acid Score
        </SvgText>

        {/* Grid lines */}
        {gridLevels.map(level => {
          const r = rScale(level);
          // Create points for this grid level at each axis
          const gridPoints = displayData.map((_, i) => {
            const angle = startAngle + i * angleStep;
            return polarToCartesian(angle, r);
          });
          // Draw lines connecting adjacent points to form a polygon
          return gridPoints.map((point, i) => {
            const nextPoint = gridPoints[(i + 1) % gridPoints.length];
            return (
              <Line
                key={`grid-${level}-${i}`}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke={Color.neutralTextOrTabGrey}
                strokeWidth={0.5}
                opacity={0.3}
              />
            );
          });
        })}

        {/* Grid line labels on the left side */}
        {gridLevels
          .filter(level => level > 0) // Skip 0% label
          .map(level => {
            const r = rScale(level);
            // Position labels vertically along the left side
            // Map grid levels to vertical positions: 0% at top, 250% at bottom
            // The vertical position corresponds to where the grid circle intersects the top-bottom axis
            // For a circle centered at (centerX, centerY) with radius r,
            // at the top (angle = -π/2): y = centerY - r
            // at the bottom (angle = π/2): y = centerY + r
            // We'll position labels at the top intersection for visual clarity
            const topAngle = -Math.PI / 2; // Top of the chart
            const topPoint = polarToCartesian(topAngle, r);
            // Position labels along the left edge, vertically aligned with grid line intersections
            return (
              <SvgText
                key={`grid-label-${level}`}
                x={5} // Fixed position at the left edge
                y={topPoint.y + 4} // Vertical position based on grid circle's top intersection
                fontSize="9"
                fill={Color.neutralTextOrTabGrey}
                textAnchor="start"
                opacity={0.6}
              >
                {level}%
              </SvgText>
            );
          })}

        {/* Unusable segment (gray) - outer layer */}
        <Polygon
          points={pointsToPath(totalPoints)}
          fill={Color.neutralButtonInactive}
          opacity={0.6}
        />

        {/* Usable segment (green) - inner layer */}
        <Polygon points={pointsToPath(usablePoints)} fill={Color.success70} />

        {/* Reference polygon line for limitingAS */}
        {(() => {
          const limitingASRadius = rScale(animatedLimitingAS);
          const limitingASPoints = displayData.map((_, i) => {
            const angle = startAngle + i * angleStep;
            return polarToCartesian(angle, limitingASRadius);
          });
          return limitingASPoints.map((point, i) => {
            const nextPoint =
              limitingASPoints[(i + 1) % limitingASPoints.length];
            return (
              <Line
                key={`limitingAS-${i}`}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke="white"
                strokeWidth={1.5}
              />
            );
          });
        })()}

        {/* Label for limitingAS */}
        <SvgText
          x={centerX + rScale(animatedLimitingAS) + 10}
          y={centerY + 10}
          fontSize="15"
          fill="white"
          textAnchor="start"
        >
          {Math.round(animatedLimitingAS)}%
        </SvgText>

        {/* Labels for amino acids */}
        {displayData.map((d, i) => {
          const pos = labelPositions[i];
          return (
            <SvgText
              key={`amino-${i}`}
              x={pos.x}
              y={pos.y}
              fontSize="10"
              fill={Color.neutralTextOrTabGrey}
              textAnchor="middle"
            >
              {d.name.includes("\n")
                ? d.name.split("\n").map((line, lineIndex) => (
                    <TSpan
                      key={lineIndex}
                      x={pos.x}
                      dy={lineIndex === 0 ? 0 : 8}
                    >
                      {line}
                    </TSpan>
                  ))
                : d.name.length > 8
                ? d.name.substring(0, 8) + "..."
                : d.name}
            </SvgText>
          );
        })}
      </G>
    </Svg>
  );
}
