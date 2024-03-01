import { React, ReactDOM, BrowserRouter } from './deps.js';
import App from './App.jsx';

const rootProto = document.getElementById('app') ? document.getElementById('app') : document.getElementById('root');
rootProto.classList.add('root');
const root = ReactDOM.createRoot(rootProto);
root.render(
  <BrowserRouter>
    <React.StrictMode>
        <App/>
    </React.StrictMode>
  </BrowserRouter>
);