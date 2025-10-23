import { okPromise, okAsync, noAsync, noPromise } from "../src/asyncFunction";
import * as fns from "../src/asyncFunction";

// -------------------------------------
// okPromise 테스트
// -------------------------------------
test("okPromise 테스트1", () => {
    expect.assertions(1);
    const okSpy = jest.fn(okPromise);
    return expect(okSpy()).resolves.toBe("ok");
});

test("okPromise 테스트2", () => {
    expect.assertions(1);
    const okSpy = jest.fn(okPromise);
    return okSpy().then((result) => {
        expect(result).toBe("ok");
    });
});

test("okPromise 테스트3", async () => {
    expect.assertions(1);
    const okSpy = jest.fn(okPromise);
    const result = await okSpy();
    expect(result).toBe("ok");
});

test("okPromise 테스트 - 스파이 심기", () => {
    expect.assertions(1);
    jest.spyOn(fns, "okPromise").mockResolvedValue("ok");
    return expect(fns.okPromise()).resolves.toBe("ok");
});

// -------------------------------------
// noPromise 테스트
// -------------------------------------
test("noPromise 테스트1", () => {
    const noSpy = jest.fn(noPromise);
    return noSpy().catch((result) => {
        expect(result).toBe("no");
    });
});

test("noPromise 테스트2", () => {
    const noSpy = jest.fn(noPromise);
    return expect(noSpy()).rejects.toBe("no");
});

test("noPromise 테스트3", async () => {
    const noSpy = jest.fn(noPromise);
    try {
        const result = await noSpy();
    } catch (err) {
        expect(err).toBe("no");
    }
});

test("noPromise 테스트 - 스파이 심기", () => {
    jest.spyOn(fns, "noPromise").mockRejectedValue("no");
    return expect(fns.noPromise()).rejects.toBe("no");
});

// -------------------------------------
// okAsync 테스트
// -------------------------------------
test("okAsync 테스트1", () => {
    expect.assertions(1);
    const okSpy = jest.fn(okAsync);
    return expect(okSpy()).resolves.toBe("ok");
});

test("okAsync 테스트2", () => {
    expect.assertions(1);
    const okSpy = jest.fn(okAsync);
    return okSpy().then((result) => {
        expect(result).toBe("ok");
    });
});

test("okAsync 테스트3", async () => {
    expect.assertions(1);
    const okSpy = jest.fn(okAsync);
    const result = await okSpy();
    expect(result).toBe("ok");
});

// -------------------------------------
// noAsync테스트
// -------------------------------------
test("noAsync 테스트1", () => {
    const noSpy = jest.fn(noAsync);
    return noSpy().catch((result) => {
        expect(result).toBe("no");
    });
});

test("noAsync 테스트2", () => {
    const noSpy = jest.fn(noAsync);
    return expect(noSpy()).rejects.toBe("no");
});

test("noAsync 테스트3", async () => {
    expect.assertions(1);
    const noSpy = jest.fn(noAsync);
    try {
        const result = await noSpy();
    } catch (err) {
        expect(err).toBe("no");
    }
});
