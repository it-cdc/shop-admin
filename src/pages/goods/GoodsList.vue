<template>
  <div>
    <!-- 顶部工具栏 -->
    <el-row type="flex" justify="space-between" class="mb20">
      <div>
        <el-button @click="handleToGoodsAdd">新增</el-button>
        <el-button @click="handleDelete(idsStr)">删除</el-button>
      </div>

      <!-- 搜索框 -->
      <div>
        <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
          <el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- table 表格列表 -->
    <!-- data用于接收表格数据  tableData是data中的数据，由后台返回-->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 表格的多选 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <!-- 每一列的数据，prop定义数据结构对象要显示的属性 -->
      <el-table-column label="标题" width="300">
        <!--标题的自定义模板 -->
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goods_img">
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>

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
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
        :page-sizes="[pageSize, pageSize * 2, pageSize * 3, pageSize * 3]"
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

      // 保存要删除的商品
      idsStr: ""
    };
  },

  // 组件加载完成后触发
  mounted() {
    // 请求页面数据、
    this.getList();
  },

  // 事件处理函数
  methods: {
    // 请求商品数据
    getList() {
      // 请求商品类别数据
      this.$axios
        .get(
          `http://localhost:8899/admin/goods/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`
        )
        .then(res => {
          // 获取返回数据
          const { data } = res;
          // 表格数据
          this.tableData = data.message;
          // 修改总条数
          this.totalCount = data.totalcount;
        });
    },

    // 点击编辑按钮事件
    handleEdit(index, row) {
      console.log(index, row);
    },

    // 切换显示条数触发
    handleSizeChange(num) {
      this.pageSize = num;
      this.getList();
    },

    // 切换页数触发
    handleCurrentChange(num1) {
      // 把pageIndex修改为当前选择的页面
      this.pageIndex = num1;
      this.getList();
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

    // 点击删除按钮事件
    handleDelete(ids) {
      console.log("点击了删除按钮");
      this.$axios
        .get(`http://localhost:8899/admin/goods/del/${ids}`)
        .then(res => {
          const { message, status } = res.data;

          // 删除成功
          if (status === 0) {
            this.$message({
              message: message,
              type: "success"
            });

            // 重新请求数据
            this.getList();
          }
        });
    },

    // 点击新增按钮跳转页面
    handleToGoodsAdd() {
      // 修改路径
      this.$router.push("/admin/goods-add");
    },

    // 点击搜索框按钮时候触发
    handleSearch() {
      console.log("点击了搜索按钮");
      // 把当前页面重置为1
      this.pageIndex = 1;
      // 重新请求数据
      this.getList();
    }
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
  .goods_img {
    width: 64px;
    height: 64px;
    display: block;
    margin-right: 10px;
    /* 不被挤压 */
    flex-shrink: 0;
  }
</style>
