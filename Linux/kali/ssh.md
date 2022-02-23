# kali ssh 配置

安装防火墙 `ufw`

```shell
sudo apt-get install ufw
# 开启防火墙
sudo ufw enbale
# 查看状态
sudo ufw status
# 开放端口
sudo ufw allow 22
```

开启 `ssh`

```shell
sudo vim /etc/ssh_config
# 找到这一行后面改为 yes
==========================
PasswordAuthentication yes
==========================

# 默认似乎没有开启 ssh，手动启用
sudo systemctl start ssh.service
# 如果默认启用，则重启 ssh
sudo systemctl restart ssh.service

# 开机自启
sudo systemctl enable ssh.service
```

允许 `root` 用户使用 `ssh` 登录

```shell
sudo vim /etc/ssh/sshd_config

# 找到这一行后面改为 yes
=======================
PermitRootLogin
=======================

# 重启 ssh
sudo systemctl restart ssh.service
```

