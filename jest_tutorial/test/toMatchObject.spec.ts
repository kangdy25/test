import { testObj } from "../src/toMatchObject";

test("클래스 비교는 toMatchObject로 해야 한다.", () => {
    expect(testObj("hello")).not.toStrictEqual({ a: "hello" });
    expect(testObj("hello")).toMatchObject({ a: "hello" });
});
