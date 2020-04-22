<template>
    <el-row>
      <el-row :push="4">
        <el-form ref="userForm" :model="userForm" :rules="rules">
          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <div>用 户 注 册</div>
            </el-col>
          </el-row>

          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item prop="avrUrl">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8888/api/pass/oss/upload"

                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item prop="account">
                <el-input placeholder="用户名" v-model="userForm.account"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item prop="nickname">
                <el-input placeholder="昵称" v-model="userForm.nickname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
              <el-form-item prop="password">
                <el-input placeholder="密码" v-model="userForm.password"></el-input>
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
  import {register} from '@/api/login'

  export default {
    name: 'Register',
    data() {
      return {
        imageUrl:'',
        userForm: {
          account: '',
          nickname: '',
          password: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ]
        }

      }
    },
    methods: {
      register(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {

            that.$store.dispatch('register', that.userForm).then(() => {
              that.$message({message: '注册成功 快写文章吧', type: 'success', showClose: true});
              that.$router.push({path: '/'})
            }).catch((error) => {
              if (error !== 'error') {
                that.$message({message: error, type: 'error', showClose: true});
              }
            })

          } else {
            return false;
          }
        });

      },
      handleAvatarSuccess(res, file) {
        console.log(res);
        console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.imageUrl);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      uploadImg(param){
        console.log(param.file);
        this.$api.oss.uploadImg(param.file).then(res => {
          console.log(res);
        })
      }
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
