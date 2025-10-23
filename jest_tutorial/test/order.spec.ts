import { first, second, third } from "../src/order";

test("first -> second -> third", () => {
    const spy1 = jest.fn(first);
    const spy2 = jest.fn(second);
    const spy3 = jest.fn(third);

    spy1();
    spy2();
    spy3();

    expect(spy1).toHaveBeenCalledBefore(spy2);
    expect(spy3).toHaveBeenCalledAfter(spy2);
});
