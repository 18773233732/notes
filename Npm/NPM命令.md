<<<<<<< Updated upstream
# NPM 命令

## npm install moduleName

- 安装模块到项目 node_modules 目录下。

2. 不会将模块依赖写入 devDependencies 或 dependencies 节点。
3. 运行 npm install 初始化项目时不会下载模块。

## npm install -g moduleName

- 安装模块到全局，不会在项目 node_modules 目录中保存模块包。
- 不会将模块依赖写入 devDependencies 或 dependencies 节点。
- 运行 npm install 初始化项目时不会下载模块。

## npm install --save moduleName

- 安装模块到项目 node_modules 目录下。
- 会将模块依赖写入 dependencies 节点。

- 运行 npm install 初始化项目时，会将模块下载到项目目录下。
- 运行 npm install --production 或者注明 NODE_ENV 变量值为 production 时，会自动下载模块到 node_modules 目录中。

## npm install --save-dev moduleName

- 安装模块到项目 node_modules 目录下。
- 会将模块依赖写入 devDependencies 节点。
- 运行 npm install 初始化项目时，会将模块下载到项目目录下。
- 运行 npm install --production 或者注明 NODE_ENV 变量值为 production 时，不会自动下载模块到 node_modules 目录中。

evDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用的 gulp，压缩 css、js 的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用-save-dev 的形式安装。像 express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用-save 的形式安装。

## set registry

`npm config set registry`
=======
# NPM 命令

## npm install moduleName

- 安装模块到项目 node_modules 目录下。

2. 不会将模块依赖写入 devDependencies 或 dependencies 节点。
3. 运行 npm install 初始化项目时不会下载模块。

## npm install -g moduleName

- 安装模块到全局，不会在项目 node_modules 目录中保存模块包。
- 不会将模块依赖写入 devDependencies 或 dependencies 节点。
- 运行 npm install 初始化项目时不会下载模块。

## npm install --save moduleName

- 安装模块到项目 node_modules 目录下。
- 会将模块依赖写入 dependencies 节点。

- 运行 npm install 初始化项目时，会将模块下载到项目目录下。
- 运行 npm install --production 或者注明 NODE_ENV 变量值为 production 时，会自动下载模块到 node_modules 目录中。

## npm install --save-dev moduleName

- 安装模块到项目 node_modules 目录下。
- 会将模块依赖写入 devDependencies 节点。
- 运行 npm install 初始化项目时，会将模块下载到项目目录下。
- 运行 npm install --production 或者注明 NODE_ENV 变量值为 production 时，不会自动下载模块到 node_modules 目录中。

evDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用的 gulp，压缩 css、js 的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用-save-dev 的形式安装。像 express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用-save 的形式安装。

## set registry

`npm config set registry`

> > > > > > > Stashed changes
>>>>>>> Stashed changes
