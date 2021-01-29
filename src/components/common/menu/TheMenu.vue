<template>
  <div class="side-bar">
    <el-menu :default-active="defaultActive"
      background-color="#2b2d36"
      text-color="#fff"
      @select="handleSelect"
      :collapse="isCollapse"
      :unique-opened="uniqueOpened"
    >
      <el-menu-item class="logo-name" disabled index="-1">
        <i class="el-icon-help"></i>
        <span class="name">{{ title }}</span>
      </el-menu-item>
      <template v-for="(item, index) in menu">
        <el-submenu v-if="item.children" :index="String(index+1)" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="iitem in item.children"
            :key="iitem.id"
            :index="iitem.url"
          >{{ iitem.name }}</el-menu-item>
        </el-submenu>
        <el-menu-item :key="item.id" :index="item.url" v-else-if="!item.children">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss">
@import './index.scss';
</style>
