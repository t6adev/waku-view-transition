'use client';

/**
 * Based on https://github.com/shuding/next-view-transitions/blob/b1e1211e95f36eaca60f7540b54d220773f8921d/src/link.tsx
 */

import { Link as WakuLink, useRouter_UNSTABLE as useRouter } from 'waku';

import { startTransition, useCallback } from 'react';

// import { useSetAtom } from 'jotai';

// import { finishViewTransitionAtom } from './TransitionContext.js';
// import { useSetFinishViewTransition } from './TransitionContext.js';

// This is a wrapper around next/link that explicitly uses the router APIs
// to navigate, and trigger a view transition.

export function Link(props: React.ComponentProps<typeof WakuLink>) {
  const router = useRouter();
  // const finishViewTransition = useSetAtom(finishViewTransitionAtom);
  // const finishViewTransition = useSetFinishViewTransition();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e);
      }

      if ('startViewTransition' in document) {
        e.preventDefault();

        // @ts-ignore
        document.startViewTransition(
          () =>
            // new Promise<void>((resolve) => {
            startTransition(() => {
              router.push(props.to);
              // resolve();
            })
          // })
        );
      }
    },
    [props.to, props.onClick]
  );

  return <WakuLink {...props} onClick={onClick} />;
}
