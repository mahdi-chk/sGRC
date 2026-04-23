declare global {
  interface Window {
    __env?: {
      API_URL?: string;
      SERVER_URL?: string;
    };
  }
}

type RuntimeEnvironment = {
  production: boolean;
  apiUrl: string;
  serverUrl: string;
};

const normalizeUrl = (value: string): string => value.replace(/\/+$/, '');

const getRuntimeWindow = (): Window | undefined =>
  typeof window !== 'undefined' ? window : undefined;

const deriveServerUrl = (apiUrl: string): string => {
  const normalizedApiUrl = normalizeUrl(apiUrl);

  if (normalizedApiUrl.endsWith('/api')) {
    return normalizedApiUrl.slice(0, -4);
  }

  return normalizedApiUrl;
};

export const createEnvironment = (production: boolean): RuntimeEnvironment => {
  const runtimeWindow = getRuntimeWindow();
  const runtimeConfig = runtimeWindow?.__env;

  const apiUrl = normalizeUrl(runtimeConfig?.API_URL || '/api');
  const serverUrl = normalizeUrl(runtimeConfig?.SERVER_URL || deriveServerUrl(apiUrl));

  return {
    production,
    apiUrl,
    serverUrl
  };
};

export type { RuntimeEnvironment };
