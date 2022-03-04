export const groupBy = function (xs: any, key: string) {


    return xs.map((item: any) => {
        const itemDate = new Date(item?.date);
        const fomatedDate = `${itemDate.getMonth() + 1}/${itemDate.getFullYear()}`;

        return {
            ...item,
            date: fomatedDate
        }
    }).reduce(function (rv: any, x: any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
