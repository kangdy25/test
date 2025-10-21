import { obj } from "../src/mockFunction";

test("Spy 함수를 심고 제거하는 일련의 과정 테스트", () => {
    const spyFn = jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
    const result = obj.minus(10, 8);

    expect(result).toBe(18);
    spyFn.mockClear(); // Times, With 초기화
    spyFn.mockReset(); // mockClear + mockImplementation(() => {})
    spyFn.mockRestore(); // 전부 초기화
});
