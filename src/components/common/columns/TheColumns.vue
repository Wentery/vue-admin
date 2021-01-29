<template>
  <div class="the-columns left-right">
    <div class="pull-left part">
      <p class="title">可添加的列</p>
      <div class="checkbox content">
        <el-checkbox class="check-all" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="list" @change="handleCheckedChange">
            <el-checkbox v-for="(item, index) in lists" :label="item.id" :key="index">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="pull-right part">
      <div class="title">
        <p>展示字段</p>
        <span class="clear-all" @click="handleClearAll">清空全部</span>
      </div>
      <ul class="content">
        <li v-for="item in checked" :key="item.id">
          <span>{{ item.label }}</span>
          <i class="el-icon-circle-close icon" @click="handleRemove(item.id)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheColumns',
  props: {
    columns: {
      type: Array,
      required: false,
      default: []
    },
    checkedColumns: {
      type: Array,
      required: false,
      default: []
    }
  },
  data() {
    return {
      isIndeterminate: false,
      checkAll: false,
      lists: [],
      list: []
    }
  },
  computed: {
    checked() {
      let arr = this.lists.filter(x => this.list.includes(x.id));
      return arr;
    },
    coChecked() {
      return JSON.stringify(this.checked)
    },
    coCheckedColumns() {
      return this.checkedColumns ? JSON.stringify(this.checkedColumns) : '';
    }
  },
  watch: {
    coChecked() {
      let arr = JSON.parse(JSON.stringify(this.checked));
      this.$emit('on-change',  arr);
    },
    columns() {
      this.setDefaultColumns();
    },
    coCheckedColumns() {
      this.setDefaultColumns();
    }
  },
  created() {
    this.setDefaultColumns();
  },
  methods: {
    setDefaultColumns() {
      this.lists = JSON.parse(JSON.stringify(this.columns));
      if(Array.isArray(this.checkedColumns) && this.checkedColumns.length > 0) {
        let arr = [];
          this.checkedColumns.map(item => {
            arr.push(item.id);
          });
          this.list = arr;
      }
    },
    handleCheckAllChange(val) {
      if(val) {
        let arr = [];
        this.lists.map(item => {
          arr.push(item.id);
        });
        this.list = arr;
      } else {
        this.list = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedChange(val) {
      if(val.length === this.lists.length) {
        this.checkAll = true;
        this.isIndeterminate = false;
      } else {
        this.isIndeterminate = true;
      }
    },
    handleRemove(id) {
      let arr = this.list.filter(x => x !== id);
      let index = this.list.findIndex(x => x === id);
      this.handleCheckedChange(arr);
      this.list.splice(index, 1)
    },
    handleClearAll() {
      this.list = [];
      this.handleCheckedChange([]);
      this.isIndeterminate = false;
      this.checkAll = false;
    },
  }
}
</script>

<style lang="scss">
.the-columns {
  display: flex;
  flex-direction: row;
  .part {
    width: 50%;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    box-sizing: border-box;
    .title {
      font-size: 14px;
      color: #303133;
      border-bottom: 1px solid #DCDFE6;
      padding: 10px;
    }
    .content {
      height: 350px;
      box-sizing: border-box;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
    }
  }
  .pull-left {
    margin-right: 5px;
    .el-checkbox {
      margin-bottom: 10px !important;
    }
    .checkbox {
      padding: 10px;
      &:after {
        content: '';
        display: block;
        clear: both;
      }
      .check-all {
        float: left;
        margin-right: 30px;
      }
    }
  }
  .pull-right {
    margin-left: 5px;
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .clear-all {
        color: #409EFF;
        cursor: pointer;
      }
    }
    ul {
      padding: 10px;
      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #F2F6FC;
        padding: 5px 8px;
        border-radius: 3px;
        margin-bottom: 5px;
        transition: all 0.1s ease;
        &:hover {
          padding: 8px;
          background-color: #F2F2F2;
        }
        &:last-child {
          margin-bottom: 0;
        }
        .icon {
          cursor: pointer;
        }
      }
    }
  }
}
</style>