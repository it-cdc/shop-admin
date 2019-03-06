<template>
    <div class="login-form">
        <div class="login-form-header">登录</div>
        <el-form :model="formData" status-icon  label-width="40px">
            <el-form-item label="账号">
                <el-input v-model="formData.uname" autocomplete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="formData.upwd" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="login_btn">
                <el-button type="primary" @click="submitForm('formData')">提交</el-button>
                <el-button @click="resetForm('formData')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          uname: '',
          upwd: ''
        },
      };
    },
    methods: {
        submitForm(formName) {
            // 提交到接口
            this.$axios({
                url:"/admin/account/login",
                method:"POST",
                data:this.formData,
                // 处理跨域
                withCredentials: true,
            }).then(res =>{
                const{status,message} = res.data;

                // 如果登陆错误
                if(status == 1){
                    this.$message.error(message);
                }else{
                    // 登陆成功就返回上一页
                    this.$router.back();
                }
            });
        },
        
        resetForm(formName) {
          //重置表单
          this.formData = {
              uname:'',
              upwd:''
            }
        }
    }
  }
</script>

<style lang="less" scoped>
    .login-form{
        width: 400px;
        margin: -150px 0 0 -200px;
        position: absolute;
        left: 50%;
        top: 50%;
        // 标题
        .login-form-header{
            text-align: center;
            margin-bottom: 20px;
            color: #66b1ff;
        }
        // 按钮
        .login_btn{
            text-align: center;
        }
    }
</style>
