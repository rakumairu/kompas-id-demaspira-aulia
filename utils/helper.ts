export function convertNumber(number: string, prefix?: string, with_decimal?: boolean) {
    let numberString = '';
    let decimal = '';

    //With Decimal
    if (with_decimal) {
        number = Number(number).toFixed(2);

        const exploded_number = number.split(".");
        numberString = parseInt(exploded_number[0].replace(/[^,\d]/g, '')).toString();
        decimal = typeof exploded_number[1] !== 'undefined' ? exploded_number[1] : "";
    } else {
        numberString = parseInt(number.replace(/[^,\d]/g, '')).toString();
    }

    const split = numberString.split(',')
    const sisa = split[0].length % 3
    let rupiah = split[0].substr(0, sisa)
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi)

    if (ribuan) {
        const separator = sisa ? '.' : ''
        rupiah = rupiah + separator + ribuan.join('.')
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
    let output = prefix ? prefix : ''

    if (with_decimal) {
        return rupiah ? `${output}${rupiah},${decimal}` : '';
    } else {
        return rupiah ? output + rupiah : ''
    }
}

export function inputNumber(number: string) {
    const numberString = number.replace(/[^,\d]/g, '').toString()
    return numberString ? numberString : ''
}