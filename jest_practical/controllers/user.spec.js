const User = require("../models/user");
const { follow } = require("./user");

describe("follow", () => {
    test("유저 조회 시 에러가 나면 에러처리 함수를 호출한다.", async () => {
        const error = new Error();
        jest.spyOn(User, "findOne").mockRejectedValue(error);

        const next = jest.fn();
        await follow({ user: {} }, {}, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    test("유저가 존재하면 success를 응답한다.", async () => {
        const user = { id: 1, addFollowing: jest.fn() };
        jest.spyOn(User, "findOne").mockResolvedValue(user);

        const req = {
            user: { id: 1 },
            params: { id: 2 },
        };
        const res = {
            status: jest.fn(),
            send: jest.fn(),
        };
        const next = jest.fn();
        await follow(req, res, next);

        expect(res.send).toHaveBeenCalledWith("success");
        expect(user.addFollowing).toHaveBeenCalledWith(2);
        expect(res.status).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test("유저가 존재하지 않으면 404 no user'를 응답한다.", async () => {
        jest.spyOn(User, "findOne").mockResolvedValue(null);

        const req = {
            user: { id: 1 },
            params: { id: 2 },
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        const next = jest.fn();
        await follow(req, res, next);

        expect(res.send).toHaveBeenCalledWith("no user");
        expect(res.status).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});
