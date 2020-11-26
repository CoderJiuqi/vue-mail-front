import Mock, { Random } from 'mockjs';
import { param2Obj } from 'utils';

const list = [];
const count = 5;
var ii = -2;
Random.extend({
    type: function(date) {
        var types = ['接口注册', '证书推送', '证书读取', '接收证书', '推送证书', '结果反馈'];
        return types[++ii];
    },

    name: function(date) {
        var names = ['国家食品（云技术应用）质量监督检验中心', '国家风电设备质量监督检验中心（江苏）', '国家轻工业香料洗涤用品质量监督检测天津站', 
                      '中国水利水电科学研究院工程检测中心', '农业农村部动物及动物产品卫生质量监督检验测试中心'];
        return names[ii];
    },

    certification_id: function(date) {
        var certification_ids = ['170000303965', '200012194409', '170008113960', '200010264408', '160001081466'];
        return certification_ids[ii];
    },

    interface: function(date) {
        var interfaces = ['拉取文件', '推送文件', '读取文件', '写入文件', '拉取文件', '检查状态'];
        return interfaces[ii];
    },

    ip_address: function(){
        var ip_addresss=['10.90.20.40:80','10.90.10.11:80','10.90.17.22:80','10.90.16.25:80','10.90.15.24:80'];
        return ip_addresss[ii]
    },

    status: function(date) {
        var statuses = ['有效', '有效', '有效', '有效', '有效'];
        return statuses[ii];
    },

})
Random.type();
Random.name();
Random.certification_id();
Random.interface();
Random.ip_address();
Random.status();

for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
        id: '@increment',
        'isStar|1': true,
        'isHaveFile|1': true,
        'isHaveAudio|1': true,
        'logId|4500000-4600000': 1,
        type: '@type',
        name: '@NAME',
        certification_id: "@CERTIFICATION_ID",
        interface: '@INTERFACE',
        ip_address: '@IP_ADDRESS',
        date: +Mock.Random.date('T'),
        status: '@STATUS'
    }));
}

export default {
    getList: config => {
        const { logId, type, name, certification_id, interface_, status, page, limit, sort, order } = param2Obj(config.url);
        const mockList = list.filter(item => {
            if (logId && String(item.logId).indexOf(String(logId)) < 0) return false;
            if (type && item.type.indexOf(type) < 0) return false;
            if (name && item.name.indexOf(name) < 0) return false;
            if (certification_id && item.certification_id.indexOf(certification_id) < 0) return false;
            if (interface_ && item.interface.indexOf(interface_) < 0) return false;
            if (status && item.status.indexOf(status) < 0) return false;
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
        idArr = idArr.split(',');
        for(var j = 0; j < idArr.length; j++){
            var i;
            for(i = 0; i < list.length && list[i].logId != idArr[j]; i++);
            list.splice(i, 1);
        };
    }
};