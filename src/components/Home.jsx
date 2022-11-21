import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';
import * as api from '../services/api';
import ProductList from './ProductList';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      productList: [],
      search: false,
      categoryId: '',
    };
  }

  componentDidMount() {
    this.inputSearch();
  }

  categoryButton = (categoryId) => {
    this.setState({
      categoryId,
    }, () => this.inputSearch());
  };

  inputChange = ({ target }) => {
    this.setState({
      input: target.value,
    });
  };

  inputSearch = async () => {
    const { input, categoryId } = this.state;
    const result = await api.getProductsFromCategoryAndQuery(categoryId, input);
    this.setState({
      productList: result.results,
    });
  };

  render() {
    const { funcKart } = this.props;
    const { productList, search } = this.state;
    const empty = (search) ? 'Nenhum produto foi encontrado'
      : 'Digite algum termo de pesquisa ou escolha uma categoria.';
    return (
      <div>
        <div className="input-home">
          <label htmlFor="query-input">
            <input
              type="text"
              name="query-input"
              data-testid="query-input"
              onChange={ (event) => this.inputChange(event) }
            />
            <button
              type="button"
              data-testid="query-button"
              className="button-input-home"
              onClick={ () => {
                this.inputSearch();
                this.setState({
                  search: true,
                });
              } }
            >
              Buscar
            </button>
          </label>
        </div>
        <div className="general-container">
          <Category funcCategory={ this.categoryButton } />
          {
            (productList.length <= 0)
              ? (
                <p data-testid="home-initial-message">{ empty }</p>
              )
              : (
                <ul className="product-list">
                  {
                    productList.map((product) => (
                      <li key={ product.id } className="product">
                        <ProductList
                          id={ product.id }
                          title={ product.title }
                          thumbnail={ product.thumbnail }
                          price={ product.price }
                          tags={ product.tags }
                          availableQuantity={ product.available_quantity }
                          shipping={ product.shipping.free_shipping }
                          funcKart={ funcKart }
                        />
                      </li>
                    ))
                  }
                </ul>
              )
          }
        </div>
        {/* <Form /> */}
      </div>
    );
  }
}
Home.propTypes = {
  funcKart: PropTypes.func.isRequired,
};

export default Home;
