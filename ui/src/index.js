import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import RoomPage from './RoomPage/RoomPage';
import JoinRoomPage from './JoinRoomPage/JoinRoomPage';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <App/> } /> 
          <Route path='/room' element={ <RoomPage /> } />
          <Route path='/join_room' element={ <JoinRoomPage /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
