import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class PurchasePage extends React.Component {
  state = {
    name: '',
    email: '',
    cpf: '',
    tel: '',
    cep: '',
    logradouro: '',
    number: '',
    bairro: '',
    localidade: '',
    uf: '',
    pagamento: '',
    notDone: false,
  };

  handleGetCep = async () => {
    const { cep } = this.state;
    const address = await api.getAddressByCep(cep);
    const { bairro, logradouro, localidade, uf } = address;
    this.setState({
      bairro,
      logradouro,
      localidade,
      uf,
    });
  };

  handleInputCep = ({ target: { value } }) => {
    const cep = value.replace('-', '');
    this.setState({ cep });
  };

  handleForm = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSaveForm = () => {
    const { history } = this.props;
    const { name, email, cpf, tel, cep, logradouro, pagamento } = this.state;
    const av1 = name === '';
    const av2 = email === '';
    const av3 = cpf === '';
    const av4 = tel === '';
    const av5 = cep === '';
    const av6 = logradouro === '';
    const av7 = pagamento === '';
    if (av1 || av2 || av3 || av4 || av5 || av6 || av7) {
      this.setState({ notDone: true });
    } else {
      localStorage.removeItem('kartInfo');
      localStorage.removeItem('quantity');
      this.setState({
        name: '',
        email: '',
        cpf: '',
        tel: '',
        cep: '',
        logradouro: '',
        number: '',
        bairro: '',
        localidade: '',
        uf: '',
        pagamento: '',
        notDone: false,
      }, () => history.push('/'));
    }
  };

  render() {
    const { kartInfo } = this.props;
    const { name, email, cpf, tel, cep, logradouro, number, bairro, localidade, uf,
      notDone } = this.state;
    return (
      <div>
        <ul>
          {kartInfo.map((pdt) => (
            <li key={ pdt.title }>{ pdt.title }</li>
          ))}
        </ul>
        <form>
          <h3>Informações do Comprador</h3>
          <input
            data-testid="checkout-fullname"
            placeholder="Nome Completo:"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleForm }
          />
          <input
            data-testid="checkout-email"
            placeholder="E-mail:"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleForm }
          />
          <input
            data-testid="checkout-cpf"
            placeholder="CPF:"
            type="text"
            name="cpf"
            value={ cpf }
            onChange={ this.handleForm }
          />
          <input
            data-testid="checkout-phone"
            placeholder="Contato:"
            type="text"
            name="tel"
            value={ tel }
            onChange={ this.handleForm }
          />
          <h5>Endereço de Enterga</h5>
          <input
            data-testid="checkout-cep"
            name="cep"
            onChange={ this.handleInputCep }
            placeholder="CEP:"
            type="text"
            value={ cep }
          />
          <button
            onClick={ this.handleGetCep }
            type="button"
          >
            Pesquisar Cep
          </button>
          <input
            data-testid="checkout-address"
            name="logradouro"
            placeholder="Endereço:"
            type="text"
            value={ logradouro }
            onChange={ this.handleForm }
          />
          <input
            placeholder="Número:"
            type="text"
            name="number"
            value={ number }
            onChange={ this.handleForm }
          />
          <input
            placeholder="Bairro:"
            type="text"
            name="bairro"
            value={ bairro }
            onChange={ this.handleForm }
          />
          <input
            placeholder="Estado:"
            type="text"
            name="localidade"
            value={ localidade }
            onChange={ this.handleForm }
          />
          <input
            placeholder="UF:"
            type="text"
            name="uf"
            value={ uf }
            onChange={ this.handleForm }
          />
          <section>
            <h3> Método de Pagamento</h3>
            <label htmlFor="pagamento">
              Boleto:
              <input
                data-testid="ticket-payment"
                type="radio"
                name="pagamento"
                value="ticket"
                onChange={ this.handleForm }
                id=""
              />
            </label>
            <h5>Cartão de Crédito</h5>
            <label htmlFor="pagamento">
              Visa:
              <input
                data-testid="visa-payment"
                type="radio"
                name="pagamento"
                value="visa"
                onChange={ this.handleForm }
                id=""
              />
            </label>
            <label htmlFor="pagamento">
              MasterCard:
              <input
                data-testid="master-payment"
                type="radio"
                name="pagamento"
                value="master"
                onChange={ this.handleForm }
                id=""
              />
            </label>
            <label htmlFor="pagamento">
              Elo:
              <input
                data-testid="elo-payment"
                type="radio"
                name="pagamento"
                value="elo"
                onChange={ this.handleForm }
                id=""
              />
            </label>
          </section>
        </form>
        <button
          data-testid="checkout-btn"
          type="button"
          onClick={ this.handleSaveForm }
        >
          Finalizar Compra
        </button>
        {notDone ? <p data-testid="error-msg">Campos inválidos</p> : '' }
      </div>
    );
  }
}

PurchasePage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  kartInfo: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};

export default PurchasePage;
