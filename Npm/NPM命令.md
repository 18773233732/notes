# NPM命令

## npm install moduleName

- 安装模块到项目node_modules目录下。  
2. 不会将模块依赖写入devDependencies或dependencies节点。  
3. 运行npm install初始化项目时不会下载模块。

## npm install -g moduleName

- 安装模块到全局，不会在项目node_modules目录中保存模块包。
- 不会将模块依赖写入devDependencies或dependencies节点。
- 运行npm install初始化项目时不会下载模块。 

## npm install --save moduleName

- 安装模块到项目node_modules目录下。
- 会将模块依赖写入dependencies节点。

- 运行npm install初始化项目时，会将模块下载到项目目录下。
- 运行npm install --production或者注明NODE_ENV变量值为production时，会自动下载模块到node_modules目录中。 

## npm install --save-dev moduleName

- 安装模块到项目node_modules目录下。
- 会将模块依赖写入devDependencies节点。
- 运行npm install初始化项目时，会将模块下载到项目目录下。
- 运行npm install --production或者注明NODE_ENV变量值为production时，不会自动下载模块到node_modules目录中。 

evDependencies节点下的模块是我们在开发时需要用的，比如项目中使用的gulp，压缩css、js的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用-save-dev的形式安装。像express这些模块是项目运行必备的，应该安装在dependencies节点下，所以我们应该使用-save的形式安装。



## set registry

`npm config set registry`

