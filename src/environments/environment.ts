
const BASE_DOMAIN = `https://bikeportal.cyclic.app`;
export const environment = {
    production: true,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzYW1hIiwiaWF0IjoxNzEzMjA4MjUxLCJleHAiOjE3MTMyMTAwNTF9.z062_VB04hteNabnSKha6n2i4CEe5zjiKSJrPu9-UWA',

    USER_BASE_URL: BASE_DOMAIN + '/api/user',
    BIKE_BASE_URL: BASE_DOMAIN + '/bikes',
    BIKE: {
        ALL: '/all',
        GET_BY_HANDLE: '/by-handle',
        SEARCH_BY_TITLE: '/search/by-title',
    }
};