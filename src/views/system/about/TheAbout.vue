<template>
  <div class="the-about">
    About
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
  }
}
</script>
