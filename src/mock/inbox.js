import Mock, { Random } from 'mockjs';
import { param2Obj } from 'utils';

const list = [];
const count = 5;
var ii = -1
Random.extend({
    constellation: function(date) {
        
        var constellations = ['购房合同.ofd', '疫情防控措施通告.ofd', '关于赤峰新区建设的议案.ofd', '王刚同志入党申请的决定.ofd', '国家行政机关行政处理办法.ofd']
        
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
        'status|1': [0, 1, 2, 3],
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
        receiveDate: +Mock.Random.date('T'),
        readDate: +Mock.Random.date('T')
    }));
}

export default {
    getList: config => {
        const { status, title, page, limit, sort, order } = param2Obj(config.url);
        let mockList = list.filter(item => {
            if (status && item.status !== +status) return false;
            if (title && item.title.indexOf(title) < 0) return false;
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
        if (page) {
            mockList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        }
        return {
            total: mockList.length,
            items: mockList
        }
    }
};