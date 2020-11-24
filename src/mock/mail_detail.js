import Mock from 'mockjs';
import { param2Obj } from 'utils';

function mockReceiveMail(mailId) {
    if(mailId>115)
        mailId-=112
    else
        mailId--;
    var address_names=['住建局','市政府','住建局','组织部','市政府','住建局','市政府','住建局','组织部','市政府']
    var ip_addresss=['10.90.20.40:80','10.90.10.11:80','10.90.17.22:80','10.90.16.25:80','10.90.15.24:80','10.90.20.40:80','10.90.10.11:80','10.90.20.40:80','10.90.16.25:80','10.90.10.11:80']
    var constellations = ['购房合同.ofd', '疫情防控措施通告.ofd', '关于赤峰新区建设的议案.ofd', '王刚同志入党申请的决定.ofd', '国家行政机关行政处理办法.ofd','不动产证明.ofd','社区防疫通知.ofd','个人不动产交易记录.ofd','建国同志入党申请的决定.ofd','社区隔离具体实行办法.ofd']
    return Mock.mock({
        id: mailId,
        title: constellations[mailId],
        content: '',
        sender: address_names[mailId],
        sendMail: ip_addresss[mailId],
        receiveDate: +Mock.Random.date('T'),
        'isStar|1': true,
        target: [
            {
                name: '己方单位',
                mail: '10.90.10.14'
            },
        ],
        copy: [],
        oldFileList: [
            {
                name: constellations[mailId],
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            }
        ],
        oldAudioList: [
        ],
        labelList: [
        ]
    });
}

function mockSendMail(mailId) {
    mailId-=6
    var constellations = ['县级中学考察报告.ofd', '政府年度财报.ofd', '关于个人所得税的调整通告.ofd', '李强同志入党申请的决定.ofd', '行政机关电子文件处理办法.ofd']
    var address_names=['市政府','市政府','国税局','组织部','市政府']
    var ip_addresss=['10.90.20.40:80','10.90.10.11:80','10.90.17.22:80','10.90.16.25:80','10.90.15.24:80']
    return Mock.mock({
        id: mailId,
        title: constellations[mailId],
        content: '',
        sender: '己方单位',
        sendMail: '10.90.10.14',
        sendDate: +Mock.Random.date('T'),
        target: [
            {
                name: address_names[mailId],
                mail: ip_addresss[mailId]
            },
        ],
        copy: [],
        oldFileList: [
             {
                name: constellations[mailId],
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            }
        ],
        oldAudioList: [],
        labelList: []
    });
}

function mockDraft(mailId) {
    return Mock.mock({
        id: mailId,
        title: `编号为 ${mailId} 的草稿`,
        content: '<p>我是草稿测试数据我是草稿测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        target: [
            {
                name: '曾艳芬',
                mail: 'zengyanfen@snh48.com'
            },
            {
                name: '鞠婧祎',
                mail: 'jujingyi@snh48.com'
            },
            {
                name: '黄婷婷',
                mail: 'huangtingting@snh48.com'
            },
            {
                name: '李艺彤',
                mail: 'liyitong@snh48.com'
            },
            {
                name: '冯薪朵',
                mail: 'fengxinduo@snh48.com'
            }
        ],
        copy: [
            {
                name: '陆婷',
                mail: 'luting@snh48.com'
            },
            {
                name: '万丽娜',
                mail: 'wanlina@snh48.com'
            },
            {
                name: '易嘉爱',
                mail: 'yijiaai@snh48.com'
            },
            {
                name: '林思意',
                mail: 'linsiyi@snh48.com'
            },
            {
                name: '赵粤',
                mail: 'zhaoyue@snh48.com'
            }
        ],
        oldFileList: [
             {
                name: '第四届年度总选',
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            },
            {
                name: '第四届年度总选',
                url: 'http://onh4i9vxw.bkt.clouddn.com/bq.jpg'
            }
        ],
        oldAudioList: [
            {
                name: '三无MarBlue - 星星和雨的夜.mp3',
                url: 'http://or7rpa0sk.bkt.clouddn.com/%E4%B8%89%E6%97%A0MarBlue%20-%20%E6%98%9F%E6%98%9F%E5%92%8C%E9%9B%A8%E7%9A%84%E5%A4%9C.mp3'
            },
            {
                name: '三无MarBlue - 星星和雨的夜.mp3',
                url: 'http://or7rpa0sk.bkt.clouddn.com/%E4%B8%89%E6%97%A0MarBlue%20-%20%E6%98%9F%E6%98%9F%E5%92%8C%E9%9B%A8%E7%9A%84%E5%A4%9C.mp3'
            }
        ]
    });
}

export default {
    getDetail: query => {
        const { mailId, mailType } = param2Obj(query.url);
        if (mailType === 'receive') {
            return mockReceiveMail(mailId);
        } else if (mailType === 'send') {
            return mockSendMail(mailId);
        } else {
            return mockDraft(mailId);
        }
    }
}