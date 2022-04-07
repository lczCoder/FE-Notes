如果说php是世界上最好的语言还存在一定争议的话，那么git是世界上最好最先进的分布式版本控制系统应该是毫无争议的事情。



在我们日常开发中不可避免的要进行团队协作，多人同时开发一个项目，如果只会简单的pull，push操作难免在遇到一些复杂场景的下会手无足措，错误的命令可能会导致一些危险的，不可逆的后果，万一污染了同事的代码或者造成误删，就等着吃好果子吧😏



我最开始工作使用git的时候，只懂得执行4个命令，`git add` `git commit -m` `git pull` `git push`，用了半个月下来一切顺顺利利的，我还在心中窃喜，git不过如此嘛，就这么简单而已。直到有次几个同事跟我合作开发了一个模块，我还是按照往常一样`git add` `git commit -m` `git pull` 咦？ 怎么和平时不一样呢，终端里突然出现很多奇奇怪怪的提示和警告，这时候`git push` 已经不能跟之前一样正常提交代码了。眼瞅旁边同事都已经下班了，我就凭着终端上零星的提示胡乱输入各种命令，甚至重启了2次vscode期望能恢复正常🤣，最后在我的一番操作下，我成功的把带着冲突标识的`#######`符号和已经被我弄的一团糟的代码提交到了远程仓库。



想必大伙都不想遇到我上述那种尴尬社死的经历吧，看完这篇文章，你能大致清楚git的一个基本工作机制和流程，了解git自身的一个数据结构，我们常见的HEAD，Commit，Branch都是些什么东西，懂得我们的代码文件是怎么被git一步步进行一个管理的。明白个人操作都有哪些玩法并且在团队协作中都会遇到哪些场景问题，需要如何去处理。



如果你是打算学习git的开发者或者是git的初中级使用者，这篇文章一定能给到你帮助！！！



### git的概念介绍

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649235597577-2a4c16e6-cca6-4858-af89-884c7eed201b.png)

git分布式系统涉及了4个关键点，分别是工作区，暂存区，本地仓库和远程仓库，暂存区和本地仓库也叫git的版本库，它会随着git init命令创建或git clone 拉取远程仓库的配置。

### 初探.git隐藏文件

在本地创建一个文件夹，命名为`git-study`，我们首先在终端执行git init 创建一个本地的git版本库.

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649245855608-c1cff105-aa8c-4d58-a543-00bca8ca701b.png)

这样我们就成功的创建了一个本地的git仓库，工作区就是当前这个`git-study`的文件夹。接下去我们该怎么去查看我们创建完毕的git版本库信息呢。首先`git init `命令会在工作区目录下创建一个.`git`的隐藏文件夹，常规的打开文件夹是无法查看到的，在此以mac系统为例有2种方法可进行查看

1、访达打开工作区文件夹，按快捷键【 `shift + cmmand + .` 】

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649246293678-75b000d2-678e-4b21-acc0-38030dcf2235.png)

2、通过命令行的方式查看 工作区目录终端输入 `ls -al`

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649246366032-eb8476a0-6c21-4522-a4b2-5c79393dcf40.png)

后续的讲解，我都将采用命令行的方式来操作，毕竟我们大部分操作git还是要习惯用命令行的方式来进行。



ok，说了这么多，现在就让我们进入这个神秘的`.git`目录里去瞧一瞧（如果对基础linux命令不熟悉的小伙伴，建议百度搜索一下linux文件操作的常用命令，后续会频繁使用）

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649246792202-de4f8dcd-e914-4499-bc1d-37e3c75a9e54.png)

这里我们发现，这个`.git`文件夹下有10个文件或文件夹。因为篇幅有限这里就不全部展开细说了

先说一下几个文件夹的意义，暂时不知道什么意思的也没关系，后面都会给出解释

1、config：当前git仓库的配置（这个很好懂）

2、description：仓库的描述信息文件（这个也很好懂）

3、HEAD：指向当前所在的分支

4、refs：分支的存放和tag标签

5、objects：存放该仓库的所有git对象，用哈希值来进行命名

接下去我们就一一的来看看这些文件都是什么



------

#### config

因为config是一个文件而不是一个文件夹，所以我们直接打开它，看看它到底是什么

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649247711251-a908977c-e865-4cb4-ba10-e1cdec637b1d.png)

可以看到，config里头就是git仓库的配置信息，里面就有我们很熟悉的`user.name`和`user.email`，这里因为我之前已经配置了全局的config设置，所以当前`git`仓库沿用了全局的配置。这时候我们就会想到平时我们如果要修改git的配置信息 会用到一条命令 `git config`

常用有：

`git config --local user.name = '<userName>'`	 // 修改用户名

`git config --local user.email = '<userEmail>'`	// 修改邮箱



 🙋 这里提一个小问题，我们平时用命令行的方式修改配置，和在这个config文件里直接去修改它的配置信息，是否是操作是一致性的呢？带着这个疑问让我们来实操一下。

首先我们先用命令行的方式修改一下用户名和邮箱，然后再打开config文件看看里头的信息是否发生了修改

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649248472409-893aa857-c43f-4d48-9ecf-57b56bc527bb.png)

执行完上述2个命令操作，当前这个git仓库的用户名和邮箱应该已经被修改为`testName`和`test@163.com`

让我们验证一下，执行命令`git config --list --local` 查看当前仓库的配置信息

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649248593417-da530b72-30cd-4422-a8ee-3a7cddb51eb5.png)

由此可见，当前仓库的用户名和邮箱已经发生了修改。这时候让我们打开config文件看看吧

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649248679140-88e23857-fabe-4ced-ae3e-65c948961730.png)

config文件里的信息发生了变化，改变的值就是刚刚我们设置的用户名和密码，由此我们可知，我们通过`git config` 命令行修改配置信息，实际上就是修改config里的信息。	

接下来我们再反向操作一波，直接修改config里的信息，在通过命令行查看是否修改完成

终端执行命令`vim config`进入vim编辑页面，（不了解vim的可以自行百度一下，不难不难🙅‍♂️）

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649248994226-f3c567cd-3a6c-4ca7-8e36-7c68c03c4420.png)

这里我们直接把config里的用户名和邮箱修改成`testName2`和`test2@163.com`

然后通过命令行去查询一下当前git仓库的一个配置情况`git config --list --local`

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649249170567-9c822f6c-aee5-47e2-9923-f68f78f5cb6b.png)

这里的git仓库配置信息已经变更为我们直接在config里修改的`testName2`和`test2@163.com`



**⭐️  : 经过上述2个反转操作，我们可以得出一个结论，config文件就是用来配置当前git仓库的信息，我们通过git config 命令执行的方法，实际上就是修改config里的信息。**



#### description:

description英文翻译过来就是描述的意思，该文件就是git仓库的一个描述介绍，默认的话是没有的哦，系统会让你编辑这个文件。

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649256480940-f2b9c6ab-c6f7-4029-8b6d-dbcc9d0c2eb1.png)

如果有需要可以手动进行设置，(可以通过vim的方式进行编辑）

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649256593951-e122bcd8-5173-4a8b-8371-800cf7f44033.png)



#### HEAD

HEAD中文名指的是头部，HEAD在git中是一个很关键的东西，贯穿了整个git的操作流程，我们首先来看一下`.git`文件中的HEAD是什么。

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649256776027-d7af1383-67ae-48c7-8765-b7defb25841a.png)

当我们打开HEAD文件的时候发现，HEAD文件并没有什么内容，而是一个地址，指向了`.git`目录下的`refs`文件夹。这个HEAD会指向当前git仓库下正在工作的分支。这里我们创建一个新的分支来试验一下结果。

首先我们要返回工作区的路径下执行`git checkout`的命令创建一个新分支并且切换到该分支上

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649257643933-5b66ab4b-2059-4f43-be94-819401ec0c1f.png)

当前我们已经在test分支上了，这时候我们再去查看一下HEAD文件

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649257696200-4ed0b922-1d15-4e02-b7d5-57fb63ff33ca.png)

可以看到，当前的HEAD的地址已经发生了改变，由之前的`main`变为了`test`。

相信大部分人到这一步的时候都会有一个猜想`git`中的`HEAD`是不是就是指向当前的分支？

我们暂时先保留这个猜想接着往下走。



#### refs

上述我们查看HEAD的时候，发现它是一个地址，指向了refs文件下的heads，现在我们就到refs文件夹里去一探究竟



---heads,其实就是分支,里面包含所有的分支文件,文件存储了分支指向的指纹信息 

---tags 叫做里程碑,或者版本发布用等记录重要版本.文件也存储了tag的指纹信息 

---remotes,远程仓库信息

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649257899557-88b377a5-35c3-42f9-a992-283fde93d2c9.png)

refs中的heads下有2个我们已经创建的分支`main`和`test`，

此景此景，让我们更加确定了`HEAD`就是指向当前工作的分支

不过别着急，还没结束呢，我们再来深究一下`heads`下的`test`文件又是一个什么东西

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649258398380-e6327a0b-873e-4e60-9a23-2b3b508515af.png)

通过命令行我们发现，这个test文件是一串哈希数值，这里我们需要借助`git`提供的一个命令

`git cat-file -t`查看 git 对象的类型 

我们先来看一下这一串的哈希值是什么类型

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1649258610967-54c7689a-7baf-4549-b0a2-005e14ba2ff0.png)

通过命令我们知道了这一串`test`里的哈希值是一个`commit`

这个结果推翻了我们上述关于`HEAD`实际指向分支的猜想，我们现在可以知道，`git`中的`HEAD`实际上指向了某一个`commit`

```
HEAD`的实际指向应该是`ref: refs/heads/test/<commit哈希值>
```



到这里我们已经得出一个结论`HEAD 的本质不是提向分支,而是指向commit提交`



那到这里，肯定又会有机智的小伙伴要问了

1、为什么HEAD不直接指向commit呢，为什么要指到refs里的heads呢？

2、HEAD在什么情况下，有没有可能直接指向某个commit呢



#### objects



### git的数据结构类型



### 指针和分支



### 单兵作战



### 团队协作



### 注意





扩展

HEAD

指向当前正在操作的 commit。



ORIG_HEAD

当使用一些在 Git 看来比较危险的操作去移动 HEAD 指针的时候，ORIG_HEAD 就会被创建出来，记录危险操作之前的 HEAD，方便 HEAD 的恢复，有点像修改前的备份。



FETCH_HEAD

记录从远程仓库拉取的记录。



MERGE_HEAD

当运行 git merge 时，MERGE_HEAD 记录你正在合并到你的分支中的提交。MERGE_HEAD在合并的时候会出现，合并结束，就删除了这个文件。



CHERRY_PICK_HEAD

记录您在运行运行 git cherry-pick时要合并的提交。同上，这个文件只在 cherry-pick 期间存在。

[

](https://blog.csdn.net/qq_32452623/article/details/79415990)
