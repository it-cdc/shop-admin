<template>
  <div class="breadcrumb mt20 mb20">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item 
      :to="{ path: item.src }" 
      v-for="(item,index) in routerInfo" 
      :key="index" >
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    computed : {
        //监听路由的变化，生成一个数组用于渲染面包屑信息
        routerInfo: function(){
            //获取多个路由几率
            const matched = this.$route.matched;
            //重新生成一个循环的数据格式
            const nweArr = matched.map(v =>{
                return {
                    src: v.path,
                    title: v.meta,
                }
            });

            // console.log(nweArr);
             return nweArr;
        }
    }
};
</script>

<style scoped>
    .breadcrumb{
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }
</style>
