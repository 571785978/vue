<template>
    
    <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>你大爷的个人简介</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
        帅哥！！！！！！！
        </div>
    </el-card>
        
</template>
<style scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

</style>
<script>
export default {
    name:'introduction'
}
</script>
