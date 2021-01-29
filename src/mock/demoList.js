
const demoList = {
  status: 200,
  count: 10,
  'data|10': [{
    id: '@guid',
    name: '@cname',
    'age|20-30': 23,
    'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
  }]
}

const menuList = {
  status: 200,
  count: 10,
  data: [
    {
      systemType: 'BASE_SYSTEM',
      menus: [
        {
          children: '',
          code: 'staging',
          icon: 'el-icon-menu',
          id: '1213053645356322817',
          ismenu: 'Y',
          levels: 1,
          linkedList: [],
          name: '\u4E2A\u4EBA\u5DE5\u4F5C\u53F0',
          num: 5,
          parentId: 0,
          systemType: 'BASE_SYSTEM',
          url: '/staging'
        },
        {
          name: '线索管理',
          icon: 'el-icon-link',
          children: [{
            children: '',
            code: 'sysCus',
            icon: 'layui-icon-login-wechat',
            id: '1184757962316423169',
            ismenu: 'Y',
            levels: 2,
            linkedList: [],
            name: '关于我们',
            num: 5,
            parentId: '1191329125740642306',
            systemType: 'BASE_SYSTEM',
            url: '/about'
          }, {
            children: '',
            code: 'batch',
            icon: 'el-icon-star-on',
            id: '1231901672518266881',
            ismenu: 'Y',
            levels: 2,
            linkedList: [],
            name: '批次',
            num: 20,
            parentId: '1191329125740642306',
            systemType: 'BASE_SYSTEM',
            url: '/batch'
          }]
        }
      ]
    }
  ]
}

export default {
  'get|/api/employers': demoList,
  'get|/api/getLeftMenuList': menuList
}
