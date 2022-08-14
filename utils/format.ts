export function format_number_2_digit(num: number) {
    return num.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
}