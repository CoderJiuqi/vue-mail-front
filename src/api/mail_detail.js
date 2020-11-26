import fetch from 'utils/fetch';
import { Observable } from 'rxjs/Observable';

export function fetchDetail(query) {
    return fetch({
        url: '/inbox/list',
        method: 'getone',
        params: query
    })
}

export function delMail() {
    return Observable.create(observer => {
        setTimeout(() => observer.next(), 1000);
    })
}