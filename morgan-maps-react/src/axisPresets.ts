export type AxisPresetId =
  | 'automationCriticality'
  | 'effortValue'
  | 'riskConfidence';

export const AXIS_PRESETS = {
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
    xHelp: 'How much effort is required to deliver or change this element.',
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
} as const;

export type AxisPreset = typeof AXIS_PRESETS[AxisPresetId];