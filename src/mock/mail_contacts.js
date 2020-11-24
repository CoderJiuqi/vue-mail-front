import Mock from 'mockjs';
import { param2Obj } from 'utils';

let list = [];
const count = 5;

// for (let i = 0; i < count - 5; i++) {
//     list.push(Mock.mock({
//         id: '@increment',
//         name: '@cname',
//         mail: '@email("abc.com")',
//         avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
//     }));
// }
list = list.concat([
    {
        id: '1',
        name: '国税局',
        mail: '10.90.20.40:80',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    },
    {
        id: '2',
        name: '住建局',
        mail: '10.90.10.11:80',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    },
    {
        id: '3',
        name: '交通局',
        mail: '10.90.17.22:80',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    },
    {
        id: '4',
        name: '工商局',
        mail: '10.90.16.25:80',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    },
    {
        id: '5',
        name: '教育局',
        mail: '10.90.15.24:80',
        avatarUrl: 'http://or7rpa0sk.bkt.clouddn.com/avatar.jpg'
    }
]);

export default {
    getList: config => {
        const { name, mail, groupId, page, limit } = param2Obj(config.url);
        let mockList = list.filter(item => {
            if (name && item.name.indexOf(name) < 0) return false;
            if (mail && item.mail.indexOf(mail) < 0) return false;
            if (groupId && item.groupId !== groupId) return false;
            return true;
        });
        if (page) {
            mockList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        }
        return {
            total: list.length,
            contacts: mockList
        }
    }
};