import Mock, { Random } from 'mockjs';
import { param2Obj } from 'utils';
import { config } from 'vue';

var list = [];
const count = 5;
var ii = -1;
Random.extend({
    constellation: function(date) {
        
        var constellations = ['pushFile()', 'readFile()', 'writeFile()', 'pullFile()', 'checkStatus()']
        
        return constellations[ii]
    },
    address_name: function(){
        var address_names=['POST','GET','POST','GET','GET']

        return address_names[ii]
    },
    ip_address: function(){
        var ip_addresss=['string','string,int','string','string,int','int']
        return ip_addresss[ii]
    },
    return_para: function(){
        var ip_addresss=['boolean','object','boolean','object','string']
        return ip_addresss[ii]
    },
    textarea: function(){
        var ip_addresss=['推送文件','读取文件','写入文件','拉取文件','检查状态']
        return ip_addresss[ii++]
    }

})
Random.ip_address()
Random.address_name()
Random.constellation()
Random.return_para()
Random.textarea()

for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
        id: '@increment',
        'isStar|1': true,
        'isHaveFile|1': true,
        'isHaveAudio|1': true,
        'status|1': [0, 1, 2, 3],
        sendName: '@ADDRESS_NAME',
        sendMail: '@IP_ADDRESS',
        target: [
            {
                mail: '@IP_ADDRESS',
                name: '@RETURN_PARA',
            }
        ],
        title: '@CONSTELLATION',
        receiveDate: '@TEXTAREA',
        readDate: +Mock.Random.date('T')
    }));
}

export default {
    getList: config => {
        const { inType, name, return_params, type, status, title, page, limit, sort, order } = param2Obj(config.url);
        console.log("here")
        let mockList = list.filter(item => {
            if (inType && item.sendName.indexOf(inType) < 0) return false;
            if (return_params && item.sendMail.indexOf(return_params) < 0) return false;
            if (type && item.receiveDate.indexOf(type) < 0) return false;
            if (name && item.title.indexOf(name) < 0) return false;
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
    },
    getOne: config=>{
        const { mailId, mailType } = param2Obj(config.url);
        var i;
        for(i = 0; i < list.length && String(list[i].id) != mailId; i++);
        return list[i];
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
    },
    modify : config=>{
        var obj= eval('(' + config.body + ')')
        var idArr =obj.idArr;
        
        if(idArr!=-1)
        {
            var i;
            for(i = 0; i < list.length && String(list[i].id) != idArr; i++);
            console.log('i', i);
            list.splice(i, 1);
        }
        list.push(Mock.mock({
            id: '@increment',
            'isStar|1': true,
            'isHaveFile|1': true,
            'isHaveAudio|1': true,
            'status|1': [0, 1, 2, 3],
            sendName: obj.input_type,
            sendMail: '@IP_ADDRESS',
            target: [
                {
                    mail: obj.input_para,
                    name: obj.return_para
                }
            ],
            labelList: [],
            title: obj.input_name,
            receiveDate: obj.textarea,
            readDate: +Mock.Random.date('T')
        }));
        console.log(list.length);
    }
};