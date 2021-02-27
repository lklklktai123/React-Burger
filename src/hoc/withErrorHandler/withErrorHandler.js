import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../AuxHight';
const withErrorHandler = (WrappedComponents, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
    }

    componentWillMount() {
      console.log('will mount');
      this.reqinterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resinterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      console.log('will unmount', this.reqinterceptor, this.resinterceptor);
      axios.interceptors.request.eject(this.reqinterceptor);
      axios.interceptors.response.eject(this.resinterceptor);
    }
    errorConfirmHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmHandler}
            style={{ color: 'red' }}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponents {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
