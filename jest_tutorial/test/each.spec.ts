test.each([
    [1, 1, 2],
    [2, 3, 5],
    [3, 4, 7],
])("%i 더하기 %i는 %i", (a, b, c) => {
    expect(a + b).toBe(c);
});

test.each([
    { a: 1, b: 1, c: 2 },
    { a: 2, b: 3, c: 5 },
    { a: 3, b: 4, c: 7 },
])("$i 더하기 $i는 $i", ({ a, b, c }) => {
    expect(a + b).toBe(c);
});
