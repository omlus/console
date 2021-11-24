import { GRANULARITY } from '@/services/billing/cost-management/lib/config';
import { CHART_TYPE } from '@/services/billing/cost-management/cost-analysis/lib/config';
import { CostAnalysisStoreState } from '@/services/billing/cost-management/cost-analysis/store/type';
import { getInitialDates } from '@/services/billing/cost-management/cost-analysis/lib/helper';
import * as actions from './actions';
import * as mutations from './mutations';


const state: CostAnalysisStoreState = {
    chartType: CHART_TYPE.STACKED_COLUMN,
    granularity: GRANULARITY.ACCUMULATED,
    groupByItems: [],
    groupBy: undefined,
    period: getInitialDates(),
    filters: {},
    selectedQueryId: undefined,
    costQueryList: [],
};

export default {
    namespaced: true,
    state: () => ({ ...state }),
    actions,
    mutations,
};
