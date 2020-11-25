import fetch from 'utils/fetch';
import { Observable } from 'rxjs/Observable';

export function fetchList(query) {
    return fetch({
        url: '/inbox/list',
        method: 'get',
        params: query
    });
}

export function fetchUnReadList() {
    return fetch({
        url: '/inbox/list',
        method: 'get',
        params: { status: 0, sort: 'receiveDate', order: 'descending' }
    });
}

export function delReceiveMail(idArr) {
    const idStr = String(idArr);
    // idArr = Array(idArr);
    console.log('要删除的收件id:' + idStr);
    fetch({
        url: '/inbox/list',
        method: 'delete',
        params: { idArr: idArr.join(',') }
    });

    return Observable.create(observer => {
        setTimeout(() => { observer.next(true); }, 1000);
    });
}