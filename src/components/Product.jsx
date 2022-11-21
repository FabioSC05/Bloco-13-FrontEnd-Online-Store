import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as api from '../services/api';
import Form from './Form';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addToKart: '1',
      response: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await api.getProductById(id);
    this.setState({
      response,
      loading: false,
    });
  }

  handleInputChange = (event) => {
    this.setState({
      addToKart: event.target.value,
    });
  };

  render() {
    const { response, loading } = this.state;
    const { price, thumbnail, title, tags } = response;
    const availableQuantity = response.available_quantity;
    const { match: { params: { id } } } = this.props;
    const { func } = this.props;
    const { addToKart } = this.state;
    const obj = {
      title,
      thumbnail,
      price,
      availableQuantity,
    };

    return (
      <div>
        <div>
          <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        </div>
        <div>
          {
            (loading)
              ? <h3>Carregando...</h3>
              : tags.map((elem, index) => <li key={ index }>{elem}</li>)
          }
        </div>
        <h2 data-testid="product-detail-name">{ title }</h2>
        <p data-testid="product-detail-price">
          { `R$ ${price}` }
        </p>
        <div>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => func(obj, parseFloat(addToKart)) }
          >
            Adicionar ao Carrinho
          </button>
          <input
            type="number"
            data-testid="shopping-cart-product-quantity"
            value={ addToKart }
            onChange={ (event) => this.handleInputChange(event) }
          />
        </div>
        <div>
          <Form id={ id } />
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  func: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
