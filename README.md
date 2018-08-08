# hos_server

> hos的后台
## 关于 ##
后台使用express-generator生成,主要是controller和路由部分,使用pm2守护进程

## 前端项目地址
   前端项目地址：>[GitHub：https://github.com/Tyrone2333/hos](https://github.com/Tyrone2333/hos)

## 使用

``` 
# 安装依赖
npm install

# 打开测试服务器
pm2 start  ./monit.json

# 查看log
pm2 logs

# 关闭
pm2 kill

```
