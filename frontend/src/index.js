import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import Store from './utils/Store'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
	<Provider store={Store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();