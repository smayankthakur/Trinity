export type Metric = {
  label: string;
  value: string;
  context: string;
};

export type Phase = {
  title: string;
  goal: string;
  outputs: string[];
  kpi: string;
};

export type CaseResult = {
  companyType: string;
  problem: string;
  fix: string;
  before: string;
  after: string;
  impact: string;
};

export type Industry = {
  slug: string;
  name: string;
  bottlenecks: string[];
  outcomes: string[];
};


