用管理员模式打开 `git bash` 编辑下列文件

1. `/c/Program Files/Git/etc/gitconfig`

   ```shell
   [gui]  
       encoding = utf-8  #代码库统一使用utf-8  
   [i18n]  
       commitencoding = utf-8  #log编码  
   [svn]  
       pathnameencoding = utf-8  #支持中文路径
   ```

2. `/c/Program Files/Git/etc/inputrc`

   ```shell
   set output-meta on
   set convert-meta off
   ```

3. `/c/Program Files/Git/etc/profile`

   ```shell
   export LESSHARESET=utf-8
   ```

最后设置

`git config --global core.quotepath false`

完成