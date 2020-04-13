import { createMachine, interpret } from 'xstate';
import { assign, assignPatch, patchEvent } from '../src';

describe('@xstate/immer', () => {
  it('should update the context without modifying previous contexts', () => {
    const context = {
      count: 0
    };
    const countMachine = createMachine<typeof context>({
      id: 'count',
      context,
      initial: 'active',
      states: {
        active: {
          on: {
            INC: {
              actions: assign<typeof context>((ctx) => ctx.count++)
            }
          }
        }
      }
    });

    const zeroState = countMachine.initialState;
    const oneState = countMachine.transition(zeroState, 'INC');
    const twoState = countMachine.transition(zeroState, 'INC');

    expect(zeroState.context).toEqual({ count: 0 });
    expect(oneState.context).toEqual({ count: 1 });
    expect(twoState.context).toEqual({ count: 1 });
  });

  it('should perform multiple updates correctly', () => {
    const context = {
      count: 0
    };
    const countMachine = createMachine<typeof context>(
      {
        id: 'count',
        context,
        initial: 'active',
        states: {
          active: {
            on: {
              INC_TWICE: {
                actions: ['increment', 'increment']
              }
            }
          }
        }
      },
      {
        actions: {
          increment: assign<typeof context>((ctx) => ctx.count++)
        }
      }
    );

    const zeroState = countMachine.initialState;
    const twoState = countMachine.transition(zeroState, 'INC_TWICE');

    expect(zeroState.context).toEqual({ count: 0 });
    expect(twoState.context).toEqual({ count: 2 });
  });

  it('should perform deep updates correctly', () => {
    const context = {
      foo: {
        bar: {
          baz: [1, 2, 3]
        }
      }
    };
    const countMachine = createMachine<typeof context>(
      {
        id: 'count',
        context,
        initial: 'active',
        states: {
          active: {
            on: {
              INC_TWICE: {
                actions: ['pushBaz', 'pushBaz']
              }
            }
          }
        }
      },
      {
        actions: {
          pushBaz: assign<typeof context>((ctx) => ctx.foo.bar.baz.push(0))
        }
      }
    );

    const zeroState = countMachine.initialState;
    const twoState = countMachine.transition(zeroState, 'INC_TWICE');

    expect(zeroState.context.foo.bar.baz).toEqual([1, 2, 3]);
    expect(twoState.context.foo.bar.baz).toEqual([1, 2, 3, 0, 0]);
  });

  it('should patch updates', () => {
    const context = {
      foo: {
        bar: {
          baz: [1, 2, 3]
        }
      }
    };
    const countMachine = createMachine<typeof context>({
      id: 'count',
      context,
      initial: 'active',
      states: {
        active: {
          on: {
            UPDATE_BAZ: {
              actions: assignPatch()
            }
          }
        }
      }
    });

    const zeroState = countMachine.initialState;
    const somePatchEvent = patchEvent(
      'UPDATE_BAZ',
      countMachine.initialState.context,
      (ctx) => {
        ctx.foo.bar.baz.push(4);
      }
    );
    const twoState = countMachine.transition(zeroState, somePatchEvent);

    expect(zeroState.context.foo.bar.baz).toEqual([1, 2, 3]);
    expect(twoState.context.foo.bar.baz).toEqual([1, 2, 3, 4]);
  });

  it('should patch updates (form example)', (done) => {
    const context = {
      name: '',
      age: undefined as number | undefined
    };

    const formMachine = createMachine<typeof context>({
      initial: 'editing',
      context,
      states: {
        editing: {
          on: {
            UPDATE: { actions: assignPatch() },
            SUBMIT: 'submitting'
          }
        },
        submitting: {
          on: {
            '': {
              target: 'success',
              cond: (ctx) => {
                return ctx.name === 'David' && ctx.age === 42;
              }
            }
          }
        },
        success: {
          type: 'final'
        }
      }
    });

    const service = interpret(formMachine)
      .onDone(() => {
        done();
      })
      .start();

    service.send(
      patchEvent('UPDATE', formMachine.initialState.context, (ctx) => {
        ctx.name = 'David';
      })
    );
    service.send(
      patchEvent('UPDATE', formMachine.initialState.context, (ctx) => {
        ctx.age = 42;
      })
    );

    service.send('SUBMIT');
  });
});
