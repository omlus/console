import type { MenuId } from '@/lib/menu/config';
import { MENU_ID } from '@/lib/menu/config';

export const ACCESS_LEVEL = {
    EXCLUDE_AUTH: 0,
    AUTHENTICATED: 1,
    VIEW_PERMISSION: 2,
    MANAGE_PERMISSION: 3,
    ADMIN_PERMISSION: 4,
} as const;

export type AccessLevel = typeof ACCESS_LEVEL[keyof typeof ACCESS_LEVEL];

export const PAGE_PERMISSION_TYPE = {
    VIEW: 'VIEW',
    MANAGE: 'MANAGE',
} as const;

export type PagePermissionType = typeof PAGE_PERMISSION_TYPE[keyof typeof PAGE_PERMISSION_TYPE];

export interface PagePermission {
    page: string;
    permission: PagePermissionType;
}

export interface AccessInfo {
    referenceMenuIds: MenuId[];
}

// refined page permission types. page NEVER includes wildcard.
// export type PagePermissionMap = Record<string, PagePermissionType>;
export type PagePermissionMap = Record<string, boolean>;

export type PagePermissionTuple = [page: string, permission: PagePermissionType];

// export const BASIC_USER_DEFAULT_PERMISSIONS: MenuId[] = [
//     MENU_ID.HOME_DASHBOARD,
//     MENU_ID.MY_PAGE,
//     MENU_ID.ACCOUNT,
//     MENU_ID.ACCOUNT_PROFILE,
//     MENU_ID.NOTIFICATIONS,
//     MENU_ID.API_KEY,
//     MENU_ID.INFO,
//     MENU_ID.NOTICE,
// ];

export const DOMAIN_ADMIN_DEFAULT_PERMISSIONS: MenuId[] = [
    ...Object.values(MENU_ID),
];

export const WORKSPACE_OWNER_DEFAULT_PERMISSIONS: MenuId[] = [
    MENU_ID.HOME_DASHBOARD,
    MENU_ID.DASHBOARDS,
    MENU_ID.WORKSPACE_DASHBOARDS,
    MENU_ID.PROJECT_DASHBOARDS,
    MENU_ID.PROJECT,
    MENU_ID.ASSET_INVENTORY,
    MENU_ID.CLOUD_SERVICE,
    MENU_ID.SERVER,
    MENU_ID.COLLECTOR,
    MENU_ID.SERVICE_ACCOUNT,
    MENU_ID.COST_EXPLORER,
    MENU_ID.COST_ANALYSIS,
    MENU_ID.BUDGET,
    MENU_ID.ALERT_MANAGER,
    MENU_ID.ALERT,
    MENU_ID.ESCALATION_POLICY,
    MENU_ID.MY_PAGE,
    MENU_ID.ACCOUNT,
    MENU_ID.ACCOUNT_PROFILE,
    MENU_ID.NOTIFICATIONS,
    MENU_ID.API_KEY,
    MENU_ID.INFO,
    MENU_ID.NOTICE,
];
export const WORKSPACE_MEMBER_DEFAULT_PERMISSIONS: MenuId[] = [
    MENU_ID.HOME_DASHBOARD,
    MENU_ID.DASHBOARDS,
    MENU_ID.WORKSPACE_DASHBOARDS,
    MENU_ID.PROJECT_DASHBOARDS,
    MENU_ID.PROJECT,
    MENU_ID.ASSET_INVENTORY,
    MENU_ID.SERVICE_ACCOUNT,
    MENU_ID.COST_EXPLORER,
    MENU_ID.COST_ANALYSIS,
    MENU_ID.BUDGET,
    MENU_ID.ALERT_MANAGER,
    MENU_ID.ALERT,
    MENU_ID.ESCALATION_POLICY,
    MENU_ID.MY_PAGE,
    MENU_ID.ACCOUNT,
    MENU_ID.ACCOUNT_PROFILE,
    MENU_ID.NOTIFICATIONS,
    MENU_ID.API_KEY,
    MENU_ID.INFO,
    MENU_ID.NOTICE,
];

// TODO: this need to be changed with new SYSTEM domain planning
export const SYSTEM_USER_DEFAULT_PERMISSIONS: MenuId[] = [
    MENU_ID.ADMINISTRATION,
    MENU_ID.IAM,
    MENU_ID.ROLE,
    MENU_ID.APP,
    MENU_ID.USER,
    MENU_ID.MY_PAGE,
    MENU_ID.ACCOUNT,
    MENU_ID.ACCOUNT_PROFILE,
    MENU_ID.API_KEY,
    MENU_ID.INFO,
    MENU_ID.NOTICE,
];
export const NO_ROLE_USER_DEFAULT_PERMISSIONS: MenuId[] = [
    MENU_ID.MY_PAGE,
    MENU_ID.ACCOUNT,
    MENU_ID.ACCOUNT_PROFILE,
];
