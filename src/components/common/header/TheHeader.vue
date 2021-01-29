<template>
  <div class="the-header">
    <el-button-group>
      <el-button size="mini" icon="el-icon-s-unfold" v-if="isCollapse" @click="isCollapse=false"></el-button>
      <el-button size="mini" icon="el-icon-s-fold" v-else @click="isCollapse=true"></el-button>
      <el-button size="mini" icon="el-icon-refresh-right" @click="refreshTab"></el-button>
    </el-button-group>
    <div class="personal">
      <i
        :class="!isFullScreen ? 'el-icon-full-screen' : 'el-icon-close'"
        class="toggle"
        @click="toggleScreen"
      ></i>
      <el-dropdown hover size="small" @command="handleSelect">
        <div class="avatar-nickname">
          <img class="avatar" alt />
          <span class="nickname">{{ user.name }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">个人中心</el-dropdown-item>
          <el-dropdown-item command="1">修改密码</el-dropdown-item>
          <el-dropdown-item command="2" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码弹窗 -->
    <el-dialog title="修改密码" :visible.sync="modal.modalVisible" :close-on-click-modal="false" @closed="handleModalClosed">
      <el-form :model="modal.form" label-width="80px" :rules="modal.rules" ref="modalForm">
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input size="small" show-password v-model="modal.form.oldPassword" placeholder="请输入原始密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input size="small" show-password v-model="modal.form.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repeatPassword">
          <el-input size="small" show-password v-model="modal.form.repeatPassword" placeholder="请再次确认密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="modal.modalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="changePassword('modalForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss">
  @import './index.scss';
</style>
