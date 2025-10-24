beforeEach(() => {
    jest.useFakeTimers();
});

test.only("open handles", () => {
    setInterval(() => {
        console.log("hi");
    });
    expect(1).toBe(1);
});

afterAll(() => {
    jest.clearAllTimers();
});
