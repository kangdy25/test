import { sum, obj } from "../src/toHaveBeenCalled";

// toHaveBeenCalled 메서드는 실제 테스트에서 의미 없는 경우가 많다.
test("sum 함수가 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalled();
});

// fn만 사용하면 원본은 유지된다. (spy 함수 생성)
test("sum 함수가 1번 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 4);
    expect(sumSpy).toHaveBeenCalledTimes(1);
});

test("sum 함수가 1, 2와 함께 호출되었다.", () => {
    const sumSpy = jest.fn(sum);
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalledWith(1, 2);
});

// spyOn을 사용하면 object.minus가 변형된다. (spy 삽입)
test("obj.minus 함수가 1번 호출되었다.", () => {
    jest.spyOn(obj, "minus");
    const result = obj.minus(10, 8);
    console.log(obj.minus);

    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(2);
});
