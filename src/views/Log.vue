<template>
  <div v-title :data-title="title">
    <el-container class="me-area">
      <el-main class="me-main">
        <el-timeline>
            <el-timeline-item
            v-for="(item, index) in timeline"
            :key="index"
            :timestamp="item.markTime"
            placement="top">
              <el-card>
                {{item.context}}
              </el-card>
            </el-timeline-item>
            
          </el-timeline>
      </el-main>
    </el-container>
  </div>
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
