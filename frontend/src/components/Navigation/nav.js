import React from 'react'

export const Nav = () => {
    let Links = [
        {name: 'Acceuil',link: '/'},
        {name: 'pointage',link: '/event'},
        {name: 'connection',link: '/auth'},
        {name: 'pointager',link: '/booking'}
    ]
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
                    <li key={link.name} className="md:ml-8 text-xl">
                        <a href={link.link}>{link.name}</a>
                    </li>
                )) 
            }
        </ul>
        </div>
    </div>
  )
}
export default Nav;