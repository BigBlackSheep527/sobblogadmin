import http from './http'
const baseUrl='http://47.103.216.205:2020'
const baseUrl_taobao='https://api.sunofbeach.net'
export const success_code=20000;
export const getAdminInfo=() => {
  if(process.client){
    return http.requestGet('/user/user_info/758733490417041408')
  }
  return http.requestGet(baseUrl+'/user/user_info/758733490417041408')
};
export const getCategories=() => {
  if(process.client){
    return http.requestGet('/portal/web_size_info/categories')
  }else {
    return http.requestGet(baseUrl+'/portal/web_size_info/categories')
  }
};
export const getLoops=() => {
  if(process.client){
    return http.requestGet('/portal/web_size_info/loop')
  }else {
    return http.requestGet(baseUrl+'/portal/web_size_info/loop')
  }
};
export const getTopArticle=() => {
  if(process.client){
    return http.requestGet('/portal/article/top/')
  }else {
    return http.requestGet(baseUrl+'/portal/article/top/')
  }
};
export const listArticle=(category,page,size) => {
  if(category!==''){
    return  http.requestGet('/portal/article/list_categoryId/'+category+'/'+page+'/'+size)
  }else {
    if(process.client){
      return http.requestGet('/portal/article/list/'+page+'/'+size)
    }else {
      return http.requestGet(baseUrl+'/portal/article/list/'+page+'/'+size)
    }
  }
};
export const listLabel=(size) => {
  if(process.client){
    return http.requestGet('/portal/article/label/'+size)
  }else {
    return http.requestGet(baseUrl+'/portal/article/label/'+size)
  }
};
export const getTaobaoLoop=(size) => {
  if(process.client){
    return http.requestGet('/shop/recommend/random/10')
  }else {
    return http.requestGet(baseUrl_taobao+'/shop/recommend/random/10')
  }
};
export const getfriendLink=(size) => {
  if(process.client){
    return http.requestGet('/portal/web_size_info/friend_link')
  }else {
    return http.requestGet(baseUrl_taobao+'/portal/web_size_info/friend_link')
  }
};
//登录
export const doLogin =(verifyCode,captcha_key,sobUser)=>{
  if(process.client) {
    return http.requestPost('/user/login/' + verifyCode + '/' + captcha_key, sobUser)
  }else{
    return http.requestPost(baseUrl+'/user/login/' + verifyCode + '/' + captcha_key,sobUser)
  }
}

//注册
export const doRegister =(captcha_code,captcha_key,email_code,sobUser)=>{
  if(process.client) {
    return http.requestPost('/user/join_in?captcha_code='+captcha_code+'&captcha_key='+captcha_key+
      '&email_code='+email_code,sobUser)
  }else{
    return http.requestPost(baseUrl+'/user/join_in?captcha_code='+captcha_code+'&captcha_key='+captcha_key+
      '&email_code='+email_code,sobUser)
  }
}
//找回密码
export const doForgetPw =(email_code,sobUser)=>{
  if(process.client) {
    return http.requestPut('/user/password/'+email_code,sobUser)
  }else{
    return http.requestPut(baseUrl+'/user/password/'+email_code,sobUser)
  }
}
export const getEmailCaptcha=(email,type) => {
  if(process.client){
    return http.requestGet('/user/verify_code?email='+email+'&type='+type)
  }else {
    return http.requestGet(baseUrl_taobao+'/user/verify_code?email='+email+'&type='+type)
  }
};
export const textLogin=() => {
  if(process.client){
    return http.requestGet('/user/text')
  }else {
    return http.requestGet(baseUrl_taobao+'/user/text')
  }
};
export const doLogout=() => {
  if(process.client){
    return http.requestGet('/user/logout')
  }else {
    return http.requestGet(baseUrl_taobao+'/user/logout')
  }
};
export const getArticleById=(articleId) => {
  if(process.client){
    return http.requestGet('/portal/article/'+articleId)
  }else {
    return http.requestGet(baseUrl+'/portal/article/'+articleId)
  }
};
export const getUserInfo=(userId) => {
  if(process.client){
    return http.requestGet('/user/user_info/'+userId)
  }else {
    return http.requestGet(baseUrl+'/user/user_info/'+userId)
  }
};
export const updateUserInfoById=(userId,userInfo) => {
  if(process.client){
    return http.requestPut('/user/user_info/'+userId,userInfo)
  }else {
    return http.requestPut(baseUrl_taobao+'/user/usr_info/'+userId,userInfo)
  }
};
export const updateEmail=(email,emailCode) => {
  if(process.client){
    return http.requestPut('/user/email?email='+email+'&verify_code='+emailCode)
  }else {
    return http.requestPut(baseUrl_taobao+'/user/email?email='+email+'&verify_code='+emailCode)
  }
};

export const getSearch=(keyword,page,size,categoryId,sort)=>{
  // /portal/search?keyword=%E7%AD%94%E6%A1%88&page=1&size=1
// categoryId=12&keyword=%E7%AD%94%E6%A1%88&page=1&size=2&sort=2
  if(process.client){
    return http.requestGet("/portal/search?keyword="+keyword+
      "&page="+page+"&size="+size+"&sort="+sort+"&categoryId="+categoryId)
  }else {
    return http.requestGet(baseUrl+"/portal/search?keyword="+keyword+
      "&page="+page+"&size="+size+"&sort="+sort+"&categoryId="+categoryId)
  }

}
