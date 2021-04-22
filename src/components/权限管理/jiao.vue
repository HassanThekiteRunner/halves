<!--
 * @Author: your name
 * @Date: 2021-04-14 15:56:09
 * @LastEditTime: 2021-04-22 17:01:32
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
    
    <!-- 卡片 -->
    <el-card class="box-card">
      
    
     <!-- <div class="disp" style="margin-top: 15px"> -->
    
      <!-- <el-input
          placeholder="请输入内容"
        
          class="input-with-select"
          clearable
          @clear="getuser"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getuser(scope.row)"
          ></el-button>
        </el-input> -->
      <!-- 点击按钮 -->
     
      <el-button class="zhu" type="primary" @click="dialogVisible = true"
        >添加角色</el-button
      >
      <!-- </div> -->
    
      <!-- 用户列表渲染 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'zong']"
              v-for="(item, index1) in scope.row.children"
              :key="item.id"
            >
              <el-col :span="5">
                <el-tag class="tag1">
                  {{ item.authName }}
                  
                  <i  class="el-icon-caret-right"></i>
                </el-tag>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="[index2 === 0 ? '' : 'bdtop', 'zong']"
                  v-for="(item1, index2) in item.children"
                  :key="item1.id"
                >
                  <el-col :span="6">
                    <el-tag class="tag2">
                      {{ item1.authName }}
                       <i  class="el-icon-caret-right"></i>
                    </el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      class="tag3"
                      v-for="item2 in item1.children"
                      :key="item2.id"
             
                    >
                      {{ item2.authName }}
                       <i  class="el-icon-close" @click="rems(scope.row.id,item2.id)"></i>
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" prop="desc" width='300%'>
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="xiugaishou(scope.row.id)"
            >编辑
            </el-button>
            <!-- 删除 -->
            <el-button
              
              type="danger"
              icon="el-icon-delete"
              size="mini"
              slot="reference"
              @click="remove(scope.row.id)"
            >删除</el-button>
            <!-- 移入有文字提示 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <!-- 设置 -->
              <el-button
              class="btn"
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="shezhi(scope.row)"
              >分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="45%">
        <!-- 添加用户验证 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="desc">
            <el-input v-model="ruleForm.desc" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="adduser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改数据 -->
      <el-dialog title="修改用户" :visible.sync="xiugaible" width="45%">
        <el-form
          :model="ruleForm1"
          :rules="rules1"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm1.roleName" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="ruleForm1.roleDesc" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="xiugaible = false">取 消</el-button>
          <el-button type="primary" @click="xiugai">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分配角色 -->

      <el-dialog
        title="分配权限"
        :visible.sync="dialogfenpei"
        width="45%"
        @close="setRightDialogClosed"
      >
        <!-- 树形控件 -->
        <el-tree
          :data="options"
          :props="props"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="defkeys"
          ref="treeRef"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogfenpei = false">取 消</el-button>
          <el-button type="primary" @click="fenpei">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import http from "../../index";
export default {
  props: {},
  data() {
    var checkname = (rule, value, callback) => {
      const search = /^[\u4e00-\u9fa5]{2,10}$/;
      if (search.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的用户名,长度在3到6个字符"));
    };
    var checkpass = (rule, value, callback) => {
      const search = /^[\u4e00-\u9fa5]{3,10}$/;
      if (search.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的描述,长度在 6 到 12 个字符"));
    };

    var checkemail = (rule, value, callback) => {
      const search = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (search.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    var checkphone = (rule, value, callback) => {
      const search = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (search.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的手机号码"));
    };

    return {
      /* 渲染数据 */
      list: [],
      options: [],
      she: {},
      value1: "",
      cha:'',
      /* 状态显示 */
      value: true,
      /* 对话框 */
      dialogVisible: false,
      xiugaible: false,

      visible: false,
      dialogfenpei: false,
      ruleForm: {
        name: "",
        desc: "",
      },
      ruleForm1: {},
      /* 添加用户验证 */
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { validator: checkname, trigger: "blur" },
        ],
        desc: [
          { required: true, message: "请对角色进行描述", trigger: "blur" },

          { validator: checkpass, trigger: "blur" },
        ],
        email: [
          /* required 默认不能为空 */
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkemail, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          /* 指定校验规则,指定校验时机 */
          { validator: checkphone, trigger: "blur" },
        ],
      },
      /* 修改用户验证 */
      rules1: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { validator: checkname, trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请对角色进行描述", trigger: "blur" },

          { validator: checkpass, trigger: "blur" },
        ],
      },

      defkeys: [],
      props: {
        label: "authName",
        children: "children",
      },
      count: 1,
    };
  },
  methods: {
    /* 添加 */
    adduser() {
      http({
        url: "/roles",
        method: "post",
        data: {
          roleName: this.ruleForm.name,
          roleDesc: this.ruleForm.desc,
        },
      }).then((res) => {
        if (res.meta.status !== 201) {
          return this.$message.error("添加失败！");
        }
        this.$message.success("添加成功！");
        (this.ruleForm.name = ""),
          (this.ruleForm.desc = ""),
          (this.dialogVisible = false);
        this.getuser();
      });
    },
    /* 查询 */
    chaxun(){
      
      // http({
      //   url:`/roles/${sda}`,
      //   method:'get',
      // }).then((res)=>{
      //   console.log(res)
      // })
    },
    /* 删除 */

    async remove(id) {
      console.log(id);
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });

      console.log(confirmResult);
      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除！");
      }
      http({
        url: `/roles/${id}`,
        method: "delete",
      }).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("删除失败！");
        }
        this.$message.success("删除成功！");
        this.getuser();
        this.visible = false;
      });
    },
    /* 删除二级菜单 */



   async  rems(row,id){
     
       const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });

      
      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除！");
      }
      http({
        url:`/roles/${row}/rights/${id}`,
        method:'delete',
      }).then((res)=>{
        console.log(res)
        this.getuser()
      })
    },


    /* 修改前查询 */
    xiugaishou(id) {
      this.xiugaible = true;
      http({
        url: `/roles/${id}`,
        method: "get",
      }).then((res) => {
        // console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("查询失败");
        }
        this.ruleForm1 = res.data;
      });
    },
    /* 修改名称和描述 */
    xiugai() {
      http({
        url: "/roles/" + this.ruleForm1.roleId,
        method: "put",
        data: {
          roleName: this.ruleForm1.roleName,
          roleDesc: this.ruleForm1.roleDesc,
        },
      }).then((res) => {
        // console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("修改失败！");
        }
        this.$message.success("修改成功！"), this.getuser();
        this.xiugaible = false;
        (this.ruleForm1.roleName = ""), (this.ruleForm1.roleDesc = "");
      });
    },
    /* 分配权限渲染 */
    shezhi(quanxian) {
      // console.log(quanxian)
      this.dialogfenpei = true;
      /* 定义变量保存id */
      this.she = quanxian.id;
    
      http({
        url: "/rights/tree",
        method: "get",
      }).then((res) => {
        // console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error("获取权限列表失败！");
        }
        this.options = res.data;
        /* 调用函数显示此项所选中的节点 */
        this.getLeafkeys(quanxian, this.defkeys);
      });
     
    },
    /* 递归方法遍历三级子节点 */
    getLeafkeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => this.getLeafkeys(item, arr));
    },
    /* 重置选中的数据 */
    setRightDialogClosed() {
      this.defkeys = [];
    },
    /* 分配权限 */
    fenpei() {
      // 创建数组保存id
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      // console.log(keys)
      /* 分割 */
      const idstr = keys.join(",");

      http({
        url: `/roles/${this.she}/rights`,
        method: "post",
        data: {
          rids: idstr,
        },
      }).then((res) => {
        // console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("分配权限失败！");
        }
        this.$message.success("分配权限成功！");
        this.getuser();
        this.dialogfenpei = false;
      });
    },

    getuser() {
      http({
        url: "/roles",
        method: "get",
      }).then((res) => {
        // console.log(res);
        this.list = res.data;
      });
    },
  },
  created() {
    this.getuser();
  },
  mounted() {},

  components: {},
};
</script>

<style scoped lang="less">
.box-card {
  p {
    margin-bottom: 15px;
  }
  // i {
  //   background: coral;
  //   font-size: 20px;
  //   color: #fff;
  //   border-radius: 50%;
  //   margin-right: 10px;
  // }

  .btn {
    margin-right: 10px;
  }
  margin-top: 20px;
  .clearfix {
    display: flex;
    height: 55px;

    .el-input {
      margin-top: -20px;
    }
    .zhu {
      height: 40px;
      margin-top: 7px;
      margin-left: 20px;
    }
  }
  .block {
    margin-top: 20px;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .bdtop {
    border-top: 1px solid#eee;
  }
  .bdbottom {
    border-bottom: 1px solid #eee;
  }
  .zong {
    display: flex;
    align-items: center;
  }
  .el-tag {
    margin: 10px;
    background: #fff;
  }
  .tag1 {
    color: rgb(0, 140, 255);
  }
  .tag2 {
    color: greenyellow;
  }
  .tag3 {
    color: coral;
  }

   .disp {
    .el-input {
      margin-right: 20px;
      width: 300px;
    }
    display: flex;
    margin-bottom: 35px;
  }
  
}
</style>
