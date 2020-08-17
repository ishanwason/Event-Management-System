import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { createEvent } from '@testing-library/react';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from './action/types';
import { setData } from './action';
import Layout from './container/layout'
import { Loader } from './views/loader';

const Login = React.lazy(() => import('./views/login'))

function App() {
  const dispatch = useDispatch();
  // const state = useSelector(state => state)
  // if (!state) {
  //   window.open('http://localhost:3000/login', '_open')
  // }
  useEffect(() => {
    let token = localStorage.getItem('user');
    if (!token)
      dispatch(setData(LOGOUT))
    else {
      const { exp } = jwtDecode(token)
      if (exp < (Date.now() / 1000)) {
        localStorage.clear();
        dispatch({ type: LOGOUT })
      }
    }
  })

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact={true} component={Login} />
            <Route path='/' component={Layout} />
            {/* <Route path='*' exact={true} component={} /> */}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
