export function format_number_2_digit(num: number) {
    return num.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
}

export function truncate(str: string, n: number) {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
}

export function parseIntT(str: any) : number {
    let strS = !str ? "0" : str;
    return parseInt(strS, 10);
}
