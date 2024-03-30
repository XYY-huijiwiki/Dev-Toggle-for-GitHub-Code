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
2. 在羊羊百科中的导入脚本中，通过判断`dev`的值来判断是否加载普通代码。

   ```html
   <!-- [[Html:迷你控制中心]] -->

   <script>
     typeof dev !== "undefined" && dev === "mini-dashboard" // 通过typeof避免dev未定义时报错
       ? import("http://localhost:5173/src/main.ts") // 处于开发模式，加载开发代码（此为Vite默认情况下的网址）
       : import("https://xyy-huijiwiki.github.io/mini-dashboard/entry.js"); // 处于普通模式，加载普通代码
   </script>
   ```
