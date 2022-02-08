import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import { useAuthContext } from './hooks/useAuthContext';
import Create from "./pages/create/Create";
//pages
import Home from './pages/Home/Home';
import Item from "./pages/item/Item";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Registration from "./pages/registration/Registration";
import Search from "./pages/Search/Search";



function App() {
    const { user, authIsReady } = useAuthContext()

    return (
        <div className="App">
            {authIsReady && (
                <BrowserRouter>
                    <div className="container">
                        <Navbar />
                        <Switch>
                            <Route exact path='/'>
                                {!user && <Redirect to='/login' />}
                                {user && <Home />}
                            </Route>
                            <Route path='/login'>
                                {user && <Redirect exact to='/' />}
                                {!user && <Login />}
                            </Route>
                            <Route path='/signup'>
                                {user && <Redirect to='/' />}
                                {!user && <Registration />}
                            </Route>
                            <Route path='/create'>
                                <Create />
                            </Route>
                            <Route path='/profile/:id'>
                                <Profile />
                            </Route>
                            <Route path='/search'>
                                <Search />
                            </Route>
                            <Route path='/item/:id'>
                                <Item />
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            )}
        </div>
    );
}

export default App;

