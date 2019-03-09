// 专门存储用户的数据 和 修改用户数据的方法

import axios from "axios";

export default {

    //命令空间,为了区别modules下面其他模板可能存在相同的数据或者方法
    namespaced: "user",

    // 初始化数据
    state: {
        // 用户名
        username: localStorage.getItem("username") || "",
        // 身份信息
        identity: localStorage.getItem("identity") || "",
    },

    // 异步修改数据
    actions: {
        // login是命令，对应的函数就是操作函数
        login({commit,state},data){
             // 提交到接口
             axios({
                url:"/admin/account/login",
                method:"POST",
                data,
                // 处理跨域
                withCredentials: true,
            }).then(res =>{
                const {status,message} = res.data;
                
                // 如果登陆错误
                if(status == 1){
                    this.$message.error(message);
                }else{
                    // 登陆成功就返回上一页
                    // 把接口返回的值更新store下的数据
                    state.username = message.uname;
                    state.identity = message.realname;
                    
                    // 把数据保存在本地存储中
                    // 用户名
                    localStorage.setItem("username",message.uname);
                    // 身份信息
                    localStorage.setItem("identity",message.realname);

                    window.history.back();
                }
            });
        },

        //退出登录
        logout({state}){
            // 调用退出接口
            axios({
                url:"/admin/account/logout",
                // 处理跨域
                withCredentials: true,
            }).then(res => {
                const {status,message}  = res.data;
                if(status == 0){
                    // 把接口返回的值更新store下的数据
                    state.username = "";
                    state.identity = "";

                    // 把用户信息保存在本地存储
                    localStorage.setItem("username","");
                    localStorage.setItem("identity","");
                }
            })
        }
    }
};