<template>
    <el-row>
      <el-row :push="4">
        <el-form ref="userForm" :model="userForm" :rules="rules">
          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <div>用 户 注 册</div>
            </el-col>
          </el-row>

        <!--  <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item prop="avrUrl">

              </el-form-item>
            </el-col>
          </el-row>-->

          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item prop="userName" :error="customErrMsg.errMessage1">
                <el-input placeholder="用户名" v-model="userForm.userName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item prop="nickName" :error="customErrMsg.errMessage2">
                <el-input placeholder="昵称" v-model="userForm.nickName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item prop="password">
                <el-input placeholder="密码" type="password" v-model="userForm.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item prop="repassword">
                <el-input placeholder="再次输入密码" type="password" v-model="userForm.repassword"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item size="small" class="me-login-button">
                <el-button type="primary" @click.native.prevent="register('userForm')">注册</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </el-row>
</template>

<script>

  export default {
    name: 'Register',
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        imageUrl:'',
        customErrMsg:{
          errMessage1:'',
          errMessage2:'',
        },
        userForm: {
          userName: '',
          nickName: '',
          password: '',
          repassword:'',
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 20, message: '不能大于10个字符', trigger: 'blur'}
          ],
          repassword: [
            {required: true, message: '请重复密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
        },

      }
    },
    methods: {
      register(formName) {
        let that = this
        console.log(this.customErrMsg);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.customErrMsg.errMessage1 = null;
            that.customErrMsg.errMessage2 = null;

            let requestData = {};
            requestData.userName = that.userForm.userName;
            requestData.nickName = that.userForm.nickName;
            requestData.password = that.userForm.password;
            that.$api.user.register(requestData).then(res => {
              if (res.code == 200){
                that.$message({message: '注册成功 快写文章吧', type: 'success', showClose: true});
                that.$router.push({path: '/'})
              }else if(res.code == 20005){
                console.log("20005");
                //重复用户名
                that.customErrMsg.errMessage1 = "用户名已存在";
                console.log("20005");
              }else if(res.code == 20006){
                //重复昵称
                that.customErrMsg.errMessage2 = "昵称已存在";
              }else {
                that.$message({message: res.message, type: 'error', showClose: true});
              }
            }).catch(err => {
              that.$message({message: "网络异常，请稍后重试", type: 'error', showClose: true});
            })

          } else {
            return false;
          }
        });

      },
    },

  }
</script>

<style scoped>


  .main {
    font-size: 16px;
    /*font-size: 24px;*/
    /*position: absolute;*/
    width: 7rem;
    height: 6.2rem;
    background-color: white;
    margin-top: 1.5rem;
    margin-left: 5.5rem;
    padding: 0.3rem;
  }

  .me-login-box-radius {
    border-radius: 10px;
    box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
  }

  .me-login-box h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    vertical-align: middle;
  }

  .me-login-design {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
  }

  .me-login-design-color {
    color: #5FB878 !important;
  }

  .me-login-button {
    text-align: center;
  }

  .me-login-button button {
    width: 100%;
  }

  /* 上传组件样式 */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
