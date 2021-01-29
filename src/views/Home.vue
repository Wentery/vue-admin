<template>
  <div class="home">
    <el-container class="outer-container">
      <el-aside :class="{'collapse': isCollapse}">
        <aside-menu :isCollapse="isCollapse"
          :uniqueOpened="uniqueOpened"
          :menu='menu'
          ></aside-menu>
      </el-aside>
      <el-container class="inner-container">
        <el-header>
          <the-header
            @on-collapse="handleIsCollapse"
            @on-refresh="handleRefreshCurrent"></the-header>
        </el-header>
        <el-main class="home-main">
          <el-tabs type="card" @edit="handleTabsEdit" @tab-click="handleTabClick" :value="activeTab">
            <el-tab-pane v-for="(tab, index) in tabs" :name="String(index)" :key="index" :label="tab.label" :closable="index > 0">
              <span slot="label" v-if="index == 0"><i class="el-icon-s-home"></i></span>
              <transition name="el-fade-in">
                <component :is="tab.component" :query="JSON.stringify(tab.query)" v-if="!tab.refresh"></component>
              </transition>
            </el-tab-pane>
          </el-tabs>
          <div class="tab-bar">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item.value" v-for="item in tools" :key="item.value"><i :class="item.icon"></i>{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import components from '@/router/components'
export default {
  name: 'Home',
  components: components,
  data () {
    return {
      isCollapse: false,
      uniqueOpened: true,
      menu: [],
      tools: [
        { value: '1', icon: 'el-icon-refresh-right', label: '刷新当前' },
        { value: '2', icon: 'el-icon-circle-close', label: '关闭当前' },
        { value: '3', icon: 'el-icon-link', label: '关闭其他' },
        { value: '4', icon: 'el-icon-close', label: '关闭全部' }
      ]
    }
  },
  created () {
    this.getMenu()
    // this.getUserInfo()
  },
  computed: {
    tabs () {
      return this.$store.getters.getTabs || []
    },
    activeTab () {
      const index = this.$store.getters.getActiveIndex
      return index
    }
  },
  watch: {
    tabs () {
      if (this.tabs.length > 0) {
        const activeTab = String(this.tabs.length - 1)
        const tab = this.tabs[activeTab]
        this.$store.commit('setActiveIndex', String(activeTab))
        this.$store.commit('setActivePath', tab.path)
        this.tabs[activeTab].refresh = false
      }
    }
  },
  mounted () {
    window.onbeforeunload = () => {
      const tabs = this.tabs
      const activeIndex = parseInt(this.activeTab)
      tabs.forEach((item, index) => {
        item.refresh = index !== activeIndex
      })
      this.$tab.setTabs(tabs)
    }
  },
  methods: {
    getMenu () {
      this.$api.getMenuList().then(res => {
        // if (res.code === 0) {
        this.menu = res.data[0].menus
        // } else {
        //   this.$message.error(res.message || res.msg)
        // }
      }).catch(rej => {
        console.log(rej)
        this.$message.error(rej.message)
      })
    },
    handleIsCollapse (value) {
      this.isCollapse = value
    },
    handleRefreshCurrent () {
      const index = this.$store.getters.getActiveIndex
      const tabs = this.$store.getters.getTabs
      tabs[index].refresh = true
      this.$tab.setTabs(tabs)
      this.$nextTick(() => {
        tabs[index].refresh = false
        this.$tab.setTabs(tabs)
      })
    },
    getUserInfo () {
      this.$api.getUserInfo().then(res => {
        if (res.code === 200) {
          const info = res.data
          this.$store.commit('setInfo', info)
        } else {
          this.$message.error(res.message || res.msg)
        }
      }).catch(rej => {
        console.log(rej)
      })
    },
    handleTabsEdit (name) {
      if (name === '0') return
      const tabs = this.$store.getters.getTabs
      tabs.splice(parseInt(name), 1)
      let activeTab = this.activeTab
      if (name <= activeTab) {
        activeTab = String(activeTab - 1)
      }
      this.$tab.setTabs(tabs)
    },
    handleTabClick (node) {
      const index = node.index
      const tabs = this.tabs
      tabs[index].refresh = false
      this.$store.commit('setActiveIndex', String(index))
      this.$store.commit('setActivePath', tabs[index].path)
      this.$tab.setTabs(tabs)
    },
    /**
     * @param command：1 刷新当前、2 关闭当前、3 关闭其他、4 关闭全部
    */
    handleCommand (command) {
      switch (command) {
        case '1': this.refreshCurrent(); break
        case '2': this.closeCurrent(); break
        case '3': this.closeOther(); break
        case '4': this.closeAll(); break
      }
    },
    refreshCurrent () {
      this.handleRefreshCurrent()
    },
    closeCurrent () {
      const name = this.activeTab
      this.handleTabsEdit(name)
    },
    closeOther () {
      const activeTab = this.activeTab
      const tabs = this.tabs
      this.$tab.setTabs([tabs[0], tabs[activeTab]])
    },
    closeAll () {
      const tabs = this.tabs
      this.$tab.setTabs([tabs[0]])
    }
  },
  beforeDestroy () {
    localStorage.setItem('flag', true)
  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  min-width: 1200px;
  min-height: 500px;
  box-sizing: border-box;
  .outer-container {
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    .el-aside {
      width: 220px !important;
      background-color: #2b2d36;
      box-sizing: border-box;
      &.collapse {
        width: auto !important;
      }
      .el-menu {
        border-right: 0 !important;
      }
    }
    .inner-container {
      display: flex;
      flex-direction: column;
      .home-main {
        flex: 1;
        position: relative;
        .tab-bar {
          position: absolute;
          right: 10px;
          top: 20px;
          .el-dropdown-link {
            cursor: pointer;
          }
        }
        > .el-tabs {
          height: 100%;
          display: flex;
          flex-direction: column;
          > .el-tabs__header {
            margin-bottom: 0 !important;
            margin-right: 20px;
          }
          > .el-tabs__content {
            flex: 1;
            margin-top: 10px;
            overflow-y: auto;
            &::-webkit-scrollbar {
              display: none; /* Chrome Safari */
            }
            .el-tab-pane {
              height: 100%;
            }
          }
        }
      }
      .el-header {
        padding: 10px 10px 0 10px;
        height: auto !important;
      }
      .el-main {
        padding: 10px;
      }
    }
  }
}
</style>
