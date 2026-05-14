import { useViewport } from 'reactflow';

export type AxisPresetId =
  | 'automationCriticality'
  | 'effortValue'
  | 'riskConfidence'
  | 'complexityImpact'
  | 'audienceNeedDeliveryEffort';

type AxisPreset = {
  name: string;
  xTitle: string;
  yTitle: string;
  xLabels: string[];
  yLabels: string[];
  xHelp: string;
  yHelp: string;
};

export const AXIS_PRESETS: Record<AxisPresetId, AxisPreset> = {
  automationCriticality: {
    name: 'Automation / Criticality',
    xTitle: 'Automation',
    yTitle: 'Criticality',
    xLabels: ['Human-led', 'Assisted', 'Part-automated', 'Conditionally automated', 'Fully automated'],
    yLabels: ['Critical', 'High-Impact', 'Important', 'Operational', 'Routine'],
    xHelp: 'How far an element can be handled by software or machines rather than human effort.',
    yHelp: 'How much an element matters to getting the decision right and sustaining trust in the outcome.',
  },
  effortValue: {
    name: 'Effort / Value',
    xTitle: 'Effort',
    yTitle: 'Value',
    xLabels: ['Tiny', 'Small', 'Medium', 'Large', 'Huge'],
    yLabels: ['Transformative', 'High', 'Useful', 'Low', 'Minimal'],
    xHelp: 'How much effort is required to deliver, operate, or change this element.',
    yHelp: 'How much value this element creates for audiences, teams, or the service.',
  },
  riskConfidence: {
    name: 'Risk / Confidence',
    xTitle: 'Risk',
    yTitle: 'Confidence',
    xLabels: ['Very low', 'Low', 'Medium', 'High', 'Very high'],
    yLabels: ['Very high', 'High', 'Medium', 'Low', 'Very low'],
    xHelp: 'How much uncertainty, exposure, or delivery risk is involved.',
    yHelp: 'How confident we are in the evidence, assumptions, or delivery path.',
  },
  complexityImpact: {
    name: 'Complexity / Impact',
    xTitle: 'Complexity',
    yTitle: 'Impact',
    xLabels: ['Very simple', 'Simple', 'Moderate', 'Complex', 'Very complex'],
    yLabels: ['Transformative', 'High', 'Medium', 'Low', 'Minimal'],
    xHelp: 'How technically, organisationally, or operationally complex this element is.',
    yHelp: 'How much positive or negative impact this element could have.',
  },
  audienceNeedDeliveryEffort: {
    name: 'Audience need / Delivery effort',
    xTitle: 'Delivery effort',
    yTitle: 'Audience need',
    xLabels: ['Tiny', 'Small', 'Medium', 'Large', 'Huge'],
    yLabels: ['Essential', 'High', 'Useful', 'Low', 'Minimal'],
    xHelp: 'How much effort would be needed to deliver, maintain, or change this element.',
    yHelp: 'How strongly this element serves an audience or user need.',
  },
};

interface AxisBackgroundProps {
  canvasWidth: number;
  canvasHeight: number;
  axisPresetId?: AxisPresetId;
}

export function AxisBackground({
  canvasWidth,
  canvasHeight,
  axisPresetId = 'automationCriticality',
}: AxisBackgroundProps) {
  const { x, y, zoom } = useViewport();
  const axisPreset = AXIS_PRESETS[axisPresetId] ?? AXIS_PRESETS.automationCriticality;

  const xDivW = canvasWidth / 5;
  const yDivH = canvasHeight / 5;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <svg
        style={{
          transform: `translate(${x}px, ${y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          overflow: 'visible',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        width={canvasWidth}
        height={canvasHeight}
      >
        {/* X vertical separator lines */}
        {[1, 2, 3, 4].map((i) => (
          <line
            key={`xsep-${i}`}
            x1={i * xDivW}
            y1={0}
            x2={i * xDivW}
            y2={canvasHeight}
            stroke="rgba(0,0,0,0.07)"
            strokeWidth={1}
            strokeDasharray="5 5"
          />
        ))}

        {/* Y horizontal separator lines */}
        {[1, 2, 3, 4].map((i) => (
          <line
            key={`ysep-${i}`}
            x1={0}
            y1={i * yDivH}
            x2={canvasWidth}
            y2={i * yDivH}
            stroke="rgba(0,0,0,0.07)"
            strokeWidth={1}
            strokeDasharray="5 5"
          />
        ))}

        {/* Canvas border */}
        <rect
          x={0}
          y={0}
          width={canvasWidth}
          height={canvasHeight}
          fill="none"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={1}
        />

        {/* X axis band labels */}
        {axisPreset.xLabels.map((label, i) => (
          <text
            key={`${axisPresetId}-x-${label}`}
            x={i * xDivW + xDivW / 2}
            y={canvasHeight - 10}
            fill="rgba(0,0,0,0.15)"
            fontSize={8.5}
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontWeight="500"
          >
            {label.toUpperCase()}
          </text>
        ))}

        {/* X axis title */}
        <text
          x={canvasWidth / 2}
          y={canvasHeight + 18}
          fill="rgba(0,0,0,0.3)"
          fontSize={10}
          fontWeight="700"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.08em"
        >
          {axisPreset.xTitle.toUpperCase()}
          <title>{axisPreset.xHelp}</title>
        </text>

        {/* Y axis title */}
        <text
          x={-canvasHeight / 2}
          y={-18}
          fill="rgba(0,0,0,0.3)"
          fontSize={10}
          fontWeight="700"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.08em"
          transform="rotate(-90)"
        >
          {axisPreset.yTitle.toUpperCase()}
          <title>{axisPreset.yHelp}</title>
        </text>

        {/* Y axis band labels */}
        {axisPreset.yLabels.map((label, i) => (
          <text
            key={`${axisPresetId}-y-${label}`}
            x={20}
            y={i * yDivH + yDivH / 2}
            fill="rgba(0,0,0,0.15)"
            fontSize={8.5}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="system-ui, sans-serif"
            fontWeight="500"
            transform={`rotate(-90 20 ${i * yDivH + yDivH / 2})`}
          >
            {label.toUpperCase()}
          </text>
        ))}
      </svg>
    </div>
  );
}
