<template>
  <div>
    <!-- 顶部工具栏 -->
    <el-row type="flex" justify="space-between" class="mb20">
      <div></div>
      <!-- 搜索框 -->
      <div>
        <el-input placeholder="会员名称" v-model="searchValue" class="input-with-select">
          <el-button style="width:60%" slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- table 表格列表 -->
    <!-- data用于接收表格数据  tableData是data中的数据，由后台返回-->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 表格的多选 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <!-- 每一列的数据，prop定义数据结构对象要显示的属性 -->
      <el-table-column label="姓名">
        <!--标题的自定义模板 -->
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <span>{{scope.row.user_name}}</span>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column label="手机号码">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
      </el-table-column>

      <el-table-column label="邮箱">
           <template slot-scope="scope">
            <span>{{scope.row.email}}</span>
          </template>
      </el-table-column>

      <el-table-column label="时间">
        <!-- 自定义模板，slot-scope属性可以获取当前每一行数据，数据是一个对象，scoped.row可获取该对象 -->
        <template slot-scope="scope">
          <span>{{scope.row.reg_time}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope" >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!-- size-change: 切换页面数据显示条数的时候触发 -->
    <!-- current-change： 切换页面时候触发 -->
    <!-- current-page 代表当前页 -->
    <!-- total: 数据的总条数 -->
    <div class="block mt20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[pageSize, pageSize * 2, pageSize * 3,pageSize * 4]"
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
      pageIndex: 1,
      // 当前显示的条数
      pageSize: 5,
      // 搜索条件
      searchValue: "",
      // 数据总条数
      totalCount: 0,
    };
  },

  // 组件加载完成后触发
  mounted() {
    // 请求页面数据、
    this.getMembers();
  },

  // 事件处理函数
  methods: {
    // 请求会员数据
    getMembers() {
      this.$axios.get(
          `http://localhost:8899/admin/account/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`
        )
        .then(res => {
            console.log(res);
          // 获取返回数据
          const { data } = res;
          // 表格数据
          this.tableData = data.message;
          // 修改总条数
          this.totalCount = data.totalcount;
        });
    },
  
    // 点击查看按钮事件
    handleEdit(index, row) {
      console.log(index, row);
      // console.log(123)
    //   this.$router.push(`/admin/goods-edit/${row.id}`);
    },

    // 切换显示条数触发
    handleSizeChange(num) {
      this.pageSize = num;
      this.getMembers();
    },

    // 切换页数触发
    handleCurrentChange(num1) {
      // 把pageIndex修改为当前选择的页面
      this.pageIndex = num1;
      this.getMembers();
    },

    // 当表格选择时候触发
    handleSelectionChange(data) {
      // data是一个数组，当前选中的商品
      const ids = data.map(v => {
        return v.id;
      });
      // 拼接选中的商品的id
      const idsStr = ids.join(",");
      // 保存在data里面
      this.idsStr = idsStr;
    },
    // 点击搜索框按钮时候触发
    handleSearch() {
      console.log("点击了搜索按钮");
      // 把当前页面重置为1
      this.pageIndex = 1;
      // 重新请求数据
      this.getMembers();
    }
  },
};
</script>

<style scoped>

</style>
