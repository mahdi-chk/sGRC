import { environment } from '../../../environments/environment';

type QueryValue = string | number | boolean | null | undefined;

const absoluteUrlPattern = /^[a-z][a-z\d+\-.]*:\/\//i;

const stripTrailingSlashes = (value: string): string => value.replace(/\/+$/, '');
const stripLeadingSlashes = (value: string): string => value.replace(/^\/+/, '');

export const joinUrl = (baseUrl: string, path: string): string => {
    const normalizedPath = (path || '').replace(/\\/g, '/');

    if (!normalizedPath) {
        return stripTrailingSlashes(baseUrl || '');
    }

    if (absoluteUrlPattern.test(normalizedPath)) {
        return normalizedPath;
    }

    const normalizedBaseUrl = stripTrailingSlashes(baseUrl || '');
    const relativePath = stripLeadingSlashes(normalizedPath);

    return normalizedBaseUrl ? `${normalizedBaseUrl}/${relativePath}` : `/${relativePath}`;
};

export const appendQueryParams = (url: string, params: Record<string, QueryValue> = {}): string => {
    const query = Object.entries(params)
        .filter(([, value]) => value !== null && value !== undefined && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');

    if (!query) {
        return url;
    }

    return `${url}${url.includes('?') ? '&' : '?'}${query}`;
};

export const buildBackendFileUrl = (
    filePath: string | null | undefined,
    params: Record<string, QueryValue> = {}
): string => appendQueryParams(joinUrl(environment.serverUrl, filePath || ''), params);
