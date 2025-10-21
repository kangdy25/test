import { obj } from "../src/mockFunction";

test("Spy 함수를 심고 제거하는 일련의 과정 테스트", () => {
    jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
    const result = obj.minus(10, 8);

    expect(result).toBe(18);
});

beforeAll(() => {
    console.log("이 파일의 준비사항을 실행한다.");
});

beforeEach(() => {
    console.log("각 테스트 전에 실행된다.");
});

afterEach(() => {
    console.log("각 테스트 후에 실행된다.");
    jest.clearAllMocks(); // Times, With 초기화
    jest.resetAllMocks(); // mockClear + mockImplementation(() => {})
    jest.restoreAllMocks(); // 전부 초기화
});

afterAll(() => {
    console.log("모든 테스트가 끝난 후에 실행된다.");
});
