export function timer(callback) {
    setTimeout(() => {
        callback("Success!!");
    }, 10_000);
}
