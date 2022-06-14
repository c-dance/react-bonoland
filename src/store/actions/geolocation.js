export const GEOLOCATION = '/geolocation';

export const updateGeolocation = latlng => ({
    type: GEOLOCATION,
    payload: latlng
});
