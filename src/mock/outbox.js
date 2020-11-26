import Mock, { Random } from 'mockjs';
import { param2Obj } from 'utils';

const list = [];
const count = 5;
var ii = -2;
Random.extend({
    name: function(date) {
        var names = ['国家食品（云技术应用）质量监督检验中心', '国家风电设备质量监督检验中心（江苏）', '国家轻工业香料洗涤用品质量监督检测天津站', 
                      '中国水利水电科学研究院工程检测中心', '农业农村部动物及动物产品卫生质量监督检验测试中心'];
        return names[++ii];
    },

    address: function(date) {
        var addresses = ['北京市北京经济技术开发区永昌南路19号1号楼', '山西省晋中市榆次区桥东街216号', '北京市海淀区西直门外上园村3号交大科技大厦', '广西壮族自治区南宁市青秀区民族大道74号', '江苏省盐城市盐城高新技术产业开发区江苏省盐城市高新技术产业区纬七路2号'];
        return addresses[ii];
    },

    contact: function(date) {
        var contacts = ['闫轶菲	', '赖廷和', '孙同金', '朱敬华', '徐红'];
        return contacts[ii];
    },

    certification_id: function(date) {
        var certification_ids = ['170000303965', '200012194409', '170008113960', '200010264408', '160001081466'];
        return certification_ids[ii];
    },

    certification_ins: function(date) {
        var certification_inses = ['国家认证认可监督管理委员会', '国家认证认可监督管理委员会', '国家认证认可监督管理委员会', '国家认证认可监督管理委员会', '国家认证认可监督管理委员会'];
        return certification_inses[ii];
    },

    status: function(date) {
        var statuses = ['有效', '有效', '有效', '有效', '有效'];
        return statuses[ii];
    },

    operate: function(date) {
        var operates = ['查看', '查看', '查看', '查看', '查看'];
        return operates[ii];
    }

})
Random.name();
Random.address();
Random.contact();
Random.certification_id();
Random.certification_ins();
Random.status();
Random.operate();

for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
        id: '@increment',
        'isStar|1': true,
        'isHaveFile|1': true,
        'isHaveAudio|1': true,
        name: '@NAME',
        address: '@ADDRESS',
        contact: "@CONTACT",
        certification_id: "@CERTIFICATION_ID",
        certification_ins: "@CERTIFICATION_INS",
        status: "@STATUS",
        operate: "@OPERATE",
        date: +Mock.Random.date('T')
    }));
}

export default {
    getList: config => {
        const { name, address, contact, certification_id, certification_ins, status, page, limit, sort, order } = param2Obj(config.url);
        const mockList = list.filter(item => {
            if (name && item.name.indexOf(name) < 0) return false;
            if (address && item.address.indexOf(address) < 0) return false;
            if (contact && item.contact.indexOf(contact) < 0) return false;
            if (certification_id && item.certification_id.indexOf(certification_id) < 0) return false;
            if (certification_ins && item.certification_ins.indexOf(certification_ins) < 0) return false;
            if (status && item.status.indexOf(status) < 0) return false;
            // if (receiveName && item.receiveList.every(receive => receive.name.indexOf(receiveName) < 0)) return false;
            // if (receiveMail && item.receiveList.every(receive => receive.mail.indexOf(receiveMail) < 0)) return false;
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