<!--
 * @Author: your name
 * @Date: 2021-04-13 23:13:16
 * @LastEditTime: 2021-04-20 15:43:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gshop-server_finale:\有关JS、vue的练习\vue\11-element\frame\src\views\Home.vue
-->
<template>
  <div class="divs">
    <div class="divss">
      <div class="divs1">
        <div class="demo-type">
          <el-avatar> <img src="../assets/1.png" alt="" /></el-avatar>
        </div>

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="66px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="ruleForm.name"
              clearable
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              v-model="ruleForm.pass"
              clearable
              show-password
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-button @click="submitForm('ruleForm')" type="primary"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../index";
export default {
  props: {},
  data() {
    return {
      ruleForm: {
        name: "admin",
        pass: "123456",

       
      },

       token: "",
       mess:null,
       type:null,
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http({
            url: "/login",
            method: "post",
            data: {
              username: this.ruleForm.name,
              password: this.ruleForm.pass,
            },
          }).then((res) => {
            this.$message({
              message:res.meta.msg,
              type:'success',
               duration:2000,
              onClose:()=>{
             if(res.meta.status==200){
               this.token=res.data.token
               sessionStorage.setItem('token',this.token)
               this.$router.replace('/Home')
             }
           }
            })
           
            // if(res.status==200){
              
            //   this.mess=res.msg,
            //   this.type='success'
            // }else{
            //   this.mess=res.message;
            //   this.type='error'
            // }
            // this.$message({
            //   message:this.mess,
            //   type: this.type,
            //   duration:2000,
            //   onClose:()=>{
            //     if(res.status==200){
            // this.token = res.token;
            // sessionStorage.setItem("token", this.token);
            // this.$router.replace('/home/userList')
            //     }
            //   }
            // });
            
          });
        } else {
         console.log('error submit!!');
          return false;
        }
      });
    },
    
  },
  components: {},
};
</script>

<style scoped lang="less">
.divs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: turquoise;

  .divss {
    position: relative;
    padding-top: 200px;
    .divs1 {
      width: 400px;
      height: 300px;
      margin: 0 auto;
      text-align: center;
      border-radius: 10px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-avatar {
        position: absolute;
        top: 150px;
        left: 50%;
        width: 100px;
        height: 100px;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
