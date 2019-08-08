import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

// Middleware
const countChecker = (store) => (next) => (action) => {
	const maxCount = 10;
	next(action);
	if (action.type === 'INCREMENT' && store.getState().counter > maxCount) {
  	fetchCool().then(
    	result => next(setCool(result))
    )
  }
}

// Reducer
const initialState = {
  counter: 0,
  cool: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
      	...state,
        counter: state.counter + 1
      };
    case 'SET_COOL':
    	return {
      	...state,
        cool: action.payload
      }
    default:
      return state;
  }
};

// Action Creators
const increment = () => {
  return { type: 'INCREMENT' }
};

// Action Creators
const fetchCool = () => {
  return new Promise((resolve, reject) => {
  	setTimeout(() => {resolve('Cool man')}, 3000);
  })
};

const setCool = (cool) => {
	return { type: 'SET_COOL', payload: cool }
}

// Component
class App extends React.Component {
  render () {
    return (
      <div>
        <button onClick={this.props.onIncrement}>
          Increment
        </button>
        <p>{this.props.counter}</p>
        {this.props.cool && <p>{this.props.cool}</p>}
      </div>
    )
  }
}

// Store
const store = createStore(
  reducer,
  applyMiddleware(countChecker)
);

const mapStateToProps = (state) => {
	return {
  	counter: state.counter,
    cool: state.cool
  }
};

const mapDispatchToProps = (dispatch) => {
	return {
  	onIncrement() {
    	dispatch(increment());
    }
  }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

// Container component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);