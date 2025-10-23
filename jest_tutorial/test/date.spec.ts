import { after3days } from "../src/date";

test("3일 후를 반환한다.", () => {
    jest.useFakeTimers().setSystemTime(new Date(2025, 9, 23));

    expect(after3days()).toStrictEqual(new Date(2025, 9, 26));
});

afterEach(() => {
    console.log("가짜 타이머를 제거한다.");
    jest.useRealTimers();
});
