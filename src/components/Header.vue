<template>
    <el-row type="flex" justify="space-between" align="middle" class="header">
        <!-- 头部控制菜单栏的收起展开的图标 -->
        <i class="el-icon-back" @click="handleToggle"></i>
        <div class="userName">
            {{username}} {{identity}}
        </div>
        <a href="javascript:void(0)" @click="handleLogout" class="logout">退出</a>
        <i class="el-icon-loading"></i>
    </el-row>
</template>

<script>

import {mapState} from "vuex";

export default {
    computed: {
        //...{}
        ...mapState("user",{
            // 下面两种写法都可以获取store的值
            username: "username",
            identity: state => state.identity
        })
    },

    methods: {
        handleToggle: function(){
            //触发菜单展开事件
            this.$emit("onChange");
        },
        // 点击退出登录
        handleLogout(){
            // console.log(123)
            this.$store.dispatch("user/logout");
            
            // 提示用户
            this.$message({
                type:"success",
                message: "退出成功，请重新登录"
            })
            // 定时器 一秒钟后跳转页面
            setTimeout(() => {
                this.$router.push("/login");
            }, 1000);
        }
    }
}
</script>

<style scoped>
    .header{
        height:60px;
    }

    .el-icon-back{
        /* 鼠标手势 */
        cursor: pointer;
        color: blue;
    }

    .el-icon-loading{
        font-size: 30px;
        font-weight: 600;
        color: blueviolet;
    }

    .userName{
        color: brown;
    }
    .logout{
        text-decoration: none;
        color:blueviolet;
    }
    .logout:hover{
        font-size: 20px;
        color:pink
    }
</style>
