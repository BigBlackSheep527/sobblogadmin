<template>
  <div class="container">
    <div class="userInfo-box">

     <div class="userInfo-avatar" >
       <img :src="userInfo.avatar" >
     </div>
     <div class="userInfo-all">
       <div class="info-list-box">
         <div class="title" style="padding: 20px 0 0 40px">
           <h1>账户信息</h1>
         </div>
         <div class="content">
           <div class="user-info clear-fix" >
             <div class="float-left"  style="margin: 10px; display: inline-block;" @click="isShowAvatar=true">
               <el-avatar :src="userInfo.avatar"></el-avatar>
             </div>
             <div class="user-info-two float-left">
               <div v-if="isShowBtn">
                 <div class="user-name ">{{userInfo.userName}}</div>
                 <div v-if="userInfo.sex==='2'" class="el-icon-female" style="margin-top: 10px">程序媛</div>
                 <div v-else-if="userInfo.sex==='1'"  class="el-icon-male" style="margin-top: 10px">程序猿</div>
                 <div v-else class="el-icon-key" style="margin-top: 10px">程序员</div>
               </div>
               <div v-else>
                 <el-form ref="form" :model="form" label-width="80px">
                   <el-form-item label="用户名：">
                     <el-input v-model="userInfo.userName"></el-input>
                   </el-form-item>
                   <el-form-item label="性别">
                     <el-select v-model="userInfo.sex" placeholder="请选择性别">
                       <el-option label="程序员" value="0"></el-option>
                       <el-option label="程序猿" value="1"></el-option>
                       <el-option label="程序媛" value="2"></el-option>
                     </el-select>
                   </el-form-item>
                 </el-form>
               </div>

             </div>
              <el-button  v-if="isShowBtn" class="upload-userInfo float-right" type="plain" @click="isShowUpdateBtn">修改信息</el-button>
              <div v-else>
                <el-button  class="upload-userInfo float-right" type="info" size="mini"  @click="isShowBtn=true">取消</el-button>
                <el-button  class="upload-userInfo float-right" type="danger" size="mini" @click="updateUseInfo" >保存</el-button>
              </div>
             </div>
         </div>
         <div class="line"></div>
         <div class="content-other">
           <div class="clear-fix">
             <div class="user-info-logo float-left">
               <div class="title">
                 <span> 身份</span>
               </div>
               <div class="title">
                 <span> 签名</span>
               </div>

             </div>
             <div class="user-info-other float-left">
               <div v-if="userInfo.roles==='role_admin'" class="user-roles user-content" style="color: #bd2c00">管理员</div>
               <div v-else class="user-roles user-content">普通用户</div>
               <div v-if="isShowOther" class="user-sign user-content">{{userInfo.sign}}</div>
               <el-input v-else v-model="userInfo.sign"></el-input>
             </div>
             <div>
               <el-button  v-if="isShowOther" class="upload-userInfo float-right" type="plain" @click="isShowUpdateOther">修改信息</el-button>
               <div v-else>
                 <el-button  class="upload-userInfo float-right" type="info" size="mini"  @click="isShowOther=true">取消</el-button>
                 <el-button  class="upload-userInfo float-right" type="danger" size="mini" @click="updateUseInfo" >保存</el-button>
               </div>
             </div>
           </div>
         </div>
         <div class="line"></div>
         <div class="content-other">
           <div class="clear-fix">
             <div class="user-info-logo float-left">
               <div class="title">
                 <span> 邮箱</span>
               </div>
             </div>
             <div class="user-info-other float-left">
               <div class="user-email user-content">{{userInfo.email}}</div>
             </div>
             <div>
                 <el-button  class="upload-userEmail float-right" type="primary" size="mini"  @click="dialogEmail=true">修改</el-button>
             </div>
           </div>
         </div>
         </div>
         <div class="avatar-upload">
           <div class="info-dialog">
             <avatar-upload
               field="file"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="isShowAvatar"
               :width="300"
               :height="300"
               url="/admin/image/avatar"
             >
             </avatar-upload>
           </div>
         </div>
         <div class="email-dialog" >
           <el-dialog title="修改密码" :visible.sync="dialogEmail" width="25%">
             <el-form >
               <el-form-item label="邮箱：" >
                 <el-input v-model="targetEmail" autocomplete="off" style="width: 200px"></el-input>
               </el-form-item>
               <el-form-item label="验证码" >
                <el-input v-model="emailCaptcha" autocomplete="off" style="width: 120px"></el-input>
                 <el-button id='content-btn' type="" size="mini" style="margin-left: 19px" @click="getEmailCaptcha">{{content}}</el-button>
               </el-form-item>
             </el-form>
             <div slot="footer" class="dialog-footer">
               <el-button @click="dialogEmail = false">取 消</el-button>
               <el-button type="primary" @click="changeEmail">确 定</el-button>
             </div>
           </el-dialog>
         </div>
     </div>

   </div>
  </div>
</template>

<script>
  import * as api from '../../api/api'

export default {

  asyncData({params}){
    return{
      userId:params.id
    }
  },

  data(){
    return{
      userInfo:[],
      updateUser:[],
      isShowBtn:true,
      isShowOther:true,
      isShowAvatar:false,
      dialogEmail:false,
      emailCaptcha:'',
      formLabelWidth:'120px',
      targetEmail:'',
      select:'',

      content: '获取',
      totalTime: 60,
      canClick: true//添加canClick
    }
  },
  methods:{
    countDown () {

      if (!this.canClick) return  //改动的是这两行代码
      this.canClick = false

      this.content = this.totalTime + 's后重新发送';
      document.getElementById('content-btn').disabled=true;
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true  //这里重新开启
          document.getElementById('content-btn').disabled=false;
        }
      },1000)

    },
    cropUploadSuccess(response){
      let that=this;
      if (response.code === 20000) {
        that.userInfo.avatar="http://47.103.216.205:2020/portal/image/"+response.data.path;
        this.updateUseInfo();
      }
    },
    getEmailCaptcha(){

      api.getEmailCaptcha(this.targetEmail,'update').then(result=>{
        if(result.code===20000){
          this.$message.success(result.message)
          this.countDown();
        }else {
          this.$message.error(result.message)
        }
      })
    },
    changeEmail(){
      api.updateEmail(this.targetEmail,this.emailCaptcha).then(result=>{
        if(result.code===20000){
          this.$message.success(result.message)
          this.dialogEmail = false;
          location.href="/userInfo/"+this.userInfo.id;
        }else{
          this.$message.error(result.message)
        }
      })

    },
    updateUseInfo(){
      api.updateUserInfoById(this.userInfo.id,this.userInfo).then(result=>{
        if(result.code===20000){
          this.$message.success(result.message)
          this.isShowBtn=true;
          this.isShowOther=true;
        }else {
          this.$message.error(result.message)
        }
      })
    },
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    },
    isShow(){

    },
    isShowUpdateBtn(){
       this.isShowBtn=false;
    },
    isShowUpdateOther(){
       this.isShowOther=false;
    },
    textLogin(){
      api.textLogin(this.userId).then(result=>{
        if(result.code===20000){
          console.log(result.data)
          this.userInfo=result.data;
          if(this.userInfo.sign===null){
            this.userInfo.sign='空空如也，主人赶紧设置一个签名哦~'
          }
        }
      })
    }
  },
  mounted() {
    this.textLogin();
  }
}
</script>

<style>
  .el-dialog__body{
    padding: 26px 0  0 40px;
  }
  .dialog-footer{
    text-align: center;
  }
  .line{
    border:1px dashed #F2F2FA;
    margin-bottom: 15px;

  }
  .user-info-logo .title{
    margin-bottom: 30px;
  }
  .user-info-other .user-content{
    margin-bottom: 30px;


    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-info-logo span{
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 40px;
  }
  .user-info-other{
    margin-left: 70px;
  }
  .content-other{
    margin-left:50px ;
    padding: 20px 0 20px 20px;

  }
  .upload-userInfo{
    margin-right: 20px;
  }
  .upload-userEmail{
    margin-right: 40px;
  }
  .user-info{
    height: 137px;
    margin-left: 40px;
    margin-bottom: 20px;
  }
  .user-info-two{
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .user-info-two .user-name{
    margin-bottom: 30px;
    font-size: 30px;
    color: #8A8A8A;
  }
  .userInfo-all .content .el-avatar{

    width: 70px;
    height: 70px;
    marging:20px
  }
  .userInfo-all{
    margin-top: 20px;
  }
  .userInfo-box{
    /*background: #8A8A8A;*/
    margin-top: 20px;
  }
  .userInfo-avatar img{
    width: 1140px;
    height: 200px;
    object-fit: cover;
    text-align: center;
    /*毛玻璃效果*/
    -webkit-filter:blur(3px);
  }
  .userInfo-avatar{
    width: 100%;
    border-radius: 5px;
    border: 1px solid #FFFEFF;
  }
  .userInfo-all{
    width: 100%;
    border-radius:5px ;
    background: #FFFEFF;

  }
</style>
