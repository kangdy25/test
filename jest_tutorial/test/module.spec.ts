import { obj } from "../src/module";
import axios from "axios";

jest.mock("axios");

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
    console.log(obj);
});

test("axios를 모두 모킹", () => {
    console.log(axios);
});
