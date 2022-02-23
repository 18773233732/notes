# Raspberry pi zero w

## 烧录完系统

开启SSH

在boot分区新建空白的 `SSH` 文件，以及 wifi 配置文件 `wpa_supplicant.conf`

```shell
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=CN

network={
     ssid="TP-LINK-DO"
     psk="********"
     key_mgmt=WPA-PSK
}
```

重启

## 查看IP

`arp -i bridge100 -a`

![image-20220125140659975](Raspberry Pi Zero 2W.assets/image-20220125140659975.png)

## 更改GPU大小

`sudo raspi-config`

![image-20220125141002854](Raspberry Pi Zero 2W.assets/image-20220125141002854.png)

![image-20220125140942136](Raspberry Pi Zero 2W.assets/image-20220125140942136.png)

![image-20220125140923865](Raspberry Pi Zero 2W.assets/image-20220125140923865.png)

## expand filesystem

Ensure that all of the SD card is available

![image-20220125141126236](Raspberry Pi Zero 2W.assets/image-20220125141126236.png)

![image-20220125141143001](Raspberry Pi Zero 2W.assets/image-20220125141143001.png)

## enable ssh root login

`sudo vim /etc/ssh/sshd_config`

![image-20220125141519696](Raspberry Pi Zero 2W.assets/image-20220125141519696.png)

重启ssh

![image-20220125141600807](Raspberry Pi Zero 2W.assets/image-20220125141600807.png)

生效

![image-20220125141618313](Raspberry Pi Zero 2W.assets/image-20220125141618313.png)

修改 root 密码

`sudo passwd root`

![image-20220125141659674](Raspberry Pi Zero 2W.assets/image-20220125141659674.png)

## zsh

you have to install zsh to replace bash

```shell
sudo apt-get install zsh

# Then set zsh as default shell
chsh -s /bin/zsh

sudo apt-get install git wget -y

sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

![image-20220125142712616](Raspberry Pi Zero 2W.assets/image-20220125142712616.png)

install plugins

`git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions`

`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`

```shell
vim ~/.zshrc
plugins=(git)
```

![image-20220125143832022](Raspberry Pi Zero 2W.assets/image-20220125143832022.png)

`source ~/.zshrc`

生效

![image-20220125143902826](Raspberry Pi Zero 2W.assets/image-20220125143902826.png)

主题`ZSH_THEME="apple"`

## neofetch

`sudo apt-get install neofetch`

![image-20220125150522991](Raspberry Pi Zero 2W.assets/image-20220125150522991.png)

## pi dashboard

```shell
sudo apt-get update
sudo apt-get install nginx php7.3-fpm php7.3-cli php7.3-curl php7.3-gd php7.3-cgi
sudo service nginsx start
sudo service php7.3-fpm restart
```

让 nginx 处理 php

`sudo vim /etc/nginx/sites-available/default`

替换

```
location / {
  # First attempt to serve request as file, then
  # as directory, then fall back to displaying a 404.
  try_files $uri $uri/ =404;
}
```

成

```
location / {
	index  index.html index.htm index.php default.html default.htm default.php;
	autoindex on;
	autoindex_exact_size on;
	autolocaltime on;
}
 
location ~\.php$ {
  fastcgi_pass unix:/run/php/php7.3-fpm.sock;
  #fastcgi_pass 127.0.0.1:9000;
  fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
  include fastcgi_params;
}
```

重启 nginx 服务

`sudo nginx -s relad`

安装配置MySQL

`sudo apt-get install mariadb-server`

更改密码

```shell
MariaDB [(none)]> use mysql;
MariaDB [mysql]> update user set plugin="mysql_native_password" where user="root";
MariaDB [mysql]> update user set password=PASSWORD("1225") where user="root";
MariaDB [mysql]> flush privileges;
MariaDB [mysql]> exit;
```

重启服务

`sudo service mysql restart`

```
sudo git clone https://github.com/nxez/pi-dashboard.git
```

