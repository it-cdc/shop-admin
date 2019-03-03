<template>
    <div class="login-form">
        <div class="login-form-header">登录</div>
        <el-form :model="ruleForm2" status-icon  label-width="40px">
            <el-form-item label="账号">
                <el-input v-model="ruleForm2.username" autocomplete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="ruleForm2.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="login_btn">
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm2: {
          username: '',
          password: ''
        },
      };
    },
    methods: {
        submitForm(formName) {
             // 获取数据
            console.log(this.ruleForm2);

            // 提交数据
            // this.$axios({});
        },
        
        resetForm(formName) {
          //重置表单
          this.ruleForm2 = {
              username:'',
              password:''
            }
        }
    }
  }
</script>

<style lang="less">
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
