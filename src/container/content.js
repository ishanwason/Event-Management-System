import React, { useEffect } from 'react';
import routes from '../routes'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';




const Content = (props) => {
    const state = useSelector(state => state)
    let isLogin = localStorage.getItem('user');
    return (
        <div>
            {isLogin ? <Switch>
                {routes.map((route, idx) => {
                    return route.component && (<Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />)
                })}
            </Switch> : <Redirect to='/login' />
            }
        </div>
    )
}

export default Content;