<template>
  <div class="container">

    <div class="admin-login-center-box">

      <div class="center login-center-box">
        <span v-if="isRegister==='forget'" style="color: #222222;font-size: 20px;margin-left: 69px">找回密码</span>
        <span v-else style="color: #222222;font-size: 20px;margin-left: 69px">注册</span>
        <el-row :gutter="20">
          <el-col :span="9">
            <el-form label-position="right" label-width="100px"  >
              <el-form-item v-if="isRegister==='register'" label="用户名:" required>
                <el-input v-model="sobUser.userName" placeholder="请输入用户名" required></el-input>
              </el-form-item>
              <el-form-item v-if="isRegister==='register'" label="密码:" required>
                <el-input v-model="unPassword" placeholder="请输入密码" show-password></el-input>
              </el-form-item>
              <el-form-item v-else-if="isRegister==='forget'" label="新密码:" required>
                <el-input  v-model="unPassword" placeholder="请输入密码" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" required>
                <el-input v-model="checkPassword" placeholder="请输入密码" show-password></el-input>
              </el-form-item>
              <el-form-item label="邮箱:" required  >
                <el-input v-model="sobUser.email" placeholder="请输入邮箱"  style="width: 55%" required></el-input>
                <el-button id="btn" type="primary" class="button-login" :disabled="!canClick" @click="getEmailCaptcha(sobUser.email)"  size="mini" >{{content}}</el-button>
              </el-form-item>
              <el-form-item label="邮箱验证码:" required>
                <el-input v-model="loginInfo.emailVerifyCode" placeholder="请输入邮箱验证码"
                          class="captcha_input_code">
                </el-input>
              </el-form-item>

              <el-form-item label="验证码:" required>
                <el-input v-model="loginInfo.verifyCode" placeholder="请输入验证码" style="width: 40%" class="captcha_input_code" ></el-input>
                <el-image :src="captchaPath" class="captcha-code" @click="updateVerifyCode" ></el-image>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" class="button-login" @click="doRegister" >提交</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import * as utils_md5 from "../../utils/md5";
  import * as api from "../../api/api";

  export default {
    asyncData({query}){
      return{
        isRegister:query.keyword
      }
    },
    data() {
      return {
        sobUser: {
          userName: '',
          password: '',
          email:''
        },
        loginInfo:{
          verifyCode: '',
          captcha_key:'',
          emailVerifyCode:''
        },
        captchaPath:'',
        checkPassword:'',
        unPassword:'',

        content: '发送验证码',
        totalTime: 60,
        canClick: true//添加canClick

      };
    },
    methods:{
      countDown () {

        if (!this.canClick) return  //改动的是这两行代码
        this.canClick = false

        this.content = this.totalTime + 's后重新发送'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.content = '重新发送验证码'
            this.totalTime = 60
            this.canClick = true  //这里重新开启

          }
        },1000)

      },
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
      getEmailCaptcha(email){
        if(email===''){
          this.toastES('邮箱不能为空','error')
          return
        }
        //倒计时

        api.getEmailCaptcha(email,this.isRegister).then(result=>{
          if(result.code===20000){
            this.countDown();
            this.toastES(result.message,'success')
          }else {

            this.toastES(result.message,'error')
          }
        })
      },
      doRegister(){
        if(this.isRegister==='register'){
          if (this.sobUser.userName === '') {
            this.toastES('用户名不能为空','error')
            return;
          }
        }
        if (this.sobUser.unPassword === '') {
          this.toastES('密码不能为空','error')
          return;
        }
        if(this.unPassword !==this.checkPassword) {
          this.toastES('密码不一致','error')
          return;
        }
        if(this.sobUser.email ==='') {
          this.toastES('邮箱不能为空','error')
          return;
        }

        if (this.emailVerifyCode === '') {
          this.toastES('邮箱验证码不能为空','error')
          return;
        }
        if (this.loginInfo.verifyCode === '') {
          this.toastES('验证码不能为空','error')
          return;
        }
        this.sobUser.password=utils_md5.hex_md5(this.unPassword)
        if(this.isRegister==='register'){
          api.doRegister(this.loginInfo.verifyCode,this.loginInfo.captcha_key,this.loginInfo.emailVerifyCode,this.sobUser).then(result =>{
            //处理结果

            if(result.code===20002){
              this.toastES(result.message,'success')
              this.$router.push({path:'/login'})
            }else{
              this.updateVerifyCode()
              this.toastES(result.message,'error')
            }
          });
        }else if(this.isRegister==='forget'){
          api.doForgetPw(this.loginInfo.emailVerifyCode,this.sobUser).then(result=>{
            if(result.code===20000){
              this.toastES(result.message,'success')
              this.$router.push({path:'/login'})
            }else{
              this.updateVerifyCode()
              this.toastES(result.message,'error')
            }
          })
        }

      }
    },
    mounted() {
      this.loginInfo.captcha_key=Date.parse(new Date());
      this.updateVerifyCode();
    }
  }
</script>

<style >
  .admin-login-header-box{
    width: 100%;
    height: 46px;
    background: dodgerblue;
    margin-bottom: 20px;
  }
  .center{
    line-height: 46px;
    margin: 0 auto;
  }
  .admin-login-header-center{

    width: 1140px;
  }
  .admin-login-logo{
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
  }
  .login-center-box{
    /*width: 1140px;*/
    /*height: 300px;*/
    margin-top: 20px;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0 1px 10px #afafaf;
    border-radius: 4px;
  }
  .admin-login-center-box{
    color: #ffffff;
    font-size: 10px;
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
