/*
 * @Author: zhanghan
 * @Date: 2020-07-29 17:56:34
 * @LastEditors: zhanghan
 * @LastEditTime: 2020-07-29 18:37:10
 * @Descripttion: 子组件测试
 */

Vue.component('test', {
  template: `
    <div>
        <div>{{msg}}姓名：{{name}}</div>
        <el-button>子组件测试</el-button>
    </div>
  `,
  data() {
    return {
      msg: '子组件测试'
    }
  },
  props: {
    name: {
      type: String,
      default: () => {
        return 'noName';
      }
    }
  },
  methods: {}
})
