import { Node, Edge } from 'reactflow';
import { NodeData, EdgeData } from '../types';
import { axisToCanvas } from '../utils/coordinates';

function makeNode(
  id: string,
  data: Omit<NodeData, 'selected'>,
  extra: Partial<NodeData> = {}
): Node<NodeData> {
  const pos = axisToCanvas(data.automationLevel, data.criticalityLevel);
  return {
    id,
    type: data.nodeType,
    position: pos,
    data: { ...data, selected: false, ...extra },
    draggable: true,
  };
}

function makeEdge(
  id: string,
  source: string,
  target: string,
  data: Partial<EdgeData>
): Edge<EdgeData> {
  return {
    id,
    source,
    target,
    type: 'relationship',
    data: {
      relationshipType: data.relationshipType ?? 'informs',
      description: data.description ?? '',
      interoperabilityNote: data.interoperabilityNote ?? '',
    },
  };
}

export const SEED_NODES: Node<NodeData>[] = [
  makeNode("ideation_discovery", {
    "title": "Ideate & Discovery",
    "nodeType": "interface",
    "automationLevel": 0,
    "criticalityLevel": 0.62,
    "organisation": "BBC",
    "description": "PMs and teams use multiple data sources to understand user and business problems, then ideate an experiment backlog to address them.",
    "owner": "Product Managers, Experimentation CoE, Product Analytics, UX, Design Research",
    "tags": [
      "ideation",
      "discovery",
      "backlog",
      "human-led"
    ],
    "status": "active",
    "confidenceScore": 0.85,
    "notes": "Based on the high-level process in the Experimentation Cheat Sheet.",
    "overlays": {
      "pathway": true
    },
  }),

  makeNode("problem_statement_hypothesis", {
    "title": "Problem Statement & Hypothesis",
    "nodeType": "evidence",
    "automationLevel": 0.25,
    "criticalityLevel": 0.74,
    "organisation": "BBC",
    "description": "Structured articulation of the user/business problem and expected impact, using playbook guidance on problem statements and hypotheses.",
    "owner": "Product Managers, UX, Experimentation CoE",
    "tags": [
      "hypothesis",
      "problem-statement",
      "experiment-brief"
    ],
    "status": "active",
    "confidenceScore": 0.8,
    "notes": "Assumes teams use the linked playbook and training materials to shape briefs.",
    "overlays": {
      "pathway": true,
      "dataQuality": true
    },
  }),

  makeNode("experiment_backlog", {
    "title": "Experiment Backlog",
    "nodeType": "execution",
    "automationLevel": 0.25,
    "criticalityLevel": 0.52,
    "organisation": "BBC",
    "description": "Prioritised set of experiment opportunities that teams prepare for brief creation and resource alignment.",
    "owner": "Product Managers",
    "tags": [
      "backlog",
      "prioritisation",
      "planning"
    ],
    "status": "active",
    "confidenceScore": 0.75,
    "notes": "Backlog quality depends on discovery evidence and team prioritisation.",
    "overlays": {
      "pathway": true
    },
  }),

  makeNode("experiment_brief", {
    "title": "Experiment Brief",
    "nodeType": "interface",
    "automationLevel": 0.25,
    "criticalityLevel": 0.76,
    "organisation": "BBC",
    "description": "Template used to capture the experiment hypothesis, context, design choices, metrics, resource needs and stakeholder alignment before build.",
    "owner": "Product Managers with Experimentation CoE, Product Analytics, UX and Engineering",
    "tags": [
      "brief",
      "alignment",
      "governance"
    ],
    "status": "active",
    "confidenceScore": 0.82,
    "notes": "The cheat sheet says teams should start filling out Experiment Briefs once they have a backlog and engage relevant teams to align resource.",
    "overlays": {
      "pathway": true,
      "policyConstraints": true
    },
  }),

  makeNode("metric_path_choice", {
    "title": "Metric Path Choice",
    "nodeType": "decision",
    "automationLevel": 0.25,
    "criticalityLevel": 0.84,
    "organisation": "BBC",
    "description": "Decision on whether the required metric is a self-serve click/impression metric, a consumption Journey-to-Consumption metric, or requires manual analysis/support.",
    "owner": "Experimentation CoE and Product Analytics",
    "tags": [
      "metrics",
      "self-serve",
      "manual-analysis",
      "decision"
    ],
    "status": "active",
    "confidenceScore": 0.9,
    "notes": "Based on the self-service metrics decision diagram.",
    "overlays": {
      "pathway": true,
      "dataQuality": true,
      "policyConstraints": true
    },
  }),

  makeNode("existing_metrics_hub", {
    "title": "Existing Metrics Hub",
    "nodeType": "evidence",
    "automationLevel": 0.75,
    "criticalityLevel": 0.72,
    "organisation": "BBC",
    "description": "Catalogue of existing self-serve metrics available for experiment use, including Optimizely and Piano-related metric options.",
    "owner": "Experimentation CoE",
    "tags": [
      "metrics",
      "hub",
      "self-serve",
      "optimizely"
    ],
    "status": "active",
    "confidenceScore": 0.78,
    "notes": "The PDFs refer to Experimentation Hub resources and checking whether metrics already exist in the hub.",
    "overlays": {
      "dataQuality": true
    },
  }),

  makeNode("cube_spec_check", {
    "title": "CUBE Specification Check",
    "nodeType": "decision",
    "automationLevel": 0.25,
    "criticalityLevel": 0.68,
    "organisation": "BBC",
    "description": "Decision on whether CUBE is willing or able to add the required specification into the hub, with escalation to the product-data-tracking channel when unknown.",
    "owner": "CUBE / Product Data Tracking with Experimentation CoE",
    "tags": [
      "tracking-specification",
      "cube",
      "metrics",
      "escalation"
    ],
    "status": "active",
    "confidenceScore": 0.72,
    "notes": "Derived from the metric decision process PDF; operational ownership may need confirmation.",
    "overlays": {
      "orgBoundaries": true,
      "dataQuality": true
    },
  }),

  makeNode("manual_analysis_route", {
    "title": "Manual Analysis Route",
    "nodeType": "execution",
    "automationLevel": 0,
    "criticalityLevel": 0.79,
    "organisation": "BBC",
    "description": "Route for metrics that cannot be self-served, including manual analysis by Product Analytics and use of manual analysis steps, templates, scripts and GitHub resources.",
    "owner": "Product Analytics",
    "tags": [
      "manual-analysis",
      "product-analytics",
      "metrics"
    ],
    "status": "active",
    "confidenceScore": 0.85,
    "notes": "Applies when self-service is not possible for consumption metrics or unavailable click/impression metrics.",
    "overlays": {
      "pathway": true,
      "frictionPoints": true
    },
  }),

  makeNode("test_design", {
    "title": "Test Design",
    "nodeType": "decision",
    "automationLevel": 0.25,
    "criticalityLevel": 0.86,
    "organisation": "BBC",
    "description": "Teams design an experiment capable of detecting significant impacts to metrics in a feasible timeframe, deciding whether deep-dive analysis is required and deliverable.",
    "owner": "Product Managers, Experimentation CoE, Product Analytics",
    "tags": [
      "test-design",
      "rct",
      "duration",
      "sample-size"
    ],
    "status": "active",
    "confidenceScore": 0.9,
    "notes": "The cheat sheet stresses metrics advice, sample size calculation and choosing the right metrics at this stage.",
    "overlays": {
      "pathway": true,
      "policyConstraints": true
    },
  }),

  makeNode("duration_sample_size_calculation", {
    "title": "Duration & Sample Size Calculation",
    "nodeType": "evidence",
    "automationLevel": 0.75,
    "criticalityLevel": 0.88,
    "organisation": "BBC",
    "description": "Use the duration calculator and sample-size guidance to determine whether the experiment can run long enough and reach a sufficient audience to detect impact.",
    "owner": "Product Analytics with Experimentation CoE up-skilling",
    "tags": [
      "duration-calculator",
      "sample-size",
      "statistical-power"
    ],
    "status": "active",
    "confidenceScore": 0.88,
    "notes": "The stop stage requires checking sample size against the calculation made in design.",
    "overlays": {
      "dataQuality": true,
      "pathway": true
    },
  }),

  makeNode("metric_validity_rules", {
    "title": "Metric Validity Rules",
    "nodeType": "evidence",
    "automationLevel": 0.5,
    "criticalityLevel": 0.82,
    "organisation": "BBC",
    "description": "Guidance on choosing valid user-level metrics and avoiding WAA, window or lagging metrics in experiments.",
    "owner": "Experimentation CoE and Product Analytics",
    "tags": [
      "metric-validity",
      "user-level-metrics",
      "governance"
    ],
    "status": "active",
    "confidenceScore": 0.86,
    "notes": "The cheat sheet explicitly warns that WAA, window or lagging metrics cannot be used in experiments.",
    "overlays": {
      "policyConstraints": true,
      "dataQuality": true
    },
  }),

  makeNode("feature_build", {
    "title": "Feature Build",
    "nodeType": "execution",
    "automationLevel": 0.25,
    "criticalityLevel": 0.7,
    "organisation": "BBC",
    "description": "Engineering and Data Science build the experiment feature required for the test, including integration points needed for variants and measurement.",
    "owner": "Engineering, Data Science",
    "tags": [
      "build",
      "engineering",
      "data-science"
    ],
    "status": "active",
    "confidenceScore": 0.8,
    "notes": "The cheat sheet names Webcore, RMS, iBL and Serving-Team as examples of supporting engineering teams.",
    "overlays": {
      "pathway": true
    },
  }),

  makeNode("optimizely_experiment_build", {
    "title": "Optimizely Experiment Build",
    "nodeType": "execution",
    "automationLevel": 0.5,
    "criticalityLevel": 0.76,
    "organisation": "BBC",
    "description": "Teams build the feature experiment in Optimizely, applying the correct activation scopes, available metrics, control/variant configuration and experiment key prefixes.",
    "owner": "Engineering, Data Science, Experimentation CoE",
    "tags": [
      "optimizely",
      "feature-experimentation",
      "activation-scopes",
      "prefixes"
    ],
    "status": "active",
    "confidenceScore": 0.88,
    "notes": "Build guidance includes business/developer Optimizely videos, setup guides, activation scopes, available metrics and required prefixes.",
    "overlays": {
      "pathway": true,
      "policyConstraints": true
    },
  }),

  makeNode("qa_prelaunch", {
    "title": "Pre-launch QA Decision",
    "nodeType": "decision",
    "automationLevel": 0.25,
    "criticalityLevel": 0.9,
    "organisation": "BBC",
    "description": "Go/no-go quality decision before launch, checking that the correct experience is served and control/variant displays correctly.",
    "owner": "Engineering, Data Science, Product Managers",
    "tags": [
      "qa",
      "go-live",
      "quality",
      "pre-launch"
    ],
    "status": "active",
    "confidenceScore": 0.9,
    "notes": "The cheat sheet calls QA before launch a must-read before going live.",
    "overlays": {
      "pathway": true,
      "frictionPoints": true
    },
  }),

  makeNode("launch_monitor", {
    "title": "Launch & Monitor",
    "nodeType": "execution",
    "automationLevel": 0.5,
    "criticalityLevel": 0.84,
    "organisation": "BBC",
    "description": "Experiment is launched, teams check it is working and displaying as expected, and Day 0 checks confirm data is flowing correctly and traffic is assigned.",
    "owner": "Engineering, Data Science, Product Managers, Experimentation CoE, Product Analytics",
    "tags": [
      "launch",
      "monitoring",
      "day-0",
      "day-3"
    ],
    "status": "active",
    "confidenceScore": 0.9,
    "notes": "Day 0-3 checks cover Optimizely, Piano and manual metrics depending on the metric route.",
    "overlays": {
      "pathway": true,
      "dataQuality": true
    },
  }),

  makeNode("day_0_3_checks", {
    "title": "Day 0-3 Health Checks",
    "nodeType": "evidence",
    "automationLevel": 0.75,
    "criticalityLevel": 0.82,
    "organisation": "BBC",
    "description": "Early monitoring evidence that data flows correctly, traffic is assigned, samples are balanced and no major performance impacts appear in metrics.",
    "owner": "Product team, Experimentation CoE, Product Analytics",
    "tags": [
      "health-check",
      "traffic",
      "metrics",
      "monitoring"
    ],
    "status": "active",
    "confidenceScore": 0.86,
    "notes": "Self-serve Optimizely and Piano checks can be done by anyone in the team with up-skilling; manual metrics involve Product Analytics.",
    "overlays": {
      "dataQuality": true,
      "pathway": true
    },
  }),

  makeNode("stop_decision", {
    "title": "Stop / Continue Decision",
    "nodeType": "decision",
    "automationLevel": 0.25,
    "criticalityLevel": 0.87,
    "organisation": "BBC",
    "description": "Decision on whether the experiment has run long enough and reached a comparable sample size to the design-stage duration calculation before stopping, pausing or concluding.",
    "owner": "Product Managers, Experimentation CoE, Product Analytics",
    "tags": [
      "stop",
      "continue",
      "sample-size",
      "conclude"
    ],
    "status": "active",
    "confidenceScore": 0.9,
    "notes": "The cheat sheet states experiments must run for a minimum of two weeks and sample size must be checked before stopping.",
    "overlays": {
      "policyConstraints": true,
      "pathway": true
    },
  }),

  makeNode("analysis_results", {
    "title": "Results Analysis Decision",
    "nodeType": "decision",
    "automationLevel": 0.75,
    "criticalityLevel": 0.89,
    "organisation": "BBC",
    "description": "Determine whether there was a winning variant, using self-serve Optimizely analysis where possible or manual analysis workflows for agreed manual metrics.",
    "owner": "Product team, Product Analytics, Experimentation CoE",
    "tags": [
      "analysis",
      "winning-variant",
      "optimizely",
      "manual-analysis"
    ],
    "status": "active",
    "confidenceScore": 0.88,
    "notes": "The cheat sheet says analysis is self-serve in Optimizely for relevant metrics, with Product Analytics support for manual metrics.",
    "overlays": {
      "pathway": true,
      "dataQuality": true
    },
  }),

  makeNode("analysis_tooling", {
    "title": "Analysis Tooling & Scripts",
    "nodeType": "evidence",
    "automationLevel": 0.75,
    "criticalityLevel": 0.78,
    "organisation": "BBC",
    "description": "Optimizely, Experimentation Hub, manual analysis Dropbox docs, GitHub resources and R scripts used to prepare data and calculate continuous or proportion/rate metric results.",
    "owner": "Product Analytics, Experimentation CoE",
    "tags": [
      "tooling",
      "github",
      "r-script",
      "optimizely",
      "experimentation-hub"
    ],
    "status": "active",
    "confidenceScore": 0.82,
    "notes": "Tooling evidence comes from links and analyst guidance in the cheat sheet.",
    "overlays": {
      "dataQuality": true
    },
  }),

  makeNode("next_steps", {
    "title": "Next Steps",
    "nodeType": "execution",
    "automationLevel": 0.25,
    "criticalityLevel": 0.72,
    "organisation": "BBC",
    "description": "Perform agreed deep-dive analysis, roll out the winning variant, go back to ideate an iteration, or move on to the next experiment.",
    "owner": "Product Managers, Product Analytics, Experimentation CoE, UX",
    "tags": [
      "rollout",
      "iteration",
      "deep-dive",
      "learning-loop"
    ],
    "status": "active",
    "confidenceScore": 0.86,
    "notes": "Final stage from the Experimentation Cheat Sheet.",
    "overlays": {
      "pathway": true
    },
  }),

];

export const SEED_EDGES: Edge<EdgeData>[] = [
  makeEdge("edge_01", "ideation_discovery", "problem_statement_hypothesis", {
    "relationshipType": "informs",
    "description": "Discovery data shapes the problem statement and hypothesis.",
    "interoperabilityNote": "Human synthesis supported by playbook and training materials."
  }),

  makeEdge("edge_02", "problem_statement_hypothesis", "experiment_backlog", {
    "relationshipType": "informs",
    "description": "Defined opportunities are added to the experiment backlog.",
    "interoperabilityNote": "Team planning and backlog tooling."
  }),

  makeEdge("edge_03", "experiment_backlog", "experiment_brief", {
    "relationshipType": "triggers",
    "description": "Prioritised backlog items trigger experiment brief creation.",
    "interoperabilityNote": "Experiment Brief template."
  }),

  makeEdge("edge_04", "experiment_brief", "metric_path_choice", {
    "relationshipType": "triggers",
    "description": "Briefing the experiment triggers metric route decisions.",
    "interoperabilityNote": "Metric requirements captured in the brief."
  }),

  makeEdge("edge_05", "metric_path_choice", "existing_metrics_hub", {
    "relationshipType": "informs",
    "description": "Self-serve candidates are checked against existing hub metrics.",
    "interoperabilityNote": "Experimentation Hub / metrics catalogue."
  }),

  makeEdge("edge_06", "existing_metrics_hub", "test_design", {
    "relationshipType": "informs",
    "description": "Available metrics shape the test design and feasibility.",
    "interoperabilityNote": "Metrics selected for use in Optimizely or manual analysis."
  }),

  makeEdge("edge_07", "metric_path_choice", "cube_spec_check", {
    "relationshipType": "escalatesTo",
    "description": "Unavailable click/impression metrics may be escalated for CUBE specification checks.",
    "interoperabilityNote": "Ask CUBE / product-data-tracking channel where the decision is unknown."
  }),

  makeEdge("edge_08", "cube_spec_check", "existing_metrics_hub", {
    "relationshipType": "transfersTo",
    "description": "If CUBE can add the specification, the metric can become available through the hub.",
    "interoperabilityNote": "Tracking specification added to the metrics catalogue."
  }),

  makeEdge("edge_09", "metric_path_choice", "manual_analysis_route", {
    "relationshipType": "transfersTo",
    "description": "Metrics that cannot be self-served move to manual analysis.",
    "interoperabilityNote": "Manual analysis by Product Analytics."
  }),

  makeEdge("edge_10", "manual_analysis_route", "test_design", {
    "relationshipType": "informs",
    "description": "Manual analysis feasibility affects whether the experiment is deliverable.",
    "interoperabilityNote": "Product Analytics input to design."
  }),

  makeEdge("edge_11", "metric_validity_rules", "test_design", {
    "relationshipType": "constrains",
    "description": "Metric validity rules constrain which metrics can be used in the experiment.",
    "interoperabilityNote": "Experimentation playbook and cheat sheet guidance."
  }),

  makeEdge("edge_12", "duration_sample_size_calculation", "test_design", {
    "relationshipType": "informs",
    "description": "Duration and sample-size calculations inform the test design.",
    "interoperabilityNote": "Duration calculator outputs shared with stakeholders."
  }),

  makeEdge("edge_13", "test_design", "feature_build", {
    "relationshipType": "triggers",
    "description": "Approved design triggers feature build.",
    "interoperabilityNote": "Engineering and Data Science delivery workflow."
  }),

  makeEdge("edge_14", "feature_build", "optimizely_experiment_build", {
    "relationshipType": "transfersTo",
    "description": "Built feature is configured as an Optimizely experiment.",
    "interoperabilityNote": "Feature flag / activation / variant configuration."
  }),

  makeEdge("edge_15", "optimizely_experiment_build", "qa_prelaunch", {
    "relationshipType": "triggers",
    "description": "Experiment configuration triggers pre-launch QA.",
    "interoperabilityNote": "Optimizely QA and team checks."
  }),

  makeEdge("edge_16", "qa_prelaunch", "optimizely_experiment_build", {
    "relationshipType": "reviews",
    "description": "QA reviews whether variants, controls and tracking are correctly configured.",
    "interoperabilityNote": "Manual review with system evidence."
  }),

  makeEdge("edge_17", "qa_prelaunch", "launch_monitor", {
    "relationshipType": "triggers",
    "description": "Successful QA triggers launch and monitoring.",
    "interoperabilityNote": "Go-live handoff."
  }),

  makeEdge("edge_18", "launch_monitor", "day_0_3_checks", {
    "relationshipType": "triggers",
    "description": "Launch triggers Day 0-3 health checks.",
    "interoperabilityNote": "Optimizely, Piano and/or manual metric checks."
  }),

  makeEdge("edge_19", "day_0_3_checks", "launch_monitor", {
    "relationshipType": "reviews",
    "description": "Health checks review data flow, traffic assignment and performance impacts.",
    "interoperabilityNote": "Self-serve dashboards and analyst checks."
  }),

  makeEdge("edge_20", "duration_sample_size_calculation", "stop_decision", {
    "relationshipType": "constrains",
    "description": "Stopping decisions are constrained by planned duration and sample-size requirements.",
    "interoperabilityNote": "Compare reached sample against design-stage calculation."
  }),

  makeEdge("edge_21", "day_0_3_checks", "stop_decision", {
    "relationshipType": "informs",
    "description": "Monitoring evidence informs whether to continue, pause, stop or conclude.",
    "interoperabilityNote": "Monitoring outputs and experiment health evidence."
  }),

  makeEdge("edge_22", "stop_decision", "analysis_results", {
    "relationshipType": "triggers",
    "description": "Concluding the experiment triggers results analysis.",
    "interoperabilityNote": "Optimizely or manual analysis route."
  }),

  makeEdge("edge_23", "analysis_tooling", "analysis_results", {
    "relationshipType": "informs",
    "description": "Analysis tools and scripts provide evidence for the result decision.",
    "interoperabilityNote": "Optimizely, Experimentation Hub, Dropbox docs, GitHub and R scripts."
  }),

  makeEdge("edge_24", "manual_analysis_route", "analysis_tooling", {
    "relationshipType": "informs",
    "description": "Manual analysis route determines which analyst tooling and scripts are needed.",
    "interoperabilityNote": "Manual analysis docs and scripts."
  }),

  makeEdge("edge_25", "analysis_results", "next_steps", {
    "relationshipType": "triggers",
    "description": "Analysis outcome triggers rollout, iteration, deep dive or the next experiment.",
    "interoperabilityNote": "Product and analytics decision handoff."
  }),

  makeEdge("edge_26", "next_steps", "ideation_discovery", {
    "relationshipType": "informs",
    "description": "Experiment learnings feed future ideation and iteration.",
    "interoperabilityNote": "Learning loop into discovery and backlog."
  }),

];
