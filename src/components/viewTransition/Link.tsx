'use client';

/**
 * Based on https://github.com/shuding/next-view-transitions/blob/b1e1211e95f36eaca60f7540b54d220773f8921d/src/link.tsx
 */

import { Link as WakuLink, useRouter_UNSTABLE as useRouter } from 'waku';

import { startTransition, useCallback, type AnchorHTMLAttributes } from 'react';

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
        router.prefetch(props.to);
        startTransition(() => {
          router.push(props.to);
          // @ts-ignore
          document.startViewTransition(() => {});
        });
      }
    },
    [props.to, props.onClick]
  );

  return <a {...props} onClick={onClick} />;
}
