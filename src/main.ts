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
if (dev) {
  // wait for DOMContentLoaded and CHP
  await new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", resolve);
  });
  await unsafeWindow.CHP;
  // load dev script
  let script = document.createElement("script");
  script.src = "http://localhost:5173/src/main.ts";
  document.head.appendChild(script);
}
