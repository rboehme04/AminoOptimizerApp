import { Color } from "@/constants/GlobalStyles";
import { scaleBand, scaleLinear } from "d3-scale";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import Svg, { G, Line, Rect, Text as SvgText, TSpan } from "react-native-svg";

// Datenstruktur für essentielle Aminosäuren
export type AminoAcidData = {
  name: string;
  usable: number; // Nutzbar für Muskeln, Zellen, Enzyme & Immunsystem
  unusable: number; // Nicht nutzbar, wird nur zur Energiegewinnung verwendet
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
  const margin = { top: 10, right: 55, bottom: 25, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Vorherige Daten und Animationsfortschritt speichern
  const prevDataRef = useRef<AminoAcidData[]>(data);
  const animationProgress = useRef(new Animated.Value(0)).current;
  const [interpolatedData, setInterpolatedData] =
    useState<AminoAcidData[]>(data);

  // Position von limitingAS animieren
  const prevLimitingASRef = useRef<number>(limitingAS);
  const limitingASAnimation = useRef(new Animated.Value(limitingAS)).current;
  const [animatedLimitingAS, setAnimatedLimitingAS] = useState(limitingAS);

  // Animation starten, wenn sich die Daten ändern
  useEffect(() => {
    // Prüfen, ob sich die Daten tatsächlich geändert haben
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
      // Sicherstellen, dass die interpolierten Daten den aktuellen entsprechen
      setInterpolatedData(data);
      return;
    }

    // Snapshot der vorherigen Daten vor dem Update erstellen (Deep Copy)
    const previousDataSnapshot = prevDataRef.current.map(item => ({
      ...item,
    }));

    // Von den vorherigen Daten aus starten
    setInterpolatedData(previousDataSnapshot);

    // Animation zurücksetzen und starten
    animationProgress.setValue(0);

    // Interpolierte Daten während der Animation aktualisieren
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

    // Animation starten
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      // Nach der Animation sicherstellen, dass die Zielwerte gesetzt sind
      setInterpolatedData(data);
      // Referenz für die nächste Animation aktualisieren
      prevDataRef.current = data;
    });

    return () => {
      animationProgress.removeListener(listenerId);
    };
  }, [data, animationProgress, animationDuration]);

  // limitingAS animieren, wenn es sich ändert
  useEffect(() => {
    if (prevLimitingASRef.current !== limitingAS) {
      // Animationswert so setzen, dass er beim vorherigen Wert startet
      limitingASAnimation.setValue(prevLimitingASRef.current);

      // Interpolierten limitingAS-Wert während der Animation aktualisieren
      const listenerId = limitingASAnimation.addListener(({ value }) => {
        setAnimatedLimitingAS(value);
      });

      // Animation starten
      Animated.timing(limitingASAnimation, {
        toValue: limitingAS,
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(() => {
        // Nach der Animation sicherstellen, dass der Zielwert gesetzt ist
        setAnimatedLimitingAS(limitingAS);
        prevLimitingASRef.current = limitingAS;
      });

      return () => {
        limitingASAnimation.removeListener(listenerId);
      };
    }
  }, [limitingAS, limitingASAnimation]);

  // Interpolierte Daten zum Rendern verwenden
  const displayData = interpolatedData;

  // Skalen erstellen
  const xScale = scaleBand()
    .domain(displayData.map((_, i) => i.toString()))
    .range([0, chartWidth])
    .padding(0.65);

  const yScale = scaleLinear()
    .domain([0, 250]) // Domain 0–250 für Prozentdarstellung
    .range([chartHeight, 0]);

  // y-Achsen-Ticks erzeugen (0% bis 250% in 50%-Schritten)
  const yAxisTicks = [0, 50, 100, 150, 200];

  const barWidth = xScale.bandwidth();

  return (
    <Svg width={width} height={height}>
      <G x={margin.left} y={margin.top}>
        {/* y-Achsen-Beschriftung */}
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
        {/* Titel der y-Achse */}
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
        {/* Horizontale Gitternetzlinien */}
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

          // In SVG liegt y=0 oben; daher von oben nach unten rechnen
          // Gesamter Balken: von yScale(total) (oben) bis chartHeight (unten)
          const barTop = yScale(total);
          const barHeight = chartHeight - barTop;

          // Nutzbarer Anteil liegt unten
          // Von (chartHeight - nutzbarer Anteil) bis chartHeight
          const usableHeight = total > 0 ? (d.usable / total) * barHeight : 0;
          const usableY = chartHeight - usableHeight;

          // Nicht nutzbarer Anteil liegt oberhalb des nutzbaren Anteils
          const unusableHeight =
            total > 0 ? (d.unusable / total) * barHeight : 0;
          const unusableY = usableY - unusableHeight;

          return (
            <G key={i}>
              {/* Nutzbarer Anteil (grün) – unten */}
              <Rect
                x={x}
                y={usableY}
                width={barWidth}
                height={usableHeight}
                fill={Color.success70}
              />
              {/* Nicht nutzbarer Anteil (grau) – oben */}
              <Rect
                x={x}
                y={unusableY}
                width={barWidth}
                height={unusableHeight}
                fill={Color.neutralButtonInactive}
                opacity={0.6}
              />
              {/* Beschriftung */}
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
        {/* Horizontale Linie für limitingAS */}
        <Line
          x1={10}
          y1={yScale(animatedLimitingAS)}
          x2={chartWidth}
          y2={yScale(animatedLimitingAS)}
          stroke="white"
          strokeWidth={1.5}
        />
        {/* Textlabel für limitingAS */}
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
