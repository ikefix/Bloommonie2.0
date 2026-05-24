// Global module declarations for JSX and JS files
declare module "*.jsx" {
  const component: any;
  export default component;
}

declare module "../config/apiConfig" {
  const API_CONFIG: any;
  export default API_CONFIG;
  export const VOICE_COMMANDS: any;
  export function getFullUrl(endpoint: string): string;
  export function detectIntent(transcript: string): string;
  export function getEndpointsForIntent(intent: string): string[];
}
declare module "*.js" {
  const value: any;
  export default value;
}

interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
  // add other env vars as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
