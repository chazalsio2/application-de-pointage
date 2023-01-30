import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { getItem,addItem,removeItem } from './localStorage';

export function hasAuth(){
    const token = getItem('authToken');
    const result = token ? tokenIsValid(token):false;

    if (result===false) {
        removeItem('authToken');
    }

    console.log(result);
    return result;
}
export function login(credentials){
  return fetch('http://localhost:4000/graphql',{
        method: 'POST',
        body: JSON.stringify(credentials),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('failed')
            }
            return res.json();
        })
        .then(res => res.data.login.token)
        .then(token => {
            addItem('authToken');
            return true;
        });
}

export function logout(credentials){
    removeItem('authToken');
}

export function tokenIsValid(token) {
    const {expires} = jwtDecode(token);

    if (expires * 1000 > new Date().getTime()) {
        return true;
    }
    return false;
}