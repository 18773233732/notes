# virtualenv

## 概述

virtualenv 用来建立一个虚拟的 python 环境，一个专属项目的 python 环境，用 virtualenv 来保持一个干净的环境非常有用。

## 基本使用

1. 通过 pip 安装 virtualenv

   `pip install virtualenv`

2. 测试安装

   `virtualenv --version`

3. 为一个项目搭建一个虚拟环境

   ```shell
   cd my_project
   virtualenv my_project_env
   ```

4. 如果存在多个 python 解释器，可以选择指定一个 python 解释器（例如 python2.7 ），没有指定则由系统默认的解释器来搭建

   `virtualnev -p /user/bin/python2.7 my_project_env`

   这条命令将会在当前的目录中创建一个名 my_project_env 的文件夹，这是一个独立的 python 运行环境，包含了 python 可执行文件， 以及 `pip` 库的一份拷贝，这样就能安装其他包了，不过已经安装到系统 python 环境中的所有第三方包都不会复制过来，这样，我们就得到了一个不带任何第三方包的“干净”的 python 运行环境。 

6. 开始使用虚拟环境，需要被激活

   `source my_project_env/bin/activate`

   Windows 下使用：

   `./my_project_env/Scripts/activate.bat`

7. 停用虚拟环境

   `deactivate`

   Windows 下使用：

   `.\opencv-face\Scripts\deactivate.bat`

   停用后将回到系统默认的 python 解释器。