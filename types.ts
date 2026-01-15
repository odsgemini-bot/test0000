
export interface GeminiResponse {
  text: string;
  error?: string;
}

export interface DeploymentStep {
  title: string;
  description: string;
  command?: string;
}
