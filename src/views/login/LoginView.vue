<template>
  <div class="login-view">
    <div class="form">
      <el-card>
        <h1 class="title">
          <i class="el-icon-help"></i>
          <span class="name">{{ title }}</span>
        </h1>
        <el-form label-width="0">
          <el-form-item>
            <el-input placeholder="Username" prefix-icon="el-icon-user" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Password" prefix-icon="el-icon-lock" show-password v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="handleLogin">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="particles"
    ></vue-particles>
  </div>
</template>
<script src="./index"></script>

<style lang="scss">
@import './index.scss';
</style>
