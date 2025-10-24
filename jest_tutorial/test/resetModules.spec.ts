beforeEach(() => {
    jest.resetModules();
});

test("first import", async () => {
    const c = await import("../src/mockClass");
    (c as any).prop = "hello";
    expect(c).toBeDefined();
});

test.only("second import", async () => {
    const c = await import("../src/mockClass");
    expect((c as any).prop).toBe("hello");
});
