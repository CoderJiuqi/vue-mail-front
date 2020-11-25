import Mock, {Random} from 'mockjs';
import { param2Obj } from 'utils';

const list = [];
const count = 5;
var ii = -1
Random.extend({
    constellation: function(date) {
        
        var constellations = ['不动产证明.ofd', '社区防疫通知.ofd', '个人不动产交易记录.ofd', '建国同志入党申请的决定.ofd', '社区隔离具体实行办法.ofd']
        
        return constellations[ii++]
    },
    address_name: function(){
        var address_names=['住建局','市政府','住建局','组织部','市政府']

        return address_names[ii]
    },
    ip_address: function(){
        var ip_addresss=['10.90.20.40:80','10.90.10.11:80','10.90.17.22:80','10.90.16.25:80','10.90.15.24:80']
        return ip_addresss[ii]
    }

})
Random.ip_address()
Random.address_name()
Random.constellation()

for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
        id: '@increment',
        'isStar|1': true,
        'isHaveFile|1': true,
        'isHaveAudio|1': true,
        'type|1': ['receive', 'send'],
        sendName: '@ADDRESS_NAME',
        sendMail: '@IP_ADDRESS',
        labelList: [
            {
                guid: '1',
                name: '标签1'
            },
            {
                guid: '2',
                name: '标签2'
            },
            {
                guid: '3',
                name: '标签3'
            }
        ],
        title: '@CONSTELLATION',
        date: +Mock.Random.date('T')
    }));
}

export default {
    getList: config => {
        const { type, title, startDate, stopDate, page, limit, routeQuery, sort, order } = param2Obj(config.url);
        const mockList = list.filter(item => {
            if (type && item.type !== type) return false;
            if (title && item.title.indexOf(title) < 0) return false;
            if (startDate && item.date < startDate) return false;
            if (stopDate && item.date > stopDate) return false;
            // if (routeQuery) {
            //     // 路由查询参数
            //     for (const field in routeQuery) {
            //         if (item[field] === routeQuery[field]) {
            //             return true;
            //         }
            //     }
            // }
            return true;
        });
        function orderFunc(a, b) {
            if (order === 'ascending') {
                return a[sort] - b[sort];
            } else {
                return b[sort] - a[sort];
            }
        }
        sort && mockList.sort(orderFunc);
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        return {
            total: mockList.length,
            items: pageList
        }
    },

    deleteItem: config => {
        var { idArr } = param2Obj(config.url);
        idArr = idArr.split(',')
        for(var j = 0; j < idArr.length; j++){
            var i;
            for(i = 0; i < list.length && String(list[i].id) != idArr[j]; i++);
            console.log('i', i);
            list.splice(i, 1);
        };
    }
};