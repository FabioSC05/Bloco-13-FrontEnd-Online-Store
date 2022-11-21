import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Kart extends Component {
  render() {
    const { kartInfo, quantity, funcChangeQuant, remove } = this.props;
    const quant = quantity;
    quant.forEach((element, index) => {
      if (element <= 0) {
        quant[index] = 1;
      }
    });
    return (
      <div>
        {
          (kartInfo.length <= 0)
            ? (
              <p
                data-testid="shopping-cart-empty-message"
                className="cart-list"
              >
                Seu carrinho está vazio
              </p>
            )
            : (
              <div>
                <Link to="/PurchasePage">
                  <button type="button" data-testid="checkout-products">
                    Continuar
                  </button>
                </Link>
                <ul className="cart-list">
                  {
                    kartInfo.map((product, index) => (
                      <li key={ index } className="cart-item">
                        <div>
                          <img
                            src={ product.thumbnail }
                            alt={ product.title }
                          />
                          <h4 data-testid="shopping-cart-product-name">
                            {product.title}
                          </h4>
                        </div>
                        <div>
                          <div>
                            <button
                              type="button"
                              onClick={ () => {
                                if (quant[index]
                                  && quant[index] >= 0) {
                                  quant[index] -= 1;
                                  funcChangeQuant(quant);
                                }
                              } }
                              data-testid="product-decrease-quantity"
                            >
                              -
                            </button>
                            <p data-testid="shopping-cart-product-quantity">
                              {quant[index]}
                            </p>
                            <button
                              type="button"
                              onClick={ () => {
                                if (quant[index]
                                && quant[index] < product.availableQuantity) {
                                  quant[index] += 1;
                                  funcChangeQuant(quant);
                                }
                              } }
                              data-testid="product-increase-quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            data-testid="remove-product"
                            onClick={ () => remove(product.title, index) }
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
        }
      </div>
    );
  }
}

Kart.propTypes = {
  kartInfo: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  quantity: PropTypes.arrayOf(PropTypes.number).isRequired,
  funcChangeQuant: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
