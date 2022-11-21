import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }

  componentDidMount() {
    this.getCategory();
  }

  getCategory = async () => {
    this.setState({
      response: await api.getCategories(),
    });
  };

  render() {
    const { response } = this.state;
    const { funcCategory } = this.props;
    return (
      <section className="categories">
        {
          response.map((obj) => (
            <label
              htmlFor="category"
              data-testid="category"
              key={ obj.name }
              name="category"
            >
              <button
                type="button"
                name="category"
                className="category-button"
                onClick={ () => funcCategory(obj.id) }
              >
                { obj.name }
              </button>
            </label>
          ))
        }
      </section>
    );
  }
}

Category.propTypes = {
  funcCategory: PropTypes.func.isRequired,
};

export default Category;
