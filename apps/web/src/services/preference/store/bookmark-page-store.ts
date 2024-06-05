import { computed, reactive } from 'vue';
import type { TranslateResult } from 'vue-i18n';

import { defineStore } from 'pinia';

import { SpaceConnector } from '@cloudforet/core-lib/space-connector';
import { ApiQueryHelper } from '@cloudforet/core-lib/space-connector/helper';

import type { ListResponse } from '@/schema/_common/api-verbs/list';
import type { DomainConfigCreateParameters } from '@/schema/config/domain-config/api-verbs/create';
import type { DomainConfigListParameters } from '@/schema/config/domain-config/api-verbs/list';
import type { DomainConfigModel } from '@/schema/config/domain-config/model';
import type { WorkspaceConfigCreateParameters } from '@/schema/config/workspace-config/api-verbs/create';
import type { WorkspaceConfigListParameters } from '@/schema/config/workspace-config/api-verbs/list';
import type { WorkspaceConfigModel } from '@/schema/config/workspace-config/model';
import { store } from '@/store';

import { useUserWorkspaceStore } from '@/store/app-context/workspace/user-workspace-store';

import getRandomId from '@/lib/random-id-generator';

import { DEFAULT_BOOKMARK } from '@/common/components/bookmark/constant/constant';
import type { BookmarkItem } from '@/common/components/bookmark/type/type';
import ErrorHandler from '@/common/composables/error/errorHandler';

export const useBookmarkPageStore = defineStore('page-bookmark', () => {
    const userWorkspaceStore = useUserWorkspaceStore();
    const userWorkspaceStoreGetters = userWorkspaceStore.getters;

    const _getters = reactive({
        domainId: computed<string>(() => store.state.domain.domainId),
        userId: computed<string>(() => store.state.user.userId),
        currentWorkspaceId: computed<string|undefined>(() => userWorkspaceStoreGetters.currentWorkspaceId),
    });

    const state = reactive({
        globalBookmarkData: [] as BookmarkItem[],
        workspaceBookmarkData: [] as BookmarkItem[],
    });

    const getters = reactive({
        allBookmarkFolderItems: computed<BookmarkItem[]>(() => ([
            ...getters.globalBookmarkFolderData,
            ...getters.workspaceBookmarkFolderData,
        ])),
        globalBookmarkFolderData: computed<BookmarkItem[]>(() => state.globalBookmarkData.filter((f) => !f.link) || []),
        workspaceBookmarkFolderData: computed<BookmarkItem[]>(() => state.workspaceBookmarkData.filter((f) => !f.link) || []),
    });

    const actions = {
        resetState: () => {
            state.globalBookmarkData = [];
            state.workspaceBookmarkData = [];
        },
        fetchGlobalBookmarkList: async () => {
            const bookmarkListApiQuery = new ApiQueryHelper()
                .setSort('created_at', false)
                .setFilters([
                    { k: 'domain_id', v: _getters.domainId, o: '=' },
                    { k: 'name', v: 'console:bookmark:global', o: '' },
                ]);
            try {
                const { results } = await SpaceConnector.clientV2.config.domainConfig.list<DomainConfigListParameters, ListResponse<DomainConfigModel>>({
                    query: bookmarkListApiQuery.data,
                });
                state.globalBookmarkData = (results ?? []).map((i) => ({
                    ...i.data,
                    id: i.name,
                } as BookmarkItem));
                if (state.globalBookmarkData.length === 0) {
                    await actions.createDefaultBookmark();
                    return;
                }
            } catch (e) {
                ErrorHandler.handleError(e);
                state.globalBookmarkData = [];
            }
        },
        fetchWorkspaceBookmarkList: async () => {
            const bookmarkListApiQuery = new ApiQueryHelper()
                .setSort('created_at', true)
                .setFilters([
                    { k: 'domain_id', v: _getters.domainId, o: '=' },
                    { k: 'name', v: 'console:bookmark:workspace', o: '' },
                ]);
            try {
                const { results } = await SpaceConnector.clientV2.config.workspaceConfig.list<WorkspaceConfigListParameters, ListResponse<WorkspaceConfigModel>>({
                    query: bookmarkListApiQuery.data,
                });
                state.workspaceBookmarkData = (results ?? []).map((i) => ({
                    ...i.data,
                    id: i.name,
                } as BookmarkItem));
            } catch (e) {
                ErrorHandler.handleError(e);
                state.workspaceBookmarkData = [];
            }
        },
        createDefaultBookmark: async () => {
            const DefaultBookmarkData = DEFAULT_BOOKMARK.map((i) => ({
                ...i,
                workspaceId: _getters.currentWorkspaceId,
            }));
            try {
                await Promise.all(DefaultBookmarkData.map(async (item) => {
                    await actions.createGlobalBookmark({
                        name: item.name as string || '',
                        link: item.link || '',
                        imgIcon: item.imgIcon,
                    });
                }));
            } catch (e) {
                ErrorHandler.handleError(e);
            }
        },
        createGlobalBookmark: async ({
            name, link, folder, imgIcon,
        }: { name?: string|TranslateResult, link?: string, folder?: string, imgIcon?: string}) => {
            try {
                await SpaceConnector.clientV2.config.domainConfig.create<DomainConfigCreateParameters, DomainConfigModel>({
                    name: `console:bookmark:global:${name}-${getRandomId()}`,
                    data: {
                        name,
                        folder,
                        link,
                        imgIcon,
                    },
                });
                await actions.fetchGlobalBookmarkList();
            } catch (e) {
                ErrorHandler.handleError(e);
                throw e;
            }
        },
        createWorkspaceBookmark: async ({
            name, link, folder, imgIcon,
        }: { name?: string|TranslateResult, link?: string, folder?: string, imgIcon?: string}) => {
            try {
                await SpaceConnector.clientV2.config.workspaceConfig.create<WorkspaceConfigCreateParameters, WorkspaceConfigModel>({
                    name: `console:bookmark:workspace:${name}-${getRandomId()}`,
                    data: {
                        workspaceId: _getters.currentWorkspaceId,
                        name,
                        folder,
                        link,
                        imgIcon,
                    },
                });
                await actions.fetchWorkspaceBookmarkList();
            } catch (e) {
                ErrorHandler.handleError(e);
                throw e;
            }
        },
    };

    return {
        state,
        getters,
        ...actions,
    };
});
