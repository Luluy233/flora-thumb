# FloraThumb部署文档

### 1. 部署配置说明

- 操作系统： Ubuntu 22.04 64位 UEFI版
- CPU&内存：2核(vCPU) 2 GiB
- 反向代理服务器：Nginx 1.18.0 (Ubuntu)



### 2. Nginx的安装

> 以下命令基于Ubuntu环境

执行命令安装Nginx

```sh
$apt-get install nginx
```

查看nginx版本，显示版本信息说明安装成功

```sh
$nginx -v
```

启动nginx

```sh
$nginx
```



### 3. Vue项目打包并上传到服务器

使用如下命令对Vue项目进行打包，会在项目目录下生成`dist`文件夹。

```sh
$npm run build
```

通过`ssh`链接远程服务器

```shell
$ssh root@47.98.101.114
```

切换到指定目录下`FloraThumb`

```shell
$cd /home/FloraThumb
```

使用`scp`上传`dist`文件夹到远程服务器

```shell
$scp -r dist root@47.98.101.114:/home/FloraThumb
```



### 4. 修改Nginx配置

首先暂停Nginx服务

```shell
$nginx -s stop
```

查看Nginx配置文件路径，结果显示未`/etc/nginx/nginx.conf`

```sh
$nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

使用`vim`命令打开配置文件进行编辑：

```sh
$vim /etc/nginx/nginx.conf
```

在`/etc/nginx/nginx.conf`的`http{}`中添加服务`server`，如下所示：

```sh
server {
        listen      80 ;  #端口号，默认为80
        server_name  47.98.101.114;  #外网ip
        #access_log  logs/host.access.log  main;
        location / {
            root   /home/FloraThumb/dist; #这里写vue项目的所在地址
            index  index.html; #这里是vue项目的首页
        }
        
        #添加代理配置
        location /api{
            proxy_pass https://trefle.io;
        }
        location /baidu {
            proxy_pass http://api.fanyi.baidu.com/api/trans/vip/fieldtranslate;
        }
        error_page   500 502 503 504  /50x.html; #错误页面
    }
```



### 5. 部署完成

完成配置文件后执行下述命令重新加载配置文件

```sh
$sudo nginx -c /etc/nginx/nginx.conf
```

重启nginx服务

```sh
$nginx -s reload
```

至此可以通过服务器外网链接`http://47.98.101.114:80`访问网站。



