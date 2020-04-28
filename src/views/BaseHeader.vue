<template>
  <el-header class="me-area">
    <el-row class="me-header">

      <el-col :span="4" class="me-header-left">
        <router-link to="/" class="me-title">
          <img src="../assets/img/logo.png"/>
        </router-link>
      </el-col>

      <el-col v-if="!simple" :span="20">
        <el-menu :router=true menu-trigger="click" active-text-color="#5FB878" :default-active="activeIndex"
                 mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/category/all">文章分类</el-menu-item>
          <el-menu-item index="/tag/all">标签</el-menu-item>
          <el-menu-item index="/archives">文章归档</el-menu-item>
          <el-menu-item index="/log">日志</el-menu-item>
          <el-menu-item index="/messageBoard">留言板</el-menu-item>

          <el-col :span="4" :offset="4">
            <el-menu-item index="/write"><i class="el-icon-edit"></i>写文章</el-menu-item>
          </el-col>
          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu mode="vertical" class="sub_menu">
              <template slot="title">
                <el-avatar v-if="user.avatar">
                  <img class="me-header-picture" :src="user.avatar"/>&nbsp;&nbsp;{{user.name}}
                </el-avatar>
                <el-avatar size="medium" shape="circle" v-if="!user.avatar">
                  <img class="me-header-picture" src="/static/user/user_1.png"/>
                </el-avatar>
              </template>
              <el-menu-item index="/usercenter/16"><i class="el-icon-setting"></i>&nbsp;个人中心</el-menu-item>
              <el-menu-item><i class="el-icon-back"></i>&nbsp;退出</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>


</template>



<script>
  import {getToken,setToken,getUserInfo} from '@/http/token'
  export default {
    name: 'BaseHeader',
    props: {
      activeIndex: String,
      simple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    computed: {
      user() {
        let userinfo = getUserInfo();
        console.log(userinfo);
        let login = false
        let avatar = ''
        let name = ''
        if (userinfo != null){
          login = userinfo.userName.length != 0
          avatar= userinfo.userImg
          name = userinfo.nickName
          avatar += "_lower";
        }else {
          login = false

        }

        // console.log(avatar);
        // console.log( this.$store.state.name);
        return {
          login, avatar,name
        }
      }
    },
    methods: {
      logout() {
        let that = this
        this.$store.dispatch('logout').then(() => {
          this.$router.push({path: '/'})
        }).catch((error) => {
          if (error !== 'error') {
            that.$message({message: error, type: 'error', showClose: true});
          }
        })
      },
      handleCommand(command) {
        // this.$message('click on item ' + command);
        if (command === 'userCenter'){
          this.userCenter();
        }
      },
      userCenter(){
        //跳转个人中心
        let userinfo = getUserInfo();
        let id = userinfo.id;
        console.log(id);
        this.$router.push({path: '/usercenter/' + id})
      }
    }
  }
</script>

<style>

  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  }

  .me-title {
    margin-top: 10px;
    font-size: 24px;
  }

  .me-header-left {
    margin-top: 10px;
  }

  .me-title img {
    max-height: 2.4rem;
    max-width: 100%;
  }

  .me-header-picture {
    width: 36px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #5fb878;
  }
  .sub_menu {
    float: left;
  }
</style>
