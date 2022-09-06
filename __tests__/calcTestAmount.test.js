const { calcTaxAmount, itemsOfNoTaxes } = require('../index');

describe("calcTaxAmount", () => {
    it("empty or null Items", () => {
        expect(calcTaxAmount(null, itemsOfNoTaxes)).toBeNull();
        expect(calcTaxAmount('', itemsOfNoTaxes)).toEqual(null);
    });
    it("empty or null Array", () => {
        expect(calcTaxAmount('1 chocolate bar at 0.85', [])).toEqual(0.1);
        expect(calcTaxAmount('1 chocolate bar at 0.85', null)).toEqual(0.1);
    });


    it("#1", () => {
        expect(calcTaxAmount('1 book at 12.49', itemsOfNoTaxes)).toEqual(0);
        expect(calcTaxAmount('1 music CD at 14.99', itemsOfNoTaxes)).toEqual(0.1);
        expect(calcTaxAmount('1 chocolate bar at 0.85', itemsOfNoTaxes)).toEqual(0);
    });
    it("#2", () => {
        expect(calcTaxAmount('1 imported box of chocolates at 10.00', itemsOfNoTaxes)).toEqual(0.05);
        expect(calcTaxAmount('1 imported bottle of perfume at 47.50', itemsOfNoTaxes)).toBeCloseTo(0.15);
    });
    it("#3", () => {
        expect(calcTaxAmount('1 imported bottle of perfume at 27.99', itemsOfNoTaxes)).toBeCloseTo(0.15);
        expect(calcTaxAmount('1 bottle of perfume at 18.99', itemsOfNoTaxes)).toEqual(0.1);
        expect(calcTaxAmount('1 packet of headache pills at 9.75', itemsOfNoTaxes)).toEqual(0);
        expect(calcTaxAmount('1 box of imported chocolates at 11.25', itemsOfNoTaxes)).toEqual(0.05);
    });
});