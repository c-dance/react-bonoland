export const FILTER = {
    REGION: '/filter/region',
    CATEGORY: '/filter/category',
    UPDATE: '/filter/all', 
    RESET: '/filter/reset'

};

export const updateFilter = data => ({
    type: FILTER.UPDATE,
    payload: data
});

export const resetFilter = () => ({
    type: FILTER.RESET
});

export const updateFilterCategory = category => ({
    type: FILTER.CATEGORY,
    payload: category
});
