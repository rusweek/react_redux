import  React from 'react';
import {Route, Switch} from 'react-router-dom';
import {HomePage, CartPage} from '../pages';

import './app.css';
import {withBookStoreService} from '../hoc'
import ShopHeader from "../shop-header";
const App = () => {
    return (
        <main role="main" className="container" >
            <ShopHeader numItem={5} total={210} />
            <Switch>
                <Route
                    path="/"
                    component={HomePage}
                    exact />

                <Route
                    path="/cart"
                    component={CartPage}
                />

            </Switch>
        </main>
    )
};



export default withBookStoreService()(App);