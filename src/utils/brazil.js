
export const getCardBrand = (cardNumber) => {
    // Regular expression patterns for each card brand
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardPattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    const amexPattern = /^3[47][0-9]{13}$/;
    const discoverPattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    const hipercardPattern = /^(606282\d{10}(\d{3})?)|(3841\d{15})$/;
    const eloPattern = /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/;
  
    // Check the card number against each pattern
    if (visaPattern.test(`${cardNumber}`?.replace(/\ /g,''))) {
      return "visa";
    } else if (mastercardPattern.test(cardNumber)) {
      return "mastercard";
    } else if (amexPattern.test(cardNumber)) {
      return "amex";
    } else if (discoverPattern.test(cardNumber)) {
      return "discover";
    } else if (hipercardPattern.test(cardNumber)) {
      return "hipercard";
    } else if (eloPattern.test(cardNumber)) {
      return "elo";
    } else {
      return "Unknown";
    }
} 