// 专门存储用户的数据 和 修改用户数据的方法

import axios from "axios";

export default {

    //命令空间,为了区别modules下面其他模板可能存在相同的数据或者方法
    namespaced: "user",

    // 初始化数据
    state: {
        // 用户名
        username: "",
        // 身份信息
        identity: ""
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

                    window.history.back();
                }
            });
        }
    }
};