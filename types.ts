
export interface ConceptFormData {
  subject: string;
  topic: string;
  confusion: string;
}

export interface ExplanationResponse {
  title: string;
  steps: string[];
  realWorldExample: string;
  keyTakeaway: string;
}

export type AppView = 'home' | 'loading' | 'explanation' | 'error';
