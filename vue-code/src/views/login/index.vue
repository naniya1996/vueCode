<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="login-menu">
        <li
          v-for="item in loginMenu"
          :key="item.id"
          :class="{'current':item.current}"
          @click="toggleMenu(item)"
        >{{ item.text }}</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="small"
      >
        <el-form-item prop="email">
          <label>邮箱</label>
          <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="18"
          ></el-input>
        </el-form-item>

        <el-form-item prop="repassword" v-if="model==='register'">
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="ruleForm.repassword"
            autocomplete="off"
            minlength="6"
            maxlength="18"
          ></el-input>
        </el-form-item>

        <el-form-item prop="age">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.age" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="db">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn db">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { stripscript } from "@/utils/validate";
export default {
  data() {
    // 校验邮箱
    var emailName = (rule, value, callback) => {
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    // 校验密码
    var password = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9]\w{5,17}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入6~18位密码，包含字母、数字和下划线"));
      } else {
        callback();
      }
    };
    // 确认密码
    var repassword = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9]\w{5,17}$/;
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("两次密码输入不一致，请重新输入"));
      } else {
        callback();
      }
    };
    // 校验验证码
    var checkCode = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9]{6}$/;
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("验证码不正确"));
      } else {
        callback();
      }
    };
    return {
      loginMenu: [
        { text: "登录", current: true, type: "login" },
        { text: "注册", current: false, type: "register" }
      ],
      model: "login",
      ruleForm: {
        eamil: "",
        password: "",
        repassword: "",
        age: ""
      },
      rules: {
        email: [{ validator: emailName, trigger: "blur" }],
        password: [{ validator: password, trigger: "blur" }],
        repassword: [{ validator: repassword, trigger: "blur" }],
        age: [{ validator: checkCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toggleMenu(data) {
      this.loginMenu.forEach(ele => {
        ele.current = false;
      });
      data.current = true;
      // 修改模块值
      this.model = data.type;
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  //   background-color: #34495e;
  background-image: url("../../imgs/backgroundImage.png");
  background-size: cover;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.login-menu {
  padding-top: 100px;
  padding-bottom: 30px;
  text-align: center;
  li {
    display: inline-block;
    margin: auto;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 3px;
    cursor: pointer;
  }
}
.current {
  background-color: rgba(0, 0, 0, 0.1);
}
.login-form {
  label {
    color: #ffffff;
    display: block;
    margin-bottom: 3px;
  }
  .login-btn {
    margin-top: 19px;
  }
  .db {
    display: block;
    width: 100%;
  }
}
</style>