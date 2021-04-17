<!--
 * @Author: your name
 * @Date: 2021-04-13 23:13:16
 * @LastEditTime: 2021-04-17 16:41:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gshop-server_finale:\有关JS、vue的练习\vue\11-element\frame\src\views\Home.vue
-->
<template>
    <div class="divs">
<el-container >
<!-- 头部 -->
  <el-header height='100px'>
      <el-button type="info" @click="tuichu">退出登录</el-button>

  </el-header>
  <!-- ***** -->

  <el-container>


      <!-- 左边 -->
    <el-aside :width="iscolls?'64.5px':'200px' ">
        <el-menu
      default-active="4"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="rgb(102, 100, 230)"
        :router="isnan"
        :unique-opened='isda'
       :collapse='iscolls'
       :collapse-transition='false'
      >
      <div class="btn" @click="iscoll">|||</div>
      <el-submenu :index="item.id"  v-for="item in list" :key="item.id" 
       >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="it.id" v-for="it in item.children" :key="it.id"
            :route="{path:'/home/'+it.path} "

          >
              <i class="el-icon-menu"></i>
              {{it.authName}}
          </el-menu-item>
      </el-submenu>
    </el-menu>



    </el-aside>
    <!-- **** -->


    <!-- 右边 -->
    <el-main>
        <router-view></router-view>
    </el-main>
    <!-- **** -->
  </el-container>
</el-container>

    </div>
</template>

<script>
import http from '../index'
export default {
    props: {

    },
    data() {
        return {
            list:[],
            isnan:true,
            isda:true,
            iscolls:false
        
        };
    },
    methods: {
        tuichu(){
            sessionStorage.removeItem('token')
            this.$router.replace('/Login')
        },
        iscoll(){
            this.iscolls=!this.iscolls
        }
    },
    mounted(){
        http({
            url:'/api/private/v1/rights/:type',   
            method:'get',
            params:{
                url:'tree'
            }
        }).then((res)=>{
            console.log(res)
            this.list=res.list
        })
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.divs{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        .el-container{
    height: 100%;
    .el-header{
    background: chocolate;
   

    .el-button{
        position: absolute;
        top: 30px;
        right:30px;
    }
    
    }
    .el-aside{
        background: rgb(84, 92, 100);
        .el-menu{
            border: none;
        }
        .btn{
            color: #fff;
            font-size:10px;
            background: crimson;
            letter-spacing: .1em;
            text-align: center;
            line-height: 30px;
        }
    }
    .el-main{
        background: #ccc;
    }
}
}

</style>
