import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  render() {
    const {
      id,
      title,
      price,
      thumbnail,
      funcKart,
      shipping,
      availableQuantity,
    } = this.props;
    const obj = {
      title,
      thumbnail,
      price,
      availableQuantity,
    };

    return (
      <ul
        data-testid="product"
      >
        <Link
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          <img src={ thumbnail } alt={ title } />
          <h4>
            { title }
          </h4>
          <p>
            { `R$ ${price}` }
          </p>
          {
            (shipping)
              ? <p data-testid="free-shipping" className="shipping">Free Shipping</p>
              : <> </>
          }
        </Link>
        <button
          type="button"
          onClick={ () => funcKart(obj, 1) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </ul>
    );
  }
}

ProductList.propTypes = {
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  funcKart: PropTypes.func.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  shipping: PropTypes.bool.isRequired,
};
