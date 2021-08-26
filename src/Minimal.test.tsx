import { ActorRef, createMachine, interpret, sendParent, spawn } from "xstate";

describe("makePaginatedApiMachine", () => {
  beforeEach(jest.clearAllMocks);

  const anotherMachine = createMachine({
    id: "whatever",
    initial: "hello",
    states: {
      hello: {
        entry: sendParent("ping"),
      },
    },
  });

  const testMachine = createMachine<{ ref: ActorRef<any> }>({
    id: "test",
    initial: "testing",
    context: () => ({
      ref: spawn(anotherMachine, "yo"),
    }),
    states: {
      testing: {
        on: {
          ping: {
            target: "done",
          },
        },
      },
      done: {},
    },
  });

  it("works", () => {
    const testService = interpret(testMachine).start();
    expect(testService.getSnapshot()?.matches("done")).toBe(true);
  });
});
