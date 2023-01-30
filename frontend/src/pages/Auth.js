import React , { Component} from 'react';

import AuthContext from '../context/auth-context'
class AuthPage extends Component{

    state = {
        isLogin: true
    }

    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.emailEl = React.createRef();
        this.passwordlEl = React.createRef();
        this.lastNameEl = React.createRef();
        this.firstNameEl = React.createRef();
        this.roleEl = React.createRef();
    }

    switchModeHandler = ()=>{
        this.setState(prevState => {
            console.log(prevState.isLogin);
            return {isLogin: !prevState.isLogin};
        })
    }

    submit = async (event) =>{
        event.preventDefault();

        const email = this.emailEl.current.value;
        const password = this.passwordlEl.current.value;
        let lastName;
        let firstName;
        let role;

        if (!this.state.isLogin) {
            lastName = this.lastNameEl.current.value;
            firstName = this.firstNameEl.current.value;
            role = this.roleEl.current.value;
        }
        

        if (email.trim().length === 0||password.trim().length === 0 ) {
            return;
        }
        let requestBody = {
            query:`
                query {
                    login(email:"${email}",password:"${password}"){
                    userId
                    token
                    tokenExpiration
                    }
                }
            `
        };

        if (!this.state.isLogin) {
         requestBody = {
            query:`
                mutation {
                    createUser(userInput:{email:"${email}",password:"${password}",lastName:"${lastName}",firstName:"${firstName}",role:"${role}"}){
                        _id
                        code
                        email
                      }
                }
            `
        };

}

        fetch('http://localhost:4000/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('failed')
            }
            return res.json();
        })
        .then(res => {
            if (res.data.login.token) {
                const test = this.context.login(res.data.login.token,res.data.login.userId,res.data.login.tokenExpiration)
                console.log(test);
            }
        })
        .catch(err => {
            console.log(err);
        })

    }

        render () {
            return (
                    <div className="min-h-full items-center justify-center flex py-12 px-4 sm:px-12 lg:px-8">
                        <form className="mt-8 space-y-8" action="#"  onSubmit={this.submit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                    Email address
                                    </label>
                                    <input
                                    id="email-address"
                                    name="email"
                                    ref={this.emailEl}
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block
                                    w-full px-3 py-2 border border-gray-300
                                    placeholder-gray-500 text-gray-900 rounded-t-md
                                    focus:outline-none focus:ring-indigo-500
                                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Adresse mail"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                    Password
                                    </label>
                                    <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    ref={this.passwordlEl}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block
                                    w-full px-3 py-2 border border-gray-300
                                    placeholder-gray-500 text-gray-900 rounded-b-md
                                    focus:outline-none focus:ring-indigo-500
                                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Mot de passe"
                                    />
                                </div>
                               {!this.state.isLogin &&
                               <>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                    Last name
                                    </label>
                                    <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    ref={this.lastNameEl}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block
                                    w-full px-3 py-2 border border-gray-300
                                    placeholder-gray-500 text-gray-900 rounded-b-md
                                    focus:outline-none focus:ring-indigo-500
                                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Nom de famille"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                    first name
                                    </label>
                                    <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    ref={this.firstNameEl}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block
                                    w-full px-3 py-2 border border-gray-300
                                    placeholder-gray-500 text-gray-900 rounded-b-md
                                    focus:outline-none focus:ring-indigo-500
                                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Prénom"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                    first name
                                    </label>
                                    <input
                                    id="role"
                                    name="role"
                                    type="text"
                                    ref={this.roleEl}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block
                                    w-full px-3 py-2 border border-gray-300
                                    placeholder-gray-500 text-gray-900 rounded-b-md
                                    focus:outline-none focus:ring-indigo-500
                                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Prénom"
                                    />
                                </div></>
                                }
                               
                            </div>
                            {this.state.isLogin &&
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500
                                    border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Se souvenir de moi
                                    </label>
                                </div>
                                
                            </div>}
                              

                            <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center
                                py-2 px-4 border border-transparent text-sm font-medium
                                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                                focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-indigo-500"
                                onClick={this.submit}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                                </span>
                                Validé 
                            </button>
                            </div>
                            <div>
                            <button className="ring-indigo-500"
                            onClick={this.switchModeHandler}
                            >
                                Voulez-vous vous {this.state.isLogin ?'inscrire': 'connecter'} ?
                            </button>
                            </div>
                        </form>
                    </div>
            )
        }
}
export default AuthPage;