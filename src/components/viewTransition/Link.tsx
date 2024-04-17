'use client';

/**
 * Based on https://github.com/shuding/next-view-transitions/blob/b1e1211e95f36eaca60f7540b54d220773f8921d/src/link.tsx
 */

import { Link as WakuLink, useRouter_UNSTABLE as useRouter } from 'waku';

import { startTransition, useCallback, type AnchorHTMLAttributes } from 'react';
import { flushSync } from 'react-dom';

// For now, only handling `to` and `children` props
export function Link(
  props: Pick<React.ComponentProps<typeof WakuLink>, 'to' | 'children'> &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
) {
  const router = useRouter();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (props.onClick) {
        props.onClick(e);
      }
      if ('startViewTransition' in document) {
        /**
         * Note:
         *   - Not working with `render: 'dynamic'` mode
         *   - It should resolve this Link problem first, then tackle popstate event issue
         */
        /* Pattern 1: Unstable behavior */
        // startTransition(() => {
        //   router.push(props.to);
        //   // @ts-ignore
        //   document.startViewTransition(() => {});
        // });
        /* --- or --- */
        /**
         * Pattern 2: First animation does not work, but afterwards it does. It's a better solution?
         * Ref: https://codesandbox.io/s/nervous-mclaren-j8v8y0?file=/src/App.tsx in https://developer.chrome.com/docs/web-platform/view-transitions/#transitions-as-an-enhancement
         */
        // @ts-ignore
        document.startViewTransition(() => {
          flushSync(() => {
            router.push(props.to);
          });
        });
      }
    },
    [props.to, props.onClick]
  );

  return <a {...props} onClick={onClick} />;
}
