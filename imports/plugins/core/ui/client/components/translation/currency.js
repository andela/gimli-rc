import React, { Component, PropTypes, Children } from "react"; // eslint-disable-line

class Currency extends Component {
  constructor(props) {
    super(props);
    this.formatPrice = this.formatPrice.bind(this);
  }
  formatPrice(prices) {
    let realPrice;
    let discountedPrice;
    let price;
    if (typeof prices === "number") {
      price = prices.toString();
      realPrice = parseFloat(price).toFixed(2);
      discountedPrice = ((realPrice - (realPrice * 0.13)).toFixed(2)).toLocaleString();
      realPrice = realPrice.toLocaleString();
      return {
        realPrice,
        discountedPrice
      };
    }
    price = prices.toString();
    realPrice = parseFloat(price.split(" ")[2]);
    discountedPrice = (realPrice - (realPrice * 0.13).toFixed(2)).toLocaleString();
    realPrice = realPrice.toLocaleString();
    return {
      realPrice,
      discountedPrice
    };
  }
  render() {
    const { realPrice, discountedPrice } = this.formatPrice(this.props.amount);
    return (
      <div>
        <p className="discountPrice" itemProp="price">₦{discountedPrice}</p>
        <p className="realPrice" itemProp="price"><span>₦{realPrice}</span> <span>-13%</span></p>
      </div>
    );
  }
}

Currency.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Currency;
