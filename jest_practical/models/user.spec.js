const User = require("./user");

describe("User", () => {
    test("initiate가 정상 작동한다.", () => {
        const fn = jest.spyOn(User, "init").mockImplementation();
        User.initiate({});
        expect(fn).toHaveBeenCalledTimes(1);
    });
    test("associate가 정상 작동한다.", () => {
        const db = {
            User: {
                hasMany: jest.fn(),
                belongsToMany: jest.fn(),
            },
        };
        User.associate(db);
        expect(db.User.hasMany).toHaveBeenCalledTimes(1);
        expect(db.User.belongsToMany).toHaveBeenCalledTimes(2);
    });
});
