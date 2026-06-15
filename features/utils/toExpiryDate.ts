export function toexpiry(date:string) {
    if (!date) return '0000';
    const [year, month] = date.split("-");
    console.log(month)
    console.log(year.slice(2))

    return `${month}${year.slice(2)}`
}