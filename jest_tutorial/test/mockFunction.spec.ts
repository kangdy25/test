import { obj } from "../src/mockFunction";

test("obj.minus 함수에 스파이를 심고 리턴값을 몰래 바꾸도록", () => {
    jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
    const result = obj.minus(10, 8);

    expect(result).toBe(18);
});

test("Mock 함수가 가짜 행동을 단 한 번 수행하도록", () => {
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

test("MockReturnValue, 함수 자체 변경이 아닌 리턴값만 변경하기", () => {
    jest.spyOn(obj, "minus").mockReturnValueOnce(3).mockReturnValue(5);
    const result1 = obj.minus(10, 8);
    const result2 = obj.minus(10, 8);

    expect(obj.minus).toHaveBeenCalledTimes(6);
    expect(result1).toBe(3);
    expect(result2).toBe(5);
});
