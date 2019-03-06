<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类别">
      <el-select v-model="form.region" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="置顶" name="type"></el-checkbox>
        <el-checkbox label="热门" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <!-- 封面图片 -->
    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <!-- 图片相册 -->
    <el-form-item label="图片相册格">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>

    <el-form-item label="内容描述">
      <!-- bidirectional data binding（双向数据绑定） -->
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      //   封面图片
      imageUrl: "",

      //   图片相册
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },

    // 封面图片事件
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 图片相册事件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    // 富文本编辑器事件
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    }
  },


};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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