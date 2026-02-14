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

// Datenstruktur für essentielle Aminosäuren
export type AminoAcidData = {
  name: string;
  usable: number; // Nutzbar für Muskeln, Zellen, Enzyme & Immunsystem
  unusable: number; // Nicht nutzbar, wird nur zur Energiegewinnung verwendet
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
  const margin = { top: 30, right: 0, bottom: 0, left: 0 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;
  const radius = Math.min(centerX, centerY) - 40; // Platz für Labels lassen

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
  }, [limitingAS, limitingASAnimation, animationDuration]);

  // Interpolierte Daten zum Rendern verwenden
  const displayData = interpolatedData;

  // Skala für den Radius erstellen (0 bis 250% wird auf 0 bis radius abgebildet)
  const rScale = scaleLinear()
    .domain([0, 250]) // Domain 0–250 für Prozentdarstellung
    .range([0, radius]);

  // Gitternetzlinien erzeugen (0% bis 250% in 50%-Schritten)
  const gridLevels = [0, 50, 100, 150, 200, 250];

  // Anzahl der Datenpunkte
  const numPoints = displayData.length;
  const angleStep = (2 * Math.PI) / numPoints;
  const startAngle = -Math.PI / 2; // Start oben (12 Uhr)

  // Hilfsfunktion: Polar- in Kartesische Koordinaten umrechnen
  const polarToCartesian = (angle: number, distance: number) => {
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    return { x, y };
  };

  // Punkte für das Polygon des nutzbaren Anteils erzeugen
  const usablePoints = displayData.map((d, i) => {
    const angle = startAngle + i * angleStep;
    const distance = rScale(d.usable);
    return polarToCartesian(angle, distance);
  });

  // Punkte für das Gesamt-Polygon (nutzbar + nicht nutzbar) erzeugen
  const totalPoints = displayData.map((d, i) => {
    const angle = startAngle + i * angleStep;
    const total = d.usable + d.unusable;
    const distance = rScale(total);
    return polarToCartesian(angle, distance);
  });

  // Punkte in den "points"-String für Polygone umwandeln
  const pointsToPath = (points: Array<{ x: number; y: number }>) => {
    return points.map(p => `${p.x},${p.y}`).join(" ");
  };

  // Label-Positionen (außerhalb des Diagramms) berechnen
  const labelPositions = displayData.map((d, i) => {
    const angle = startAngle + i * angleStep;
    // Einzeilige Labels können näher stehen als mehrzeilige
    const isMultiLine = d.name.includes("\n");
    const labelDistance = isMultiLine ? radius + 20 : radius + 15; // Mehrzeilige Labels brauchen mehr Platz
    return polarToCartesian(angle, labelDistance);
  });

  return (
    <Svg width={width} height={height}>
      <G x={margin.left} y={margin.top}>
        {/* Titel */}
        <SvgText
          x={centerX}
          y={-15}
          fontSize="12"
          fill={Color.neutralTextOrTabGrey}
          textAnchor="middle"
        >
          Amino Acid Score
        </SvgText>

        {/* Gitternetzlinien */}
        {gridLevels.map(level => {
          const r = rScale(level);
          // Punkte für dieses Grid-Level an jeder Achse erzeugen
          const gridPoints = displayData.map((_, i) => {
            const angle = startAngle + i * angleStep;
            return polarToCartesian(angle, r);
          });
          // Linien zwischen benachbarten Punkten zeichnen (Polygon-Form)
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

        {/* Grid-Labels auf der linken Seite */}
        {gridLevels
          .filter(level => level > 0) // 0%-Label überspringen
          .map((level, index) => {
            const r = rScale(level);
            // Label links positionieren (Winkel = π ist der linke Punkt)
            const leftAngle = Math.PI; // 180°, linke Seite
            const labelPoint = polarToCartesian(leftAngle, r);
            // Ansteigenden y-Offset hinzufügen, um Überlappung zu vermeiden
            const yOffset = -(0 + index * 15); // Basis-Offset + zunehmender Abstand
            // x-Offset hinzufügen, um Labels etwas Richtung Mitte zu ziehen
            const xOffset = -12 + index * 5;
            return (
              <SvgText
                key={`grid-label-${level}`}
                x={
                  level < 100
                    ? labelPoint.x + xOffset + 7
                    : labelPoint.x + xOffset
                } // Position with decreasing spacing
                y={labelPoint.y + yOffset} // Increasing vertical offset for spacing
                fontSize="9"
                fill={Color.neutralTextOrTabGrey}
                textAnchor="start"
                opacity={1}
              >
                {level}%
              </SvgText>
            );
          })}
        {/* Nicht nutzbarer Anteil (grau) – äußere Ebene */}
        <Polygon
          points={pointsToPath(totalPoints)}
          fill={Color.neutralButtonInactive}
          opacity={0.6}
        />

        {/* Nutzbarer Anteil (grün) – innere Ebene */}
        <Polygon points={pointsToPath(usablePoints)} fill={Color.success70} />

        {/* Referenz-Polygonlinie für limitingAS */}
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

        {/* Label für limitingAS */}
        <SvgText
          x={centerX + rScale(animatedLimitingAS) + 10}
          y={centerY + 10}
          fontSize="15"
          fill="white"
          textAnchor="start"
        >
          {Math.round(animatedLimitingAS)}%
        </SvgText>

        {/* Labels der Aminosäuren */}
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
