### 1、安装

electron-builder -m



wind electron-builder -w -x64





electron-vue 使用element ui 开发注意事项

使用低版本的element-ui 
找到.electron-vue文件夹下的webpack.renderer.config.js文件

```
//原语句 let whiteListedModules = ['vue'] 
//修改后的语句 let whiteListedModules = ['vue', 'element-ui']
```



1、打包坑



// ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))

注释掉



# Can‘t locate Mac/Finder/DSStore.pm in @INC

electron-builder 版本过低，升级版本即可解决



package.json

build

"asar":false,





![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1651131725726-48286656-ac34-4a66-9c97-a7046360cd94.png)



 Electron为了安全性的考虑，是渲染子进程不能使用node.js模块的，如果要在渲染进程中使用node.js模块，需要在创建主进程时进行设置，设置代码如下：

//设置在创建主进程的方法中添加 webPreferences:{ nodeIntegration:true, contextIsolation:false//Electron 12.0以上版本需要的额外设置此项}



mac 环境下 打包后的软件 无法获取当前用户的电脑环境变量

https://github.com/electron/electron/issues/7688 github issuess 解决方案

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1651145788403-72f2e80e-6b81-463c-b35a-847ac60afb1c.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1651149534248-f7845ef6-d4eb-4f75-af0a-4e8684c220ce.png)



mac 无法打开程序

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1651212885662-03b7156b-4750-4899-be49-4bd982e82f35.png)
