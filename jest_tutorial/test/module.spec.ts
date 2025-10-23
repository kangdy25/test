import { obj } from "../src/module";

jest.mock("../src/module", () => {
    return {
        ...jest.requireActual("../src/module"),
        obj: {
            ...jest.requireActual("../src/module"),
            method3: jest.fn(),
        },
    };
});

test("모듈을 모두 모킹", () => {
    jest.replaceProperty(obj, "prop", "replaced");
    console.log(obj);
});
