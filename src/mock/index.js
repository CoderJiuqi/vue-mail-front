import Mock from 'mockjs';
import loginAPI from './login';
import inboxAPI from './inbox';
import outboxAPI from './outbox';
import draftboxAPI from './draftbox';
import mailDetailAPI from './mail_detail';
import mailLabelAPI from './mail_label';
import mailListAPI from './mail_list';
import groupAPI from './mail_group';
import contactsAPI from './mail_contacts';
import certifacation_detailAPI from './certification_detail'

// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByEmail);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// 邮件相关
Mock.mock(/\/inbox\/list/, 'get', inboxAPI.getList);
Mock.mock(/\/inbox\/list/, 'delete', inboxAPI.deleteItem);
Mock.mock(/\/inbox\/list/,'modify',inboxAPI.modify);
Mock.mock(/\/inbox\/list/,'getone',inboxAPI.getOne);
Mock.mock(/\/outbox\/list/, 'get', outboxAPI.getList);
Mock.mock(/\/outbox\/list/, 'delete', outboxAPI.deleteItem);
Mock.mock(/\/draftbox\/list/, 'get', draftboxAPI.getList);
Mock.mock(/\/contacts\/list/, 'get', contactsAPI.getList);
Mock.mock(/\/mail_detail/, 'get', mailDetailAPI.getDetail);
Mock.mock(/\/mail_label\/list/, 'get', mailLabelAPI.getList);
Mock.mock(/\/mail_list/, 'get', mailListAPI.getList);
Mock.mock(/\/mail_list/, 'delete', mailListAPI.deleteItem);
Mock.mock(/\/mail_group\/list/, 'get', groupAPI.getList);
Mock.mock(/\/mail_contacts\/list/, 'get', contactsAPI.getList);
Mock.mock(/\/certification_detail/, 'get', certifacation_detailAPI.getDetail)

export default Mock;