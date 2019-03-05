<template>
  <div>
    <!-- 顶部工具栏 -->
    <el-row type="flex" justify="space-between" class="mb20">
      <div>
        <el-button>新增</el-button>
        <el-button>删除</el-button>
      </div>

      <!-- 搜索框 -->
      <div>
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- table 表格列表 -->
    <!-- data用于接收表格数据  tableData是data中的数据，由后台返回-->
    <el-table :data="tableData" style="width: 100%">
      <!-- 每一列的数据，prop定义数据结构对象要显示的属性 -->
      <el-table-column label="标题" width="180" prop="title"></el-table-column>
      <el-table-column label="类型" width="180" prop="categoryname"></el-table-column>
      <el-table-column label="价格" width="180">
        <!-- 自定义模板，slot-scope属性可以获取当前每一行数据，数据是一个对象，scoped.row可获取该对象 -->
        <template slot-scope="scope">
          <span>{{scope.row.market_price | tofixed}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->    
    <!-- size-change: 切换页面数据显示条数的时候触发 -->
    <!-- current-change： 切换页面时候触发 -->
    <!-- current-page 代表当前页 -->
    <!-- total: 数据的总条数 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // 当前页面
      pageIndex:1,
      // 当前显示的条数
      pageSize:5,
      // 搜索条件
      searchValue:"",
      // 数据总条数
      totalCount:0,
    };
  },
  // 组件加载完成后触发
  mounted(){
    // 请求商品类别数据
    this.$axios.get(`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchValue=${this.searchValue}`).then(res=>{
      // 获取返回数据
      const {data} = res;
      // 表格数据
      this.tableData = data.message;
      // 修改总条数
      this.totalCount = data.totalcount;
    })
  },


  // 事件处理函数
  methods: {
    //   点击编辑按钮事件
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 点击删除按钮事件
    handleDelete(index, row) {
      console.log(index, row);
    }
  },

  // 切换显示条数
  handleSizeChange(num){
    console.log(num);
  },

  // 切换页数触发
  handleCurrentChange(num1){
    console.log(num1);
  },


  //过滤器
  filters: {
    tofixed(data) {
      return Number(data).toFixed(2);
    }
  }
};
</script>

<style scoped>
</style>
