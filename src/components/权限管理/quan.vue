<!--
 * @Author: your name
 * @Date: 2021-04-14 15:56:09
 * @LastEditTime: 2021-04-22 17:30:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gshop-server_finale:\有关JS、vue的练习\vue\11-element\frame\src\components\用户管理\userlist.vue
-->
<template>
    <div>
       <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home/Huanying' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
  <el-card class="box-card">
   <el-table
    border
      :data="list"
      style="width: 100%">
      <el-table-column
        type='index'
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="240">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="240">
      </el-table-column>
      <el-table-column
        prop="level"
        label="权限等级">
        <template slot-scope="scope">
        <el-tag v-if="scope.row.level==='0' ">一级</el-tag>
        <el-tag  type="success" v-else-if="scope.row.level==='1' ">二级</el-tag>
        <el-tag v-else type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
</el-card>
    </div>
</template>

<script>
import http from '../../index'
export default {
    props: {

    },
    data() {
        return {
            list:[],
        };
    },
    methods: {
        getshuju(){
             http({
            url:'/rights/list',
            method:'get',
        }).then((res)=>{
            console.log(res)
            if(res.meta.status!==200){
                return this.$message.error('请求数据失败！')
            }

            this.list=res.data
        })
        }
    },
    created(){
        this.getshuju()
    },
    mounted(){
       
    },
    components: {

    },
};
</script>

<style scoped lang="less">

</style>
