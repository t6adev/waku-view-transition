# View Transition Demo with Waku

This code is based on https://github.com/shuding/next-view-transitions
Thank you, [@shuding_](https://twitter.com/shuding_).

This repository is a challenge implementation of view transition for Waku.

## Expected Behavior

When you click the demo link, the view transition animation should correctly work.
(+ Then click browser back button after transitions, of course it should be animated)

## Current Status
Unfortunately, almost not working yet.
Here is my note:
- Using context + use(), not working. (I've tried to use Jotai instead)
- First transition is not animated and using browser back is not correctly working
- Using `render: 'dynamic'` setting in page config, not working
