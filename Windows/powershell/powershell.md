# PowerShell 禁止运行脚本

```shell
yarn : 无法加载文件 C:\Program Files\nodejs\yarn.ps1，因为在此系统上禁止运行脚本。有关详细信息，请
参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ yarn start-https
+ ~~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

查看计算机上的现用执行策略，打开 `PowerShell` 然后输入 `get-executionpolicy`

以管理员身份打开 `PowerShell` 输入 `set-executionpolicy remotesigned` 选择 `A`