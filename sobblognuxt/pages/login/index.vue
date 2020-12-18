<template>
  <div class="container">

    <div class="admin-login-center-box">
      <div class="center login-center-box">
        <span style="color: #222222;font-size: 20px;margin-left: 69px">登录</span>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form label-position="right" label-width="100px"  >
              <el-form-item label="用户名:" required>
                <el-input v-model="sobUser.userName" placeholder="请输入用户名" required></el-input>
              </el-form-item>
              <el-form-item label="密码:" required>
                <el-input v-model="unPassword" placeholder="请输入密码" show-password></el-input>
              </el-form-item>
              <el-form-item label="验证码:" required >
                <el-input v-model="loginInfo.verifyCode" style="width: 40%" placeholder="请输入验证码" class="captcha_input_code" @keyup.enter.native="doLogin"></el-input>
                <el-image :src="captchaPath" @click="updateVerifyCode" class="captcha-code"></el-image>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" class="button-login" @click="doLogin" >登录</el-button>
                <a :href="'/register?keyword=register'" style="margin-left: 10px">未注册?</a>
                <a :href="'/register?keyword=forget'">忘记密码?</a>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

  import * as api from '../../api/api'
  import * as utils_md5 from '../../utils/md5'
export default {

  data() {
    return {

      sobUser: {
        userName: '',
        password: '',

      },
      loginInfo:{
        verifyCode: '',
        captcha_key:''
      },
      captchaPath:'',
      unPassword:''
    };
  },
  methods:{
    updateVerifyCode(){
      this.captchaPath="/user/captcha?captcha_key="+this.loginInfo.captcha_key+"&random="+Date.parse(new Date());
    },
    toastES(name,type){
      this.$message({
        message:name,
        center:true,
        type:type
      })
    },
    doLogin(){
      //发起登录
      //TODO：检测数据
      if (this.sobUser.userName === '') {
        this.toastES('用户名不能为空','error')
        return;

      }
      if (this.sobUser.unPassword === '') {
        this.toastES('密码不能为空','error')
        return;
      }
      if (this.loginInfo.verifyCode === '') {
        this.toastES('验证码不能为空','error')
        return;
      }
      this.sobUser.password=utils_md5.hex_md5(this.unPassword)
      api.doLogin(this.loginInfo.verifyCode,this.loginInfo.captcha_key,this.sobUser).then(result =>{

        //处理结果
        let data=result;
        if(data.code===20000){
          this.toastES(data.message,'success')

          let redirect=this.$route.query.redirect;
          if(redirect){
            location.href=redirect;
          }else {
            location.href='/';
          }
        }else{
          this.updateVerifyCode()
          this.toastES(data.message,'error')

        }
      });
    }
  },
  mounted() {
    this.loginInfo.captcha_key=Date.parse(new Date());
    this.updateVerifyCode();

  }
}
</script>

<style >
  .admin-login-center-box{
    color: #ffffff;
    font-size: 10px;
    font-weight: 600;

    /*display: flex;*/
    /*justify-items: center;*/
    /*align-items: center;*/
  }
    .login-center-box{
      margin-top: 20px;
      padding: 20px;
      background: #ffffff;
      box-shadow: 0 1px 10px #afafaf;
      border-radius: 4px;
     }
    .login-center-box a{
      color: #909090;
     }
    .login-center-box a:hover{
      color: #606266;
    }



  .admin-login-header-box{
    width: 100%;
    height: 46px;
    background: dodgerblue;
    margin-bottom: 20px;
  }
  .center{
    line-height: 46px;
    margin: 20px auto;
  }
  .admin-login-header-center{
    width: 1140px;
  }
  .admin-login-logo{
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
  }


  .captcha-code {
    cursor: pointer;
    box-shadow: 0 1px 10px #e6e6e6;
    /*width: 100px;*/
    height: 37px;
    display: flex;
    float: right;
  }

</style>
