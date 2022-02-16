## `git reset`

1. 文件从暂存区回退到工作区，撤销 `add`

   > 如果想取消某个 `add` 的文件，可以使用该命令来进行撤销操作
   >
   > 撤消 `add`：`git reset` 文件名
   >
   > 撤消所有 `add` 的文件：`git reset HEAD` 
   >
   > 撤消某个文件或文件夹：`git reset HEAD 文件（夹）名`
   >
   > 把从 `cache` 中删除的文件，重新添加到 `cache` 中：`git add -f 文件名`

2. 版本回退

   > - `git reset --mixed commit {id}`  
   >
   >   还原到 `commit` 的 `id`，（`git reset`  默认是 `mixed`）此 `commit` 之后的文件变成 `modified`
   >
   > - `git reset --soft commit id`
   >
   >   还原到 `commit` 的 `id`，此 `commit` 之后的文件变成`modified` （即 `add`（勾选中）的状态）
   >
   > - `git reset --hard commit id`
   >
   >   还原到 `commit` 的 `id`，此 `commit` 之后的文件都被还原

## git stash save

在用 `git` 的时候经常会有需要临时切分支等操作，但是如果当前工作区进行了修改就不能直接切分支。这时候呢就得把当前的代码暂存起来，可以这么操作：

```
git add .
git stash
```

这样就吧上次 `commit` 到现在的修改都暂存起来了，可以使用 `git stash show` 来查看暂存区。

`git stash save "fix:xxxx"` 给暂存区命名

其中 `git stash pop` 是应用一个 `stash`，并删除这个 `stash`。`git stash apply` 是只应用不删除。

