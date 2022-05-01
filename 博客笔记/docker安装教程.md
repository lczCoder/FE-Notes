### 1️⃣：Ubuntu环境

1、之前已经安装过了docker，先执行卸载命令

sudo apt-get remove docker docker-engine docker.io containerd runc

2、检查是否有残留的包未卸载干净

 dpkg -l | grep docker

3、卸载对应的包

sudo apt remove --purge <包名> 

或

sudo apt-get autoremove <包名>

4、删除相关的本地配置

sudo rm -rf /etc/systemd/system/docker.service.d 

sudo rm -rf /var/lib/docker

5、升级apk工具并下载对应的依赖

sudo apt-get update
sudo apt-get install \    

 apt-transport-https \    

 ca-certificates \     

 curl \    

 gnupg \     

 lsb-release
回车 Enter

6、添加Docker官方提供的GPG秘钥

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

7、配置版本

echo \   "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

8、安装Docker

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

9、查看Docker版本号

docker -v



如果是第一次安装docker，需要在`/etc/docker/`目录下创建一个`daemon.json`配置文件

{"registry-mirrors":["https://docker.mirrors.ustc.edu.cn"]}   设置docker下载源 官方的

Docker 官方中国区：https://registry.docker-cn.com

网易：http://hub-mirror.c.163.com

中国科技大学：https://docker.mirrors.ustc.edu.cn

阿里云：https://y0qd3iq.mirror.aliyuncs.com



window/mac 安装

Docker Desktop 桌面端安装，可视化docker工具，会自动安装docker 环境







### 拉取一个镜像

docker pull  <镜像名称>:<版本号> `latest 最新`



### 根据一个镜像文件启动一个容器

docker run -itd --name=<容器名称> -p <宿主端口:docker端口> <镜像名称>



### 删除镜像

docker rmi <镜像名称 | 镜像id>



### 删除容器

docker rm <容器名称 | 容器id>



### 查看本地镜像

docker images



### 查看本地所有容器/已开启容器

docker ps  /  docker ps -a

### 

### 容器重命名

docker rename <容器当前名称 | 容器id> <容器新名称>



### 镜像重命名

docker tag <旧镜像名称 | 镜像id> <新镜像名称>
镜像重命名不会修改旧镜像，而是基于旧镜像复制了一个镜像，2个镜像id相同，名称不同
如果只是想重命名，就删除旧镜像

### 

### 启动容器

docker start <容器名称 | 容器id >



### 关闭容器

docker stop <容器名称 | 容器id>



### 重启容器

docker restart <容器名>



### 进入容器

docker exec -it <容器名称 | 容器id> /bin/sh

 

### 退出容器

exit



### 关闭docker服务（关闭服务会关闭所有正在运行的容器）

service dockert stop



### 开启docker服务

service docker start



### 重启docker服务（重启服务会关闭所有正在运行的容器）

service docker restart



### 容器生成镜像文件

docker commit <容器名称> <镜像名称>



### docker镜像导出export（根据容器导出镜像）

docker export <容器名称 | 容器id> > <镜像名称.tar>

导出的文件，默认在当前终端的根目录下

该方法导出的镜像，是复制，可以重新设置镜像名称，导入的时候和源镜像不会有冲突

### docker镜像导入import（适用于export导出方法）

docker import - <新镜像名称> < <导入镜像名称.tar>







### docker镜像导出save（镜像直接导出，可多选）

docker save <导出镜像名称 | 导出镜像id> > <导出镜像名称.tar>

该方法导出的镜像名称和原镜像实际是同一个，如果再次导入，会覆盖之前的镜像。镜像名源镜像相同，而不是导出时候设置的文件名。

docker save xxx > test.tar  导入的时候，镜像名称还是xxx

用save方法导出的时候，最好使用镜像名称，如果使用镜像id,会导致导出的镜像丢失名称，导入的时候镜像名会显示成<none>



### docker镜像导入load（适用save导出方法）

docker load < <镜像名称.tar>



### 2种导出方法的区别：

| 两种导出方法区别： | export                                                     | save                                                   |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------ |
| 导出镜像文件大小   | 小                                                         | 大                                                     |
| 是否可以重命名镜像 | 可以                                                       | 不可以                                                 |
| 是否支持多镜像导报 | 不支持                                                     | 支持                                                   |
| 是否支持镜像回滚   | 不支持（根据容器导出，只保留当前的快照状态，无法进行回滚） | 支持（根据镜像导出，没有丢失镜像的历史，可以进行回滚） |



### 数据卷挂载

doucker run -it -v <宿主机绝对路径>:<docker容器绝对路径>

















#### 通过 dockerfIle  创建docker容器

 docker build -f </指向dockerfile文件路径>



### Linux 安装插件 apk add <插件名称>:<版本号



### vscode插件

Docker

Remote - Containers



用dk集成前端开发环境，让新同事5分钟上手开发项目
