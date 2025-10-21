import { obj } from "../src/mockFunction";

test("obj.minus 함수에 스파이를 심고 리턴값을 몰래 바꾸도록", () => {
    jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
    const result = obj.minus(10, 8);

    expect(result).toBe(18);
});

test.skip("Mock 함수가 가짜 행동을 단 한 번 수행하도록", () => {
    jest.spyOn(obj, "minus")
        .mockImplementationOnce((a, b) => a + b)
        .mockImplementationOnce(() => 5)
        .mockImplementationOnce(() => 2);
    const result1 = obj.minus(10, 8);
    const result2 = obj.minus(10, 8);
    const result3 = obj.minus(10, 8);

    expect(obj.minus).toHaveBeenCalledTimes(4);
    expect(result1).toBe(18);
    expect(result2).toBe(5);
    expect(result3).toBe(2);
});

test.todo("나중에 만들어야징~~");

describe.skip("이것도 스킵 가능", () => {
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
