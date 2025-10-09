import { timer } from "../src/callback";

test("타이머 잘 실행되니??", (done) => {
    timer((message: string) => {
        expect(message).toBe("Success!!");
        done();
    });
});
