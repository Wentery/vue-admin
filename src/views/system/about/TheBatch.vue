<template>
  <div class="the-about">
    <el-button @click="goAbout">关于我们</el-button>
  </div>
</template>
<script>
export default {
  name: 'EmployerList',
  props: {
    query: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  watch: {
    query () {
      console.log(this.query)
    }
  },
  created () {
    console.log(this.query)
    this.$api.getEmployers().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
    goAbout () {
      this.$tab.openTab({
        component: 'TheAbout',
        label: '关于我们',
        query: {
          num: Math.random()
        },
        path: '/about', // 与router/path.js做映射 *必填
        isMenu: false
      })
    }
  }
}
</script>
