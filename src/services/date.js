export function parseToUnixTimestap(date) {
    return ~~(+date / 1000);
}

export function parseOfUnixTimestap(date) {
    return new Date(date * 1000);
}
