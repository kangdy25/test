jest.mock("../models");

const {
    renderProfile,
    renderJoin,
    renderMain,
    renderHashtag,
} = require("./page");
const { Post, Hashtag } = require("../models");

test("renderProfile은 res.render profile을 호출해야 한다.", () => {
    const req = {};
    const res = {
        render: jest.fn(),
    };
    renderProfile(req, res);
    expect(res.render).toHaveBeenCalledWith("profile", {
        title: "내 정보 - NodeBird",
    });
});

test("renderJoin은 res.render profile을 호출해야 한다.", () => {
    const req = {};
    const res = {
        render: jest.fn(),
    };
    renderJoin(req, res);
    expect(res.render).toHaveBeenCalledWith("join", {
        title: "회원가입 - NodeBird",
    });
});

describe("renderMain", () => {
    test("게시글 조회 시 에러가 발생하면 에러처리 함수로 에러를 넘긴다.", async () => {
        const error = new Error();
        jest.spyOn(Post, "findAll").mockRejectedValue(error);
        const res = {
            render: jest.fn(),
        };
        const next = jest.fn();
        await renderMain({}, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
    test("게시글 조회한 것을 res.render로 화면에 렌더링한다.", async () => {
        jest.spyOn(Post, "findAll").mockResolvedValue([{ id: 1 }, { id: 2 }]);
        const res = {
            render: jest.fn(),
        };
        const next = jest.fn();
        await renderMain({}, res, next);

        expect(res.render).toHaveBeenCalledWith("main", {
            title: "NodeBird",
            twits: [{ id: 1 }, { id: 2 }],
        });
        expect(next).not.toHaveBeenCalled();
    });
});

describe("renderHashtag", () => {
    test("해시태그 Querystring이 없으면 /로 돌려보낸다.", async () => {
        const res = {
            render: jest.fn(),
            redirect: jest.fn(),
        };
        const next = jest.fn();
        await renderHashtag({ query: {} }, res, next);

        expect(res.render).not.toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith("/");
        expect(next).not.toHaveBeenCalled();
    });
    test("해시태그 Querystring이 있지만 DB에 해시태그가 없으면 빈 화면을 렌더링한다.", async () => {
        const res = {
            render: jest.fn(),
            redirect: jest.fn(),
        };
        const next = jest.fn();
        jest.spyOn(Hashtag, "findOne").mockResolvedValue(null);
        await renderHashtag({ query: { hashtag: "냥이" } }, res, next);

        expect(res.render).toHaveBeenCalledWith("main", {
            title: `냥이 | NodeBird`,
            twits: [],
        });
        expect(next).not.toHaveBeenCalled();
        expect(res.redirect).not.toHaveBeenCalled();
    });
    test("해시태그 Querystring이 있고 DB에도 해시태그가 있으면 게시글을 렌더링한다.", async () => {
        const res = {
            render: jest.fn(),
            redirect: jest.fn(),
        };
        const next = jest.fn();
        jest.spyOn(Hashtag, "findOne").mockResolvedValue({
            id: 5,
            getPosts: () => [{ id: 1 }, { id: 2 }],
        });
        await renderHashtag({ query: { hashtag: "냥이" } }, res, next);

        expect(res.render).toHaveBeenCalledWith("main", {
            title: `냥이 | NodeBird`,
            twits: [{ id: 1 }, { id: 2 }],
        });
        expect(next).not.toHaveBeenCalled();
        expect(res.redirect).not.toHaveBeenCalled();
    });
    test("해시태그 Querystring이 있으나 DB에서 findOne할 때 에러가 나면 에러처리 함수를 호출한다.", async () => {
        const error = new Error();
        const res = {
            render: jest.fn(),
            redirect: jest.fn(),
        };
        const next = jest.fn();
        jest.spyOn(Hashtag, "findOne").mockRejectedValue(error);
        await renderHashtag({ query: { hashtag: "냥이" } }, res, next);

        expect(res.render).not.toHaveBeenCalled();
        expect(res.redirect).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(error);
    });
});
