import {
  unsafeWindow as untypedUnsafeWindow,
  GM_setValue,
  GM_getValue,
  GM_registerMenuCommand,
} from "$";

// type UnsafeWindow
const unsafeWindow = untypedUnsafeWindow as UnsafeWindow;
// devList is a list of false and strings of GitHub repo names of XYY-huijiwiki
const devList = [false, "MediaWiki-Common.js", "mini-dashboard"];
// dev is the current dev mode (false for disable)
const dev: string | false = GM_getValue("dev") || false;
// register menu commands
for (let index = 0; index < devList.length; index++) {
  const element = devList[index];
  GM_registerMenuCommand(
    `开发者模式: ${element}${dev === element ? "（√）" : ""}`,
    () => {
      GM_setValue("dev", element);
      unsafeWindow.location.reload();
    }
  );
}
// inject dev to window
unsafeWindow.dev = dev;
// if http://127.0.0.1:5173 is not online, alert user to close the dev mode
if (dev) {
try {
  fetch("http://127.0.0.1:5173")
} catch (error) {
  alert("开发服务器似乎没有开启，请关闭开发者模式（脚本猴 => dev-toggle-for-gitHub-code => 开发者模式: false）");
}
}