<script setup lang="ts">
import { computed, reactive } from 'vue';

import {
    PHeading, PPaneLayout, PLazyImg, PAvatar,
} from '@cloudforet/mirinae';

import DomainAdminImage from '@/assets/images/role/img_avatar_admin.png';
import UserImage from '@/assets/images/role/img_avatar_no-role.png';
import SystemAdminImage from '@/assets/images/role/img_avatar_system-admin.png';
import WorkspaceMemberImage from '@/assets/images/role/img_avatar_workspace-member.png';
import WorkspaceOwnerImage from '@/assets/images/role/img_avatar_workspace-owner.png';
import { ROLE_TYPE } from '@/schema/identity/role/constant';
import type { RoleType } from '@/schema/identity/role/type';
import type { AuthType } from '@/schema/identity/user/type';

import { useUserStore } from '@/store/user/user-store';

import config from '@/lib/config';

import UserAccountBaseInformation from '@/services/my-page/components/UserAccountBaseInformation.vue';
import UserAccountChangePassword from '@/services/my-page/components/UserAccountChangePassword.vue';
import UserAccountMultiFactorAuth from '@/services/my-page/components/UserAccountMultiFactorAuth.vue';
import UserAccountNotificationEmail from '@/services/my-page/components/UserAccountNotificationEmail.vue';


const userStore = useUserStore();
const storeState = reactive({
    authType: computed<AuthType|undefined>(() => userStore.state.authType),
    baseRoleType: computed<RoleType|undefined>(() => userStore.state.roleType),
    currentRoleType: computed(() => userStore.state.currentRoleInfo?.roleType),
    userId: computed<string|undefined>(() => userStore.state.userId),
});
const state = reactive({
    smtpEnabled: computed(() => config.get('SMTP_ENABLED')),
    icon: computed<string>(() => {
        if (userStore.getters.isSystemAdmin) return SystemAdminImage;
        if (userStore.getters.isDomainAdmin) return DomainAdminImage;
        const currentRoleType = storeState.currentRoleType;
        if (currentRoleType === ROLE_TYPE.WORKSPACE_OWNER) return WorkspaceOwnerImage;
        if (currentRoleType === ROLE_TYPE.WORKSPACE_MEMBER) return WorkspaceMemberImage;
        return UserImage;
    }),
    roleType: computed(() => {
        if (storeState.baseRoleType === ROLE_TYPE.DOMAIN_ADMIN) return 'Admin';
        if (storeState.currentRoleType === ROLE_TYPE.WORKSPACE_OWNER) return 'Workspace Owner';
        if (storeState.currentRoleType === ROLE_TYPE.WORKSPACE_MEMBER) return 'Workspace Member';
        return 'User';
    }),
});
</script>

<template>
    <section class="user-account-page">
        <p-heading class="mb-6"
                   :title="$t('MY_PAGE.ACCOUNT.ACCOUNT_N_PROFILE')"
        />
        <div class="contents-wrapper">
            <p-pane-layout class="role-card-content">
                <div class="icon-wrapper">
                    <p-avatar size="xl" />
                    <p-lazy-img v-if="state.roleType === 'Admin'"
                                :src="state.icon"
                                class="user-icon"
                                width="1.5rem"
                                height="1.5rem"
                    />
                </div>
                <span class="role-type-name">
                    {{ state.roleType }}
                </span>
                <span class="role-type-description">
                    {{ storeState.userId }}
                </span>
            </p-pane-layout>
            <div class="user-account-wrapper">
                <user-account-base-information />
                <user-account-change-password v-if="storeState.authType === 'LOCAL'" />
                <user-account-notification-email v-if="state.smtpEnabled && (storeState.authType === 'LOCAL' || storeState.authType === 'EXTERNAL')" />
                <user-account-multi-factor-auth />
            </div>
        </div>
    </section>
</template>

<style lang="postcss" scoped>
.user-account-page {
    @apply flex flex-col;
    .contents-wrapper {
        @apply flex;
        gap: 1rem;
        .role-card-content {
            @apply flex flex-col items-center justify-center text-label-md text-gray-800;
            width: 20.125rem;
            height: 10.625rem;
            gap: 0.5rem;
            .role-type-name {
                @apply font-bold;
            }

            @apply mobile:hidden;
        }
        .user-account-wrapper {
            width: 100%;
            flex: 1;
        }

        .icon-wrapper {
            position: relative;

            & .user-icon {
                bottom: 0;
                right: 0;
                position: absolute;
            }
        }
    }
}

/* custom design-system component - p-lazy-img */
:deep(.p-lazy-img .img-container) {
    @apply rounded-full;
}
</style>
