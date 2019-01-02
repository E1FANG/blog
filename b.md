创建一个空目录用作git仓库

```
$ mkdir learngit
$ cd learngit
$ pwd
/c/Users/Administrator/learngit
```

pwd命令用于显示当前目录。在我的Windows上，这个仓库位于/c/Users/Administrator/learngit

通过git init命令把这个目录变成Git可以管理的仓库：

$ git init
Initialized empty Git repository in c:/Users/michael/Administrator/.git/

现在我们编写一个readme.txt文件，一定要放到learngit目录下（子目录也行）

添加文件

$ git add readme.txt

执行上面的命令，没有任何显示，这就对了

用命令git commit告诉Git，把文件提交到仓库

$ git commit -am "add"

显示下面信息：git commit命令执行成功后会告诉你，1个文件被改动（我们新添加的readme.txt文件），插入了两行内容（readme.txt有两行内容）

```
[master (root-commit) cb926e7] wrote a readme file
1 file changed, 2 insertions(+)
create mode 100644 readme.txt
添加多个文件并提交：
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."
```

git status命令可以让我们时刻掌握仓库当前的状态

现在如果想要回退到最新版本，先查看commitid，然后分关闭命令窗口和未关闭命令窗口
未关闭命令窗口：
$ git reset --hard 3628164
误删除此文件

$ git checkout -- test.txt


远程仓库

添加远程库
在本地的仓库下运行：

$ git remote add origin git@github.com:E1FANG/learngit.git  (你的git仓库地址)

上面是将本地的仓库关联到Github上的仓库
把本地库的所有内容推送到远程库上：
$ git push -u origin master(加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令)



（以后提交调用$ git push origin master）
* 从远程库克隆
```cmd
$ git clone git@github.com:yonghuming/gongchengming.git


分支管理
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>
创建+切换分支：git checkout -b <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>