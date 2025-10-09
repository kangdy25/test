import { error, customError, CustomError } from "../src/throwFunction";

test("error가 잘 난다", () => {
    expect(() => error()).toThrow(Error);
    expect(() => customError()).toThrow(CustomError);
});

test("error가 잘 난다.(Try/Catch)", () => {
    try {
        error();
    } catch (err) {
        expect(err).toStrictEqual(new Error());
    }
});
