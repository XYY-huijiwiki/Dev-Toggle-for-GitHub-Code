# Dev-Toggle-for-GitHub-Code

一个用于在羊羊百科注入开发服务器切换变量的用户脚本。

## 原理

利用篡改猴插件，在网页加载前注入全局变量`dev`，值为`false`或字符串。其他代码会根据`dev`的值来判断是否处于开发者模式。

## 使用方法

1. 安装浏览器插件[篡改猴](https://www.tampermonkey.net)。
2. 安装篡改猴脚本：[Dev-Toggle-for-GitHub-Code](https://xyy-huijiwiki.github.io/Dev-Toggle-for-GitHub-Code)。
3. 在羊羊百科的页面上，打开篡改猴菜单，启用脚本（false 代表停止注入开发服务器，不同名称代表不同项目）。

![guide](guide.png)

> [!NOTE]
> 结束测试后记得关闭脚本，否则默认 js 将无法加载。

## 新项目如何接入此脚本

1. 在`src/main.ts`中的`devList`添加项目新项目的名称。
2. 在新项目**所有**脚本运行前，检查`dev`的值，并决定启动开发版本还是正式版本。以[MediaWiki-Common.js](http://github.com/xyy-huijiwiki/MediaWiki-Common.js)为例：

   ```ts
   // 假设使用Vite，全部为默认设置的情况下，在文件 src/main.ts 中

   if (import.meta.env.PROD && dev === "MediaWiki-Common.js") {
     // 此处代码只在生产环境且发现`dev`值为`MediaWiki-Common.js`时执行
     // 此时停止继续加载代码即可
     throw new Error("检测到dev环境，停止加载prod代码");
     // 虽然并不推荐throw new Error，但是这是最简单的方法
   }

   // 正常运行其他代码
   ```
