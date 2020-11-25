import Mock, { Random } from 'mockjs';
import { param2Obj } from 'utils';

const list = [];
const count = 5;
var ii = -1
Random.extend({
    constellation: function(date) {
        
        var constellations = ['县级中学考察报告.ofd', '政府年度财报.ofd', '关于个人所得税的调整通告.ofd', '李强同志入党申请的决定.ofd', '行政机关电子文件处理办法.ofd']
        
        return constellations[ii]
    },
    address_name: function(){
        var address_names=['市政府','市政府','国税局','组织部','市政府']

        return address_names[ii]
    },
    ip_address: function(){
        var ip_addresss=['10.90.20.40:80','10.90.10.11:80','10.90.17.22:80','10.90.16.25:80','10.90.15.24:80']
        return ip_addresss[ii++]
    }
})
Random.address_name()
Random.ip_address()
Random.constellation()

for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
        id: '@increment',
        'isStar|1': true,
        'isHaveFile|1': true,
        'isHaveAudio|1': true,
        receiveList: [],
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
        sendDate: +Mock.Random.date('T')
    }));
    for (let r = 0; r < 1; r++) {
        list[i].receiveList.push(Mock.mock({
            name: '@ADDRESS_NAME',
            mail: '@IP_ADDRESS'
        }))
    }
}

export default {
    getList: config => {
        const { title, receiveName, receiveMail, page, limit, sort, order } = param2Obj(config.url);
        const mockList = list.filter(item => {
            if (title && item.title.indexOf(title) < 0) return false;
            if (receiveName && item.receiveList.every(receive => receive.name.indexOf(receiveName) < 0)) return false;
            if (receiveMail && item.receiveList.every(receive => receive.mail.indexOf(receiveMail) < 0)) return false;
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
            list.splice(i, 1);
        };
    }
};