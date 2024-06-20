export default class Account {
    constructor(cardNumber, expiryDate, ccv, holderName) {
        this.cardNumber = cardNumber
        this.expiryDate = expiryDate
        this.ccv = ccv
        this.holderName = holderName
    }
}