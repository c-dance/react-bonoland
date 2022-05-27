export const CHART = {
    ACTIVATE: '/cahrt',
    UPDATE: '/chart/data',
    DEACTIVATE: '/'
};

export const activateChart = () => ({
    type: CHART.ACTIVATE,
});

export const deactivateChart = () => ({
    type: CHART.DEACTIVATE
});

export const updateChart = (data) => ({
    type: CHART.UPDATE,
    payload: data
});

