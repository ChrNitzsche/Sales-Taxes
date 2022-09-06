const { roundUp } = require('../index');

describe("RoundUp to 0.05", () => {
    it("Test the 0 and null", () => {
        expect(roundUp(0)).toEqual(0);
        expect(roundUp(null)).toBeNull;
    });

    it("Test positive Values", () => {
        expect(roundUp(1)).toEqual(1);
        expect(roundUp(0.9999999999999)).toEqual(1);
        expect(roundUp(0.0000000000000000000000001)).toEqual(0.05);
    });

    it("Test negative Values", () => {
        expect(roundUp(-0.04)).toEqual(0);
        expect(roundUp(-0.06)).toEqual(-0.05);
        expect(roundUp(-0.00001)).toBeCloseTo(0);
    });
});