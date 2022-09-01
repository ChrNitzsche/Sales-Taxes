/* ##### Definitions ##### */
const errorNoItems = "Can't create a receipt due to no items in shopping basket!";
const taxes = 0.1;
const importTaxes = 0.05;

const itemsOfNoTaxes = ['book', 'pill', 'chocolate'];
let shoppingBaskets = [
    [
        '1 book at 12.49',
        '1 music CD at 14.99',
        '1 chocolate bar at 0.85'
    ],
    [
        '1 imported box of chocolates at 10.00',
        '1 imported bottle of perfume at 47.50'
    ],
    [
        '1 imported bottle of perfume at 27.99',
        '1 bottle of perfume at 18.99',
        '1 packet of headache pills at 9.75',
        '1 box of imported chocolates at 11.25'
    ],
];

class InputError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InputError';
        this.stack = '';
    }
}
/* ######################################## */


// main_createReceipt_roundUp
// normal Math.round, but if rounded down -> add rounder
const roundUp = (num, rounder = 0.05) => {
    if (num === null) return null;

    var multiplier = 1 / (rounder);
    let roundedNumber = Math.round(num * multiplier) / multiplier;

    if (roundedNumber < num)
        roundedNumber = roundedNumber + rounder;

    return roundedNumber;
}


// main_createReceipt_calcTaxAmount
// #1 check, if there's really an item to tax -> if not: null
// #2 check, if is imported -> if yes: tax = 5% = 0.05
// #3 check, if item is part of of the list of not-to-be-taxed-items -> if not: tax = 10% = 0.1
const calcTaxAmount = (item, itemsOfNoTaxes) => {
    if (!item || item.length === 0) return null;

    let itemTaxRate = 0;
    if (item.indexOf('imported') !== -1)
        itemTaxRate = importTaxes;

    if (!itemsOfNoTaxes || itemsOfNoTaxes.filter(res => item.indexOf(res) !== -1).length === 0)
        itemTaxRate = itemTaxRate + taxes;

    return itemTaxRate; /* at this point: itemTaxRate = 0 || 0.1 || 0.15 */
}


// main_createReceipt
/* #1 Empty Basket?
 * #2 check every Item -> a) getValue   b) taxValue
 * #3 add taxes to itemValue   and   count receiptValues 
 * #4 */
const createReceipt = (basket = []) => {
    if (!basket || basket === [])
        throw new InputError(errorNoItems);
    let output = [];
    let receiptValue = 0;
    let receiptTaxes = 0;

    basket.map((basketItem) => {

        if ((basketItem.trim())) {
            let itemValue;
            let taxValue;

            const itemSplitted = basketItem.split(' ');
            itemValue = itemSplitted[itemSplitted.length - 1] * 1; // get value of current Item
            if (isNaN(itemValue))
                throw new InputError(`No price found >> "${basketItem}"`);
            taxValue = roundUp(calcTaxAmount(basketItem, itemsOfNoTaxes) * itemValue); // can't be null

            // set all important Values
            itemValue += taxValue;
            receiptValue += itemValue;
            receiptTaxes += taxValue;

            // Output items of basket
            output = [...output, basketItem.split(' at ')[0] + ': ' + itemValue.toFixed(2)];
        }

    });

    // Output Taxes on Receipt
    if (output.length === 0) {
        throw new InputError(errorNoItems);
    } else {
        output = [
            ...output,
            `Sales taxes: ${receiptTaxes.toFixed(2)}`,
            `Total: ${receiptValue.toFixed(2)}`
        ];
    }
    return output;
}


// main
const printReceipt = (basket) => {
    let receipt = createReceipt(basket);
    receipt.map(item => console.log(item));
}


// init
shoppingBaskets.forEach(el => {
    printReceipt(el);
    console.log('');
});



exports.roundUp = roundUp;
exports.calcTaxAmount = calcTaxAmount;
exports.itemsOfNoTaxes = itemsOfNoTaxes;
exports.createReceipt = createReceipt;
exports.shoppingBaskets = shoppingBaskets;