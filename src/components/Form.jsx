import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  state = {
    avaliation: [],
    email: '',
    messageInput: '',
    rating: '',
    unfilled: false,
  };

  componentDidMount() {
    const { id } = this.props;
    const localStorageInfo = JSON.parse(localStorage.getItem(id));
    if (localStorageInfo) {
      this.setState({
        avaliation: localStorageInfo,
      });
    }
  }

  handleForm = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSaveForm = () => {
    const { email, messageInput, rating, avaliation } = this.state;
    const avEmail = email === '';
    const avRating = rating === '';
    const check = avEmail || avRating;
    if (check) {
      this.setState({ unfilled: true });
    } else {
      const objectInformation = { email, messageInput, rating };
      const { id } = this.props;
      if (avaliation) {
        const info = [...avaliation, objectInformation];
        localStorage.setItem(id, JSON.stringify(info));
      } else {
        localStorage.setItem(id, JSON.stringify([objectInformation]));
      }

      this.setState({
        avaliation: [...avaliation, objectInformation],
        unfilled: false,
      }, () => {
        this.setState({
          email: '',
          messageInput: '',
          rating: '',
        });
      });
    }
  };

  render() {
    const { email, messageInput, avaliation, unfilled } = this.state;
    const ARRAY_RATING = ['1', '2', '3', '4', '5'];
    return (
      <div>
        <form>
          <div>
            <label htmlFor="email">
              {' '}
              Email:
              <input
                data-testid="product-detail-email"
                type="email"
                name="email"
                id="email"
                onChange={ this.handleForm }
                placeholder="E-mail"
                value={ email }
              />
            </label>
          </div>

          {ARRAY_RATING.map((number, index) => (
            <div key={ index }>

              <input
                data-testid={ `${number}-rating` }
                type="radio"
                name="rating"
                onChange={ this.handleForm }
                value={ index + 1 }
                id=""
              />

            </div>
          ))}

          <label htmlFor="input-message">
            {' '}
            Observacão:
            <textarea
              data-testid="product-detail-evaluation"
              type="text"
              name="messageInput"
              id="input-message"
              onChange={ this.handleForm }
              placeholder="Mensagem (opcional)"
              value={ messageInput }
            />
          </label>

          <button
            data-testid="submit-review-btn"
            onClick={ this.handleSaveForm }
            type="button"
          >
            Salvar

          </button>

        </form>
        <section>
          {unfilled ? <p data-testid="error-msg">Campos inválidos</p> : ''}
          {avaliation && avaliation.map((each, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{ each.email }</p>
              <p data-testid="review-card-rating">{ each.rating }</p>
              <span data-testid="review-card-evaluation">{ each.messageInput }</span>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
};
