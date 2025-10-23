import { timer } from "../src/callback";

test("타이머 잘 실행되니??", (done) => {
    timer((message: string) => {
        expect(message).toBe("Success!!");
        done();
    });
});

test("시간의 지배자!!", (done) => {
    expect.assertions(1);
    jest.useFakeTimers();
    timer((message: string) => {
        expect(message).toBe("Success!!");
        done();
    });
    // jest.runAllTimers();
    jest.advanceTimersByTime(10_000); // 10초 흐르게
});
