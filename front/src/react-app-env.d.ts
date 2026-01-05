/// <reference types="react-scripts" />

// Fallback typings when `@types/react` is missing/not installed yet.
// Recommended: run `npm install` to install `@types/react` and remove these.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react/jsx-runtime' {
  export const Fragment: any;
  export const jsx: any;
  export const jsxs: any;
}


