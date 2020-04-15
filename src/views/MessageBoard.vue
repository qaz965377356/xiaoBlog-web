<template>

  <div class="me-message" v-title :data-title="title">
    <el-container class="">
      <el-main class="me-main">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="留言内容" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="网站评分" prop="stars">
            <!-- 评分 -->
            <el-rate v-model="form.stars"></el-rate>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">留言</el-button>
            <el-button @click="cleanForm">清空</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'MessageBoard',
    data() {
      return {
        form:{
          desc:"",
          stars:null
        },
        rules:{
          desc:[
            { required: true, message: '请输入留言内容', trigger: 'blur' },
            { min: 5, max: 200, message: '长度在 5 到 200 个字符', trigger: 'blur' }
          ],
          stars:[
            { required: true, message: '请选择星级', trigger: 'change' }
          ]
        }

      }
    },
    methods:{
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(this.form);
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      cleanForm(){
        this.form.desc = "";
        this.form.stars = null;
      }
    },
    computed: {
      title (){
        return '留言板 - For Fun'
      }
    }
  }
</script>

<style scoped>
  .me-message {
  }

  .el-container {
    width: 700px;
  }

  .me-main {
    overflow: hidden;
  }

  .me-log-box {
    margin-left: 30%;
    margin-top: 20px;

  }

</style>
