jest.mock("../src/mockClass");
jest.mock("../src/mockFunc", () => {
    return {
        ...jest.requireActual("../src/mockFunc"),
        double: jest.fn(),
    };
});

import func, { double } from "../src/mockFunc";
import c from "../src/mockClass";

test("func와 c가 정의되어 있어야 한다.", () => {
    console.log(func, new c().methodA, new c().methodB);

    const original = jest.requireActual("../src/mockFunc");
    console.log(original);
    console.log(func);
    console.log(double);

    expect(func).toBeDefined();
    expect(c).toBeDefined();
});
