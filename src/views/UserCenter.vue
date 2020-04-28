<template>
  <el-container>
    <el-main>
      <div class="main">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8888/api/pass/oss/upload/user_img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-main>
  </el-container>


</template>

<script>
  import {getToken,removeToken,removeUserInfo} from '@/http/token'

  export default {
    name: 'UserCenter',
    created() {

    },
    data() {
      return {
        imageUrl:'',
        timeline:[]
      }
    },
    methods: {
      getUserMessage(){
        let id = this.$route.params.id
        console.log(id);
      },
      handleAvatarSuccess(res, file) {
        let that = this
        if (res.code == 401){
          that.$message({message: '登录过期，请重新登陆！', type: 'error', showClose: true});
          removeToken();
          removeUserInfo();
          that.$router.push({
            path: `/login`
          })
        }
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
    computed: {
      main(){
        this.getUserMessage();
      },
      title (){
        return '用户中心'
      }
    }
  }
</script>

<style scoped>


</style>
