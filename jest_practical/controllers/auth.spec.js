const { join, login, logout, localCallback } = require("./auth.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const passport = require("passport");

describe("join", () => {
    test("Email이 없으면 Email이 없다면 Frontend로 no_email 에러를 QueryString으로 보낸다.", async () => {
        const req = {
            body: {
                email: "",
                password: "password",
                nick: "동붕이",
            },
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = () => {};
        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith("/join?error=no_email");
    });

    test("Nickname이 없으면 Nickname이 없다면 Frontend로 no_nick 에러를 QueryString으로 보낸다.", async () => {
        const req = {
            body: {
                email: "dongyoon@email.com",
                password: "password",
                nick: "",
            },
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = () => {};
        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith("/join?error=no_nick");
    });

    test("password가 없으면 password가 없다면 Frontend로 no_password 에러를 QueryString으로 보낸다.", async () => {
        const req = {
            body: {
                email: "dongyoon@email.com",
                password: "",
                nick: "동붕이",
            },
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = () => {};
        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith("/join?error=no_password");
    });

    test("이미 가입한 이메일이라면 에러를 응답한다.", async () => {
        const req = {
            body: {
                email: "dongyoon@email.com",
                password: "password",
                nick: "동붕이",
            },
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = () => {};
        jest.spyOn(User, "findOne").mockResolvedValue({ id: 1 });
        jest.spyOn(User, "create").mockImplementation();

        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith("/join?error=exist");
        expect(User.create).not.toHaveBeenCalled();
    });

    test("회원가입 도중에 에러가 발생하면 에러를 응답한다.", async () => {
        const req = {
            body: {
                email: "dongyoon@email.com",
                password: "password",
                nick: "동붕이",
            },
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = jest.fn();
        const error = new Error();

        jest.spyOn(User, "findOne").mockRejectedValue(error);
        jest.spyOn(User, "create").mockImplementation();

        await join(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
        expect(User.create).not.toHaveBeenCalled();
    });

    test("이미 가입한 이메일이 아니면 회원가입을 진행한다. (암호화 후 DB 저장)", async () => {
        const req = {
            body: {
                email: "dongyoon@email.com",
                password: "password",
                nick: "동붕이",
            },
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = jest.fn();

        jest.spyOn(User, "findOne").mockResolvedValue(null);
        jest.spyOn(User, "create").mockImplementation();
        jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed");

        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith("/");
        expect(User.create).toHaveBeenCalledWith({
            email: "dongyoon@email.com",
            password: "hashed",
            nick: "동붕이",
        });
    });
});

describe("login", () => {
    test("로그인 함수는 passport.authenticate 함수를 실행한다.", () => {
        jest.spyOn(passport, "authenticate").mockImplementation(() => () => {});
        const req = {};
        const res = {};
        const next = jest.fn();
        login(req, res, next);
        expect(passport.authenticate).toHaveBeenCalledTimes(1);
    });
    test("local 로그인 시 에러가 있으면, 에러처리 함수로 에러를 넘긴다.", () => {
        const authError = new Error();
        const req = {};
        const res = {};
        const next = jest.fn();
        localCallback(req, res, next)(authError);
        expect(next).toHaveBeenCalledWith(authError);
    });
    test("local 로그인 시 에러가 없지만, 유저도 없으면 프론트 QueryString으로 에러를 보낸다.", () => {
        const req = {};
        const res = {
            redirect: jest.fn(),
        };
        const next = jest.fn();
        localCallback(req, res, next)(null, null, { message: "유저 없음" });
        expect(res.redirect).toHaveBeenCalledWith(`/?error=유저 없음`);
    });
    test("local 로그인 성공 후, req.login에서 에러가 생기면 에러처리 함수로 에러를 보낸다.", () => {
        const loginError = new Error();
        const req = {
            login: jest.fn((user, cb) => {
                cb(loginError);
            }),
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = jest.fn();
        localCallback(req, res, next)(null, {}, null);
        expect(req.login).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(loginError);
    });
    test("local 로그인 성공하고 에러가 없다면 / 경로로 이동한다.", () => {
        const req = {
            login: jest.fn((user, cb) => {
                cb();
            }),
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = jest.fn();
        localCallback(req, res, next)(null, {}, null);
        expect(req.login).toHaveBeenCalledTimes(1);
        expect(res.redirect).toHaveBeenCalledWith("/");
        expect(next).not.toHaveBeenCalled;
    });
});

describe("logout", () => {
    test("로그아웃 시에는 req.logout을 호출하고 /로 되돌려보낸다.", () => {
        const req = {
            logout: jest.fn((cb) => {
                cb();
            }),
        };
        const res = {
            redirect: jest.fn(),
        };
        logout(req, res);

        expect(req.logout).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith("/");
    });
});
