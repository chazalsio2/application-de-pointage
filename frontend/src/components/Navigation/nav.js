import React, { useContext, useState } from 'react'
import AuthContext from '../../context/auth-context';
import { hasAuth, logout } from '../../service/AuthApi';



export const Nav = () => {
    const handlelogout = ()=>{
        logout();

    }
    let Links = [
        {name: 'Acceuil',link: '/'},
        {name: 'pointage',link: '/event'},
        {name: 'connection',link: '/auth'},
        {name: 'pointager',link: '/booking'},
    ]
  
         return (
            <AuthContext.Consumer>
                {(context)=>{
                    return (
                        <div className="shadow-md w-full fixed top-0 left-0">
                        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7"> 
                        <div className="font-bold text-2x1 cursor-pointer flex items-center font-[Poppins] 
                        text-gray-800">
                            <span className="text-3x1 text-indigo-600 mr-1 pt-2">
                                <ion-icon name="logo-ionic"></ion-icon>
                            </span>
                            Designer
                        </div>
                        <ul className="md:flex md:item-center">
                            {
                                Links.map(link => (
                                    link.name !== 'connection' ? 
                                    context.token &&
                                    <li key={link.name} className="md:ml-8 text-xl cursor-pointer">
                                        <a href={link.link} onClick={link.oncli}>{link.name}</a>
                                    </li>:
                                    !context.token && 
                                    <li key={link.name} className="md:ml-8 text-xl cursor-pointer">
                                        <a href={link.link}>{link.name}</a>
                                    </li>
                                )) 
                                   
                            }
                                    { context.token &&<li className="md:ml-8 text-xl cursor-pointer">
                                        <a onClick={context.logout} href="/">Deconnexion</a>
                                    </li>}
                        </ul>
                        </div>
                    </div>
                    )
                }}
                </AuthContext.Consumer>
            )
        }

export default Nav;