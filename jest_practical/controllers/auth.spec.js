const { join, login, logout } = require("./auth.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

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
