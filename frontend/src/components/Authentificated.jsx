import React,{useContext, useState} from "react";
import { Route } from "react-router-dom";
import {Navigate} from 'react-router-dom'


import authContext from "../context/auth-context"
import { hasAuth } from "../service/AuthApi";

const AuthenticationRoute = ({path, element}) => {
    const {isAuthenticated}= useContext(hasAuth);
    console.log(isAuthenticated);

    return isAuthenticated ?
    <Route exact path={path} element={element}/>
    : <Navigate replace to="/auth"/>
}
export default AuthenticationRoute;