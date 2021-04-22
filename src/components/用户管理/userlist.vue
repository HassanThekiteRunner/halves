<!--
 * @Author: your name
 * @Date: 2021-04-14 15:56:09
 * @LastEditTime: 2021-04-22 19:17:55
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
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 复合型输入框 -->
      <div class="disp" style="margin-top: 15px">
        <el-input
          placeholder="请输入内容"
          v-model="userinfo.query"
          class="input-with-select"
          clearable
          @clear="getuser"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getuser"
          ></el-button>
        </el-input>
        <!-- 点击按钮 -->
        <el-button class="zhu" type="primary" @click="dialogVisible = true"
          >添加用户</el-button
        >
      </div>
      <!-- 用户列表渲染 -->
      <el-table border style="width: 100%" :data="list" stripe>
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="150">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="150">
        </el-table-column>
        <el-table-column label="状态" width="100" prop='mg_state'>
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state" @change="userStatechanged(scope.row.id,
              scope.row.mg_state)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210%">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="xiugaishou(scope.row.id)"
            >
            </el-button>
            <!-- 删除 -->
            <el-button
              class="btn"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              slot="reference"
              @click="remove(scope.row.id)"
            ></el-button>
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
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="shezhi(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userinfo.pagenum"
          :page-sizes="[1, 2, 4, 10]"
          :page-size="userinfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
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
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              v-model="ruleForm.pass"
              clearable
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
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
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="ruleForm1.username"
              clearable
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm1.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="ruleForm1.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="xiugaible = false">取 消</el-button>
          <el-button type="primary" @click="xiugai">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分配角色 -->

      <el-dialog title="分配角色" :visible.sync="dialogfenpei" width="45%">
        <div>
          <p>当前的用户：{{ she.username }}</p>
          <p>当前的角色：{{ she.role_name }}</p>
          <p>
            分配新角色：
            <el-select v-model="value1" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </p>
        </div>
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
      const search = /^(\w){3,10}$/;
      if (search.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的用户名,长度在3到6个字符"));
    };
    var checkpass = (rule, value, callback) => {
      const search = /^(\w){6,12}$/;
      if (search.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的密码,长度在 6 到 12 个字符"));
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
      /* 状态显示 */
      value: true,
      /* 对话框 */
      dialogVisible: false,
      xiugaible: false,
      /* 分页器 */
      // currentPage4: 4,
      queryinfo:'',
      userinfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total: 0,
      visible: false,
      dialogfenpei: false,
      ruleForm: {
        name: "",
        pass: "",
        email: "",
        phone: "",
      },
      ruleForm1: {},
      /* 添加用户验证 */
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: checkname, trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },

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
        email: [
          /* required 默认不能为空 */
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkemail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          /* 指定校验规则,指定校验时机 */
          { validator: checkphone, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /* 分页器 */
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.userinfo.pagesize = val;
      this.getuser();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.userinfo.pagenum = val;
      this.getuser();
    },

    
    async userStatechanged(id, newState) {
      console.log(id, newState);
     await  http({
        url: `/users/${id}/state/${newState}}`,
        method: "put",
      }).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          newState=!newState
          return this.$message.error("更新状态失败！");
        }
        this.$message.success("更新状态成功！");
      });
    },

    /* 添加 */
    adduser() {
      http({
        url: "/users",
        method: "post",
        data: {
          username: this.ruleForm.name,
          password: this.ruleForm.pass,
          email: this.ruleForm.email,
          mobile: this.ruleForm.phone,
        },
      }).then((res) => {
        console.log(res);
        if (res.meta.status !== 201) {
          return this.$message.error("添加失败！");
        }
        this.$message.success("添加成功！");
         (this.ruleForm.name = ""),
        (this.ruleForm.pass = ""),
        (this.ruleForm.email = ""),
        (this.ruleForm.phone = ""),
        (this.dialogVisible = false);
        this.getuser()
      });
     
    },

    /* 删除 */

     async remove(id) {
      console.log(id);
     const confirmResult=await  this.$confirm(
      "此操作将永久删除该文件, 是否继续?",
      "提示",
       {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
    ).catch((err)=>{
      return err
    })

    console.log(confirmResult)
    if(confirmResult!=='confirm'){
      return this.$message.info('已经取消删除！')
    }

      http({
        url: "/users/"+id,
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

    /* 修改前查询 */
    xiugaishou(id) {
      console.log(id);
      this.xiugaible = true;
      http({
        url: `/users/${id}`,
        method: "get",
      }).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("查询失败");
        }
        this.$message.success("查询成功");
        this.ruleForm1 = res.data;
      });
    },
    /* 修改邮箱和手机 */
    xiugai() {
      http({
        url: "/users/" + this.ruleForm1.id,
        method: "put",
        data: {
          email: this.ruleForm1.email,
          mobile: this.ruleForm1.mobile,
        },
      }).then((res) => {
        console.log(res);
        this.getuser();
        this.xiugaible = false;
      });
    },
    /* 设置权限 */
    shezhi(quanxian) {
      this.dialogfenpei = true;
      this.she = quanxian;
      http({
        url: "/roles",
        method: "get",
      }).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取权限列表失败！");
        }
        this.options = res.data;
      });
    },
    fenpei() {
      if (!this.value1) {
        return this.$message.error("请选择要分配的角色");
      }
      http({
        url: `/users/${this.she.id}/role`,
        method: "put",
        data: {
          rid: this.value1,
        },
      }).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("分配角色失败！");
        }
        this.$message.success("分配角色成功！");
        this.dialogfenpei = false;
        this.getuser();
        (this.value1 = ""), (this.she = {});
      });
    },

    getuser() {
      http({
        url: "/users",
        method: "get",
        params: this.userinfo,
      }).then((res) => {
       
        this.list = res.data.users;
        this.total = res.data.total;
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
  i {
    background: coral;
    font-size: 20px;
    color: #fff;
    border-radius: 50%;
    margin-right: 10px;
  }

  .btn {
    margin-right: 10px;
  }
  margin-top: 20px;
  .disp {
    .el-input {
      margin-right: 20px;
      width: 300px;
    }
    display: flex;
    margin-bottom: 35px;
  }
  .block {
    margin-top: 20px;
  }
}
</style>
