## 修改 Windows 右键通过 PyCharm 打开项

```shell
进入 [HKEY_CLASSES_ROOT\Directory\Background\shell\PyCharm Community Edition] 项（非下级项）
在 PyCharm Community Edition 项的默认内容中，将 Open Folder as PyCharm Project 修改为自己想要修改的内容，如“使用PyCharm加载该路径”
右键菜单内容会根据修改而改变，不需重启
```
