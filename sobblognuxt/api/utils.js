
//测试缓存是否存在
export const testSessionStorage=(name) => {
  let listData=JSON.parse(sessionStorage.getItem(name))
  if(listData !==null){
    console.log("我是存储"+name);
    return listData;
  }else {
    return null;
  }
};
