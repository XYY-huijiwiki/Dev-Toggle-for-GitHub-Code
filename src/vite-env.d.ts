/// <reference types="vite/client" />
/// <reference types="vite-plugin-monkey/client" />
//// <reference types="vite-plugin-monkey/global" />

type UnsafeWindow = {
  dev: string | false;
  CHP: Promise<void>;
} & typeof untypedUnsafeWindow;
