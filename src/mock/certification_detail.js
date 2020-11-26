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

    phone: function(date) {
        var phones = ['010-67867683', '010-67564986', '010-68612354', '010-67856748', '010-67864235',];
        return phones[ii];
    },

    fax_num: function(date) {
        var fax_nums = ['010-67546237', '010-67778767', '010-67845678', '010-6987678', '010-67829348',];
        return fax_nums [ii];
    },

    mail_num: function(date) {
        var mail_nums = ['100176', '100382', '100787', '038200', '037659',];
        return mail_nums[ii];
    },

    industry: function(date) {
        var industries = ['医疗器械', '环境与环保', '电子信息', '环境与环保', '综合'];
        return industries[ii];
    },
    
    email: function(date) {
        var emails = ['ycszjzx103@163.com', 'fasdfasfd@102.com', 'msyhzhaoxu@163.com', 'jichuzhongxin@126.com', 'kjhjkh34@qq.com'];
        return emails[ii];
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
Random.phone();
Random.fax_num();
Random.mail_num();
Random.industry();
Random.email();

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
        phone: "@PHONE",
        fax_num: "@FAX_NUM",
        mail_num: "@MAIL_NUM",
        industry: "@INDUSTRY",
        email: "@EMAIL",
        date: +Mock.Random.date('T')
    }));
}

export default {
    getDetail: config => {
        const { certificationId } = param2Obj(config.url);
        let mockList = list.filter(item => {
            if (certificationId && item.certification_id.indexOf(certificationId) < 0) return false;
            return true;
        });
        console.log(mockList[0]);
        return {
            detail: mockList[0]
        }
    },

};