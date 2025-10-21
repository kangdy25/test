import { obj } from "../src/mockFunction";
import { testObj } from "../src/toMatchObject";

describe("Before/After Each 적용", () => {
    beforeEach(() => {
        console.log("각 테스트 전에 실행된다.");
    });

    afterEach(() => {
        console.log("각 테스트 후에 실행된다.");
        jest.clearAllMocks(); // Times, With 초기화
        jest.resetAllMocks(); // mockClear + mockImplementation(() => {})
        jest.restoreAllMocks(); // 전부 초기화
    });

    test("Spy 함수를 심고 제거하는 일련의 과정 테스트", () => {
        jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
        const result = obj.minus(10, 8);

        expect(result).toBe(18);
    });
});

describe("Before/After All 적용", () => {
    beforeAll(() => {
        console.log("이 파일의 준비사항을 실행한다.");
    });

    afterAll(() => {
        console.log("모든 테스트가 끝난 후에 실행된다.");
    });

    test("클래스 비교는 toMatchObject로 해야 한다.", () => {
        expect(testObj("hello")).not.toStrictEqual({ a: "hello" });
        expect(testObj("hello")).toMatchObject({ a: "hello" });
    });
});
