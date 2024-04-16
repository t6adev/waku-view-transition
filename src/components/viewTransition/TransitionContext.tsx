'use client';
import { atom, createStore, Provider } from 'jotai';

import { useBrowserNativeTransitions } from './browser-native-events.js';

const myStore = createStore();

const baseFinishViewTransitionAtom = atom<{ r: null | (() => void) }>({ r: null });
export const finishViewTransitionAtom = atom(
  (get) => get(baseFinishViewTransitionAtom),
  (get, set, r: () => void) => {
    r();
    set(baseFinishViewTransitionAtom, { r: null });
  }
);

const Layer = () => {
  useBrowserNativeTransitions();
  return null;
};

export function ViewTransitions({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={myStore}>
      <Layer />
      {children}
    </Provider>
  );
}

/**
 * The original is https://github.com/shuding/next-view-transitions/blob/b1e1211e95f36eaca60f7540b54d220773f8921d/src/transition-context.tsx
 * But it's not working
 */

// import type { Dispatch, SetStateAction } from 'react';
// import { createContext, use, useEffect, useState } from 'react';

// import { useBrowserNativeTransitions } from './browser-native-events.js';

// const ViewTransitionsContext = createContext<Dispatch<SetStateAction<(() => void) | null>>>(
//   () => () => {}
// );

// export function ViewTransitions({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [finishViewTransition, setFinishViewTransition] = useState<null | (() => void)>(null);

//   useEffect(() => {
//     if (finishViewTransition) {
//       finishViewTransition();
//       setFinishViewTransition(null);
//     }
//   }, [finishViewTransition]);

//   useBrowserNativeTransitions();

//   return (
//     <ViewTransitionsContext.Provider value={setFinishViewTransition}>
//       {children}
//     </ViewTransitionsContext.Provider>
//   );
// }

// export function useSetFinishViewTransition() {
//   return use(ViewTransitionsContext);
// }
