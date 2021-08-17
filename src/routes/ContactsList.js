/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect } from 'react'
import {SET_LOADING,SET_CONTACTS} from '../context/Action.types'
import firebase from 'firebase/app'
import ContactContext from '../context/ContactContext'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa'
import Contact from '../components/Contact'
import { useHistory } from 'react-router-dom'


export default function ContactsList() {
    let history = useHistory();
    const {state,dispatch} = useContext(ContactContext);
    const {contacts, isLoading} = state;

    const handleAddContactToState = async ()=>{
        dispatch({
            type:SET_LOADING,
            payload:true
        });
        try{
            const Contactsdata = await firebase.database().ref().child('contacts/');
            Contactsdata.on('value', snapshot =>{
                dispatch({
                    type:SET_CONTACTS,
                    payload:snapshot.val()
                })
            })
        }
        catch(error){
            console.log(error);
            toast(error.message, {type:"error"});
        }
        dispatch({
            type:SET_LOADING,
            payload:false
        });
    }

    useEffect(() => {
        handleAddContactToState();
    }, [])

    const RedirectAddContact = ()=>{
        history.push("/Home/AddContact");
    }
    return (
        <div className="ContactLists-div">
            <button onClick={RedirectAddContact} className="AddContact-button">ADD CONTACT</button>
            <ul className="contact-list">
                {
                    (isLoading) ? (
                        <div className="Loading">
                            <FaSpinner className="spinner-icon"/>
                            <p style={{color:"white"}}>Loading...</p>
                        </div>
                    ) :(
                        <div></div>
                    )
                }
                
                {
                (contacts.length ===0) ?(
                    <h1 style={{textAlign:"center", color:"white"}}>No Contacts to Display</h1>
                ):(
                    (Object.entries(contacts).map(([key,value]) =>(
                        <li key={key}>
                            <Contact Contact={value} contactKey={key}/>
                        </li>
                    )))
                )}
            </ul>
        </div>
        
    )
}
