export const FILTER = {
    REGION: '/filter/region',
    CATEGORY: '/filter/category',
    ALL: '/filter/all'
};

export const updateFilterRegion = region => ({
    type: FILTER.REGION,
    payload: region
});

export const updateFilter = data => ({
    type: FILTER.ALL,
    payload: data
})

export const updateFilterCategory = category => ({
    type: FILTER.CATEGORY,
    payload: category
});