const { isLoggedIn, isNotLoggedIn } = require("./");

describe("isLoggedIn", () => {
    test("로그인을 했으면 next를 호출한다.", () => {
        const req = {
            isAuthenticated() {
                // 로그인을 한 상태면 true를 반환
                return true;
            },
        };
        const res = {};
        const next = jest.fn();
        isLoggedIn(req, res, next);
        expect(next).toHaveBeenCalledTimes(0);
    });
});

describe("isNotLoggedIn", () => {
    test("로그인을 안 했으면 next를 호출한다.", () => {
        const req = {
            isAuthenticated() {
                // 로그인을 한 상태면 false를 반환
                return false;
            },
        };
        const res = {};
        const next = jest.fn();
        isNotLoggedIn(req, res, next);
        expect(next).toHaveBeenCalledTimes(0);
    });
});
