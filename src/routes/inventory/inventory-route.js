import { fluentApi } from '@/lib/fluent-api';

const CloudServicePage = () => import('@/views/inventory/cloud-service/pages/CloudServicePage.vue');

const Inventory = () => import('@/views/inventory/Inventory.vue');
const InventoryNavBar = () => import('@/views/inventory/InventoryNavBar.vue');
// const DataCenter = () => import('@/views/inventory/data-center/DataCenter.vue');
const Server = () => import('@/views/inventory/server/Server.vue');
// const CloudService = () => import('@/views/inventory/cloud-service/pages/CloudService.vue');
const CloudService = () => import('@/views/inventory/cloud-service/pages/CloudServiceType.vue');
const TagsPage = () => import('@/views/common/tags/TagsPage.vue');

export default {
    path: 'inventory',
    name: 'inventory',
    redirect: 'inventory/server',
    meta: { label: 'Inventory', breadcrumb: true },
    components: {
        lnb: InventoryNavBar,
        main: Inventory,
    },
    children: [
        // {
        //     path: 'data-center',
        //     name: 'dataCenter',
        //     meta: { label: 'Data Center', breadcrumb: true },
        //     component: DataCenter,
        // },
        {
            path: 'server',
            meta: {
                label: 'Server',
                breadcrumb: true,
                api: fluentApi.inventory().server(),
            },
            component: { template: '<router-view />' },
            children: [
                {
                    path: '/',
                    name: 'server',
                    component: Server,
                },
                {
                    path: ':resourceId/tags',
                    name: 'serverTags',
                    meta: { label: 'tags' },
                    props: true,
                    component: TagsPage,
                },
            ],
        },
        {
            path: 'cloud-service',
            name: 'cloudService',
            redirect: '/inventory/cloud-service',
            meta: { label: 'Cloud Service', breadcrumb: true, beta: true },
            component: { template: '<router-view />' },
            children: [
                {
                    path: '/',
                    name: 'cloudServiceMain',
                    component: CloudService,
                },
                {
                    path: ':provider/:group/:name',
                    props: true,
                    meta: {
                        label: 'Cloud Service',
                        api: fluentApi.inventory().cloudService(),
                    },
                    component: { template: '<router-view />' },
                    children: [
                        {
                            path: '/',
                            name: 'cloudServicePage',
                            props: true,
                            component: CloudServicePage,
                        },
                        {
                            path: ':resourceId/tags',
                            name: 'cloudServicePageTags',
                            meta: { label: 'tags' },
                            props: true,
                            component: TagsPage,
                        },
                    ],
                },
            ],

        },
    ],
};
