import fetch from 'utils/fetch';

export function fetchDetail(query) {
    
    return fetch({
        url: '/certification_detail',
        method: 'get',
        params: query
    });
}
