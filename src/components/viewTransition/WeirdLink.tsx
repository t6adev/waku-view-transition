'use client';

import { Link as WakuLink, useRouter_UNSTABLE as useRouter } from 'waku';

import { startTransition, useCallback } from 'react';

/**
 * CAUTION:
 *   - This looks like it works unexpectedly but it should not be correct. 🥴
 *   - Wow, it works with `render: 'dynamic'` mode
 */
export function Link(props: React.ComponentProps<typeof WakuLink>) {
  const router = useRouter();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e);
      }

      if ('startViewTransition' in document) {
        e.preventDefault();

        // @ts-ignore
        document.startViewTransition(() => router.push(props.to));
      }
    },
    [props.to, props.onClick]
  );

  return <WakuLink {...props} onClick={onClick} unstable_prefetchOnEnter />;
}
