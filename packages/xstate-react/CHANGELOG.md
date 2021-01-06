# Changelog

## 2.0.0-next.0

### Patch Changes

- Updated dependencies [[`7f3b8481`](https://github.com/davidkpiano/xstate/commit/7f3b84816564d951b6b29afdd7075256f1f59501), [`969a2f4f`](https://github.com/davidkpiano/xstate/commit/969a2f4fc0bc9147b9a52da25306e5c13b97f159), [`172d6a7e`](https://github.com/davidkpiano/xstate/commit/172d6a7e1e4ab0fa73485f76c52675be8a1f3362), [`e09efc72`](https://github.com/davidkpiano/xstate/commit/e09efc720f05246b692d0fdf17cf5d8ac0344ee6), [`145539c4`](https://github.com/davidkpiano/xstate/commit/145539c4cfe1bde5aac247792622428e44342dd6), [`3de36bb2`](https://github.com/davidkpiano/xstate/commit/3de36bb24e8f59f54d571bf587407b1b6a9856e0), [`9e10660e`](https://github.com/davidkpiano/xstate/commit/9e10660ec2f1e89cbb09a1094edb4f6b8a273a99), [`8fcbddd5`](https://github.com/davidkpiano/xstate/commit/8fcbddd51d66716ab1d326d934566a7664a4e175), [`97b05690`](https://github.com/davidkpiano/xstate/commit/97b05690cd8b30824eb176c813a145d3ef0d2a78), [`6043a1c2`](https://github.com/davidkpiano/xstate/commit/6043a1c28d21ff8cbabc420a6817a02a1a54fcc8), [`0e24ea6d`](https://github.com/davidkpiano/xstate/commit/0e24ea6d62a5c1a8b7e365f2252dc930d94997c4), [`04e89f90`](https://github.com/davidkpiano/xstate/commit/04e89f90f97fe25a45b5908c45f25a513f0fd70f), [`8fcbddd5`](https://github.com/davidkpiano/xstate/commit/8fcbddd51d66716ab1d326d934566a7664a4e175), [`b24e47b9`](https://github.com/davidkpiano/xstate/commit/b24e47b9e7a59a5b0527d4386cea3af16c84ca7a), [`390eaaa5`](https://github.com/davidkpiano/xstate/commit/390eaaa523cb0dd243e39c6300e671606c1e45fc), [`0c6cfee9`](https://github.com/davidkpiano/xstate/commit/0c6cfee9a6d603aa1756e3a6d0f76d4da1486caf), [`e09efc72`](https://github.com/davidkpiano/xstate/commit/e09efc720f05246b692d0fdf17cf5d8ac0344ee6), [`025a2d6a`](https://github.com/davidkpiano/xstate/commit/025a2d6a295359a746bee6ffc2953ccc51a6aaad), [`e09efc72`](https://github.com/davidkpiano/xstate/commit/e09efc720f05246b692d0fdf17cf5d8ac0344ee6), [`5d16a736`](https://github.com/davidkpiano/xstate/commit/5d16a73651e97dd0228c5215cb2452a4d9951118), [`8fcbddd5`](https://github.com/davidkpiano/xstate/commit/8fcbddd51d66716ab1d326d934566a7664a4e175), [`53a594e9`](https://github.com/davidkpiano/xstate/commit/53a594e9a1b49ccb1121048a5784676f83950024), [`31a0d890`](https://github.com/davidkpiano/xstate/commit/31a0d890f55d8f0b06772c9fd510b18302b76ebb)]:
  - xstate@5.0.0-next.0

## 1.2.2

### Patch Changes

- [`4b31cefb`](https://github.com/davidkpiano/xstate/commit/4b31cefb3d3497e5515314046639df7e27dbe9e8) [#1780](https://github.com/davidkpiano/xstate/pull/1780) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with some external packages not being bundled correctly into the UMD bundles.

## 1.2.1

### Patch Changes

- [`a16a5f2f`](https://github.com/davidkpiano/xstate/commit/a16a5f2ff5ba9d4d7834ec3ca2d0adecf5d6a870) [#1756](https://github.com/davidkpiano/xstate/pull/1756) Thanks [@dimitardanailov](https://github.com/dimitardanailov)! - Fixed an issue with `process` references not being removed correctly from the UMD bundles.

## 1.2.0

### Minor Changes

- [`dd98296e`](https://github.com/davidkpiano/xstate/commit/dd98296e9fcbae905da2395e67e876e28be7c774) [#1738](https://github.com/davidkpiano/xstate/pull/1738) Thanks [@dimitardanailov](https://github.com/dimitardanailov)! - Added UMD bundle.

## 1.1.0

### Minor Changes

- [`89f9c27c`](https://github.com/davidkpiano/xstate/commit/89f9c27c453dc56bdfdf49c8ea1f0f87ff1f9b67) [#1622](https://github.com/davidkpiano/xstate/pull/1622) Thanks [@davidkpiano](https://github.com/davidkpiano)! - Spawned/invoked actors and interpreters are now typed as extending `ActorRef` rather than `Actor` or `Interpreter`. This unification of types should make it more straightforward to provide actor types in React:

  ```ts
  import { ActorRef } from 'xstate';
  import { useActor } from '@xstate/react';

  const Child: React.FC<{ actorRef: ActorRef<SomeEvent, SomeEmitted> }> = ({
    actorRef
  }) => {
    // `state` is typed as `SomeEmitted`
    // `send` can be called with `SomeEvent` values
    const [state, send] = useActor(actorRef);

    // . ..
  };
  ```

  It's also easier to specify the type of a spawned/invoked machine with `ActorRefFrom`:

  ```ts
  import { createMachine, ActorRefFrom } from 'xstate';
  import { useActor } from '@xstate/react';

  const someMachine = createMachine<SomeContext, SomeEvent>({
    // ...
  });

  const Child: React.FC<{ someRef: ActorRefFrom<typeof someMachine> }> = ({
    someRef
  }) => {
    // `state` is typed as `State<SomeContext, SomeEvent>`
    // `send` can be called with `SomeEvent` values
    const [state, send] = useActor(someRef);

    // . ..
  };
  ```

## 1.0.3

### Patch Changes

- [`27db2950`](https://github.com/davidkpiano/xstate/commit/27db295064d42cacb89ff10d55f39eb7609148e1) [#1636](https://github.com/davidkpiano/xstate/pull/1636) Thanks [@Andarist](https://github.com/Andarist)! - Allow React 17 in the specified peer dependency range.

## 1.0.2

### Patch Changes

- [`c7927083`](https://github.com/davidkpiano/xstate/commit/c7927083a651e3c51952ade2ffda793df0391bf6) [#1516](https://github.com/davidkpiano/xstate/pull/1516) Thanks [@davidkpiano](https://github.com/davidkpiano)! - The `send` function returned from the `useService()` now can take two arguments (an event type and payload), to match the behavior of `@xstate/react` version 0.x.

* [`db77623a`](https://github.com/davidkpiano/xstate/commit/db77623a48955d762cffa9b624f438220add5eed) [#1516](https://github.com/davidkpiano/xstate/pull/1516) Thanks [@davidkpiano](https://github.com/davidkpiano)! - The `send` value returned from the `useService()` hook will now accept a payload, which matches the signature of the `send` value returned from the `useMachine()` hook:

  ```js
  const [state, send] = useService(someService);

  // ...

  // this is OK:
  send('ADD', { value: 3 });

  // which is equivalent to:
  send({ type: 'ADD', value: 3 });
  ```

- [`93f6db02`](https://github.com/davidkpiano/xstate/commit/93f6db02a2d56ec997198ddef0af3d7730bb79bb) [#1594](https://github.com/davidkpiano/xstate/pull/1594) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with internal `setState` in `useService` being called with 2 arguments instead of 1.

* [`72b0880e`](https://github.com/davidkpiano/xstate/commit/72b0880e6444ae009adca72088872bb5c0760ce3) [#1504](https://github.com/davidkpiano/xstate/pull/1504) Thanks [@Andarist](https://github.com/Andarist)! - Fixed issue with `useService` returning an initial state for services in their final states.

## 1.0.1

### Patch Changes

- [`c0bd0407`](https://github.com/davidkpiano/xstate/commit/c0bd040767dcac20ed690e49a8725b4f1011dd5d) [#1493](https://github.com/davidkpiano/xstate/pull/1493) Thanks [@davidkpiano](https://github.com/davidkpiano)! - There will now be a descriptive error when trying to use an actor-like object in the `useService()` hook, where `useActor()` should be preferred:

  > Attempted to use an actor-like object instead of a service in the useService() hook. Please use the useActor() hook instead.

All notable changes to this project will be documented in this file.

## [1.0.0-rc.7]

- The `machine` passed into `useMachine(machine)` can now be passed in lazily:

  ```js
  const [state, send] = useMachine(() => createMachine(/* ... */));

  // ...
  ```

  This has the benefit of avoiding unnecessary machine initializations whenever the component rerenders.

- The `useActor` hook now takes a second argument: `getSnapshot` which is a function that should return the last emitted value:

  ```js
  const [state, send] = useActor(someActor, actor => actor.current);
  ```

## [1.0.0-rc.6]

## [1.0.0-rc.5]

- You can now schedule actions in `useEffect` or `useLayoutEffect` via:
  - `asEffect` - queues the action to be executed in `useEffect`
  - `asLayoutEffect` - queues the action to be executed in `useLayoutEffect`

```jsx
import { createMachine } from 'xstate';
import { useMachine, asEffect } from '@xstate/react';

const machine = createMachine({
  initial: 'focused',
  states: {
    focused: {
      entry: 'focus'
    }
  }
});

const Input = () => {
  const inputRef = useRef(null);
  const [state, send] = useMachine(machine, {
    actions: {
      focus: asEffect(() => {
        inputRef.current && inputRef.current.focus();
      })
    }
  });

  return <input ref={inputRef} />;
};
```

## [0.8.1]

- Services are now kept up to date

## [0.8.0]

- The `useActor()` hook is now available.
- Support for persisted states

## [0.7.1]

- Actions passed into `useMachine(..., { actions: { ... } })` will now be kept up-to-date and no longer reference stale data.

## [0.7.0]

### Added

- Machine configuration can now be merged into the options argument of `useMachine(machine, options)`. The following Machine Config options are available: `guards`, `actions`, `activities`, `services`, `delays` and `updates` (NOTE: `context` option is not implemented yet, use `withContext` or `withConfig` instead for the meantime)

```js
const [current, send] = useMachine(someMachine, {
  actions: {
    doThing: doTheThing
  },
  services: {
    /* ... */
  },
  guards: {
    /* ... */
  }
  // ... etc.
});
```
