// import React, { Component } from 'react';
// import Modal from '../../components/UI/Modal/Modal';
// import Aux from '../AuxHight';
// const withErrorHandler = (WrappedComponents, axios) => {
//   return class extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         error: null,
//       };
//     }

//     componentWillMount() {
//       console.log('will mount');
//       this.a = axios.interceptors.request.use(req => {
//         this.setState({ error: null });
//         return req;
//       });
//       this.b = axios.interceptors.response.use(
//         res => res,
//         error => {
//           this.setState({ error: error });
//         }
//       );
//     }
//     componentWillUnmount() {
//       console.log('will unmount', this.a, this.b);
//       axios.interceptors.request.eject(this.a);
//       axios.interceptors.response.eject(this.b);
//     }
//     errorConfirmHandler = () => {
//       this.setState({ error: null });
//     };
//     render() {
//       return (
//         <Aux>
//           <Modal
//             show={this.state.error}
//             modalClosed={this.errorConfirmHandler}
//             style={{ color: 'red' }}
//           >
//             {this.state.error ? this.state.error.message : null}
//           </Modal>
//           <WrappedComponents {...this.props} />
//         </Aux>
//       );
//     }
//   };
// };
// export default withErrorHandler;
import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
// import Aux from '../AuxHight';
import useHttpErrorHandler from '../../hooks/http-error-handler';
const withErrorHandler = (WrappedComponents, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler();

    return (
      <React.Fragment>
        <Modal show={error} modalClosed={clearError} style={{ color: 'red' }}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponents {...props} />
      </React.Fragment>
    );
  };
};
export default withErrorHandler;
