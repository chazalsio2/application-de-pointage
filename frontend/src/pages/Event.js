import React , { Component} from 'react';
import Modale from '../components/Modal/Modal';

class EventPage extends Component{
    state ={
        creating: false,
    }
    creatingEventHandler = ()=>{
        this.setState({creating: true});
    }
        render () {
            return (
                <React.Fragment>
                    
                    <Modale title="titre" canConfirm canCancel>
                        <p>yes</p>
                    </Modale>
                    <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Efectuer mon pointage
                    </button>
                {/* <div className="min-h-full items-center justify-center flex py-12 px-4 sm:px-12 lg:px-8">

                <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full  px-3 mb-6 md:mb-0">
                            
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Heure
                        </label>
                        <div class="relative">
                            <select required class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>D'arrivé</option>
                            <option>De départ</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        </div>
                       
                        
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Saisie du code
                        </label>
                        <input required class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="****"/>
                        </div>
                        
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Validé
                            </button>
                        </div>
                    </div>
                    
                </form>
                </div> */}
                </React.Fragment>
            )
        }
}
export default EventPage;