<template>
  <el-container>
    <el-header>

    </el-header>
    <el-main>
      <div class="main">

      </div>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>


</template>

<script>


  export default {
    name: 'Log',
    created() {
      this.getLineList()
    },
    data() {
      return {
        timeline:[]
      }
    },
    methods: {
      getLineList(){
        let that = this;
        console.log(this.$api);
        this.$api.line.list().then(res => {
          that.timeline = res.data;
        })
      }
    },
    computed: {
      title (){
        return '日志 - For Fun'
      }
    }
  }
</script>

<style scoped>


</style>
