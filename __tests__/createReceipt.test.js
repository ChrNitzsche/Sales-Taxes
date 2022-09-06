const { createReceipt, shoppingBaskets } = require('../index');

const falsePriceInBasket = [
    '1 imported bottle of perfume: 32.19',
    '1 bottle of perfume: 20.89f',
    '1 packet of headache pills: 9.75',
    '1 box of imported chocolates: 11.85'
];

const emptyLinesInBasket = [
    '',
    '1 imported bottle of perfume at 27.99',
    '    ',
    '',
    '1 bottle of perfume at 18.99',
    '1 packet of headache pills at 9.75',
    '',
    '1 box of imported chocolates at 11.25',
    '     '
];

describe("create Receipt", () => {
    const errorNoItem = "Can't create a receipt due to no items in shopping basket!";
    it("Run empty basket", () => {
        expect(() => createReceipt()).toThrow(errorNoItem);
        expect(() => createReceipt(null)).toThrow(errorNoItem);
        expect(() => createReceipt([])).toThrow(errorNoItem);
    });

    it("Test fake/empty Items", () => {
        expect(() => createReceipt([''])).toThrow(errorNoItem);
        expect(() => createReceipt(['', '', ' ', '   ', ''])).toThrow(errorNoItem);
    });



    it("Receipt #1", () => {
        expect(createReceipt(shoppingBaskets[0])).toEqual([
            '1 book: 12.49',
            '1 music CD: 16.49',
            '1 chocolate bar: 0.85',
            'Sales taxes: 1.50',
            'Total: 29.83'
        ]);
    });

    it("Receipt #2", () => {
        expect(createReceipt(shoppingBaskets[1])).toEqual([
            '1 imported box of chocolates: 10.50',
            '1 imported bottle of perfume: 54.65',
            'Sales taxes: 7.65',
            'Total: 65.15'
        ]);
    });

    it("Receipt #3", () => {
        expect(createReceipt(shoppingBaskets[2])).toEqual([
            '1 imported bottle of perfume: 32.19',
            '1 bottle of perfume: 20.89',
            '1 packet of headache pills: 9.75',
            '1 box of imported chocolates: 11.85',
            'Sales taxes: 6.70',
            'Total: 74.68'
        ]);
    });

    it("Throw Error on Receipt #3", () => {
        expect(() => createReceipt(falsePriceInBasket)).toThrow();
    });

    it("Receipt #3 with Spaces", () => {
        expect(createReceipt(emptyLinesInBasket)).toEqual([
            '1 imported bottle of perfume: 32.19',
            '1 bottle of perfume: 20.89',
            '1 packet of headache pills: 9.75',
            '1 box of imported chocolates: 11.85',
            'Sales taxes: 6.70',
            'Total: 74.68'
        ]);
    });
});