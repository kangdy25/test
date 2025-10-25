const { isLoggedIn, isNotLoggedIn } = require("./");

describe("isLoggedIn", () => {
    // req.isAuthenticated => true를 반환하는 경우
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
        expect(next).toHaveBeenCalledTimes(1);
    });

    // req.isAuthenticated => false를 반환하는 경우
    test("로그인을 안 한 상태이면 403 '로그인 필요'를 응답한다.", () => {
        const req = {
            isAuthenticated() {
                // 로그인을 안 한 상태면 false를 반환
                return false;
            },
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const next = jest.fn();
        isLoggedIn(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith("로그인 필요");
    });
});

describe("isNotLoggedIn", () => {
    // req.isAuthenticated => false를 반환하는 경우
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
        expect(next).toHaveBeenCalledTimes(1);
    });

    // req.isAuthenticated => true를 반환하는 경우
    test("로그인을 했으면 next를 호출한다.", () => {
        const req = {
            isAuthenticated() {
                // 로그인을 한 상태면 true를 반환
                return true;
            },
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = jest.fn();
        isNotLoggedIn(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith(
            `/?error=${encodeURIComponent("로그인한 상태입니다.")}`
        );
    });
});
