import { buildLookupCodeList, buildLookupCodeMap } from '../../database/lookups/lookup-registry';

export const UserRole = buildLookupCodeMap('user.role');
export type UserRole = string;
export const USER_ROLE_CODES = buildLookupCodeList('user.role');
