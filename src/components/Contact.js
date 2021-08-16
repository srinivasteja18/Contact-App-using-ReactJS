import React, {useContext} from 'react'
import firebase from 'firebase'

import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

import { toast, ToastContainer } from 'react-toastify'
import { UPDATE_CONTACT, SINGLE_CONTACT } from '../context/Action.types'
import ContactContext from '../context/ContactContext'
import { Redirect,useHistory } from 'react-router';


export default function Contact({Contact, contactKey}) {
    let history = useHistory();
    const {state,dispatch} = useContext(ContactContext);

    const removeContact = async () =>{
        try{
            const databaseRef = await firebase.database().ref()
            databaseRef.child(`contacts/${contactKey}`)
                       .remove()
                       .then(()=>toast("Contact Deleted Successfully", {type:"info"}))
                       .catch(err=>console.log(err))
        }catch(error){
            console.log(error);
            toast("Something Went Wrong",{type:"warning"});
        }
    }
    const UpdateContactStar = async () =>{
        try{
            const databaseRef = await firebase.database().ref()
            databaseRef.child(`contacts/${contactKey}`)
                       .update({
                           star : !Contact.star
                       },err=>console.log(err))
                       toast("Star Updated SuccessFully", {type:"success"})
        }catch(error){
            console.log(error);
            toast("Something Went Wrong",{type:"warning"});
        }
    }

    const updateContactInfo= async()=>{
        dispatch({
            type:UPDATE_CONTACT,
            payload:Contact,
            key:contactKey
        });
        console.log(state);
        history.push("/Home/UpdateContact");
    }

    const handleViewContact= async()=>{
        dispatch({
            type:SINGLE_CONTACT,
            payload:Contact
        });
        history.push("/Home/ViewContact");
    }

    return (
        <div className="contact-div">
            {Contact.star ? 
            (<FaStar onClick={UpdateContactStar} className="Icons"/>) 
            :(<FaRegStar onClick={UpdateContactStar} className="Icons"/>)}
            <div onClick={handleViewContact} className="viewContactInfo">
                <img className="contact-pic" src={Contact.picture}/>
                <div className="ContactInfoParas">
                    <p><span>Name: </span>{Contact.name}</p>
                    <p><span>Email Id:</span> {Contact.email}</p>
                    <p><span>Mobile No:</span> {Contact.phone}</p>
                </div>
            </div>
            <div>
                <MdDelete onClick={removeContact} className="Icons"/>
                <MdEdit onClick={updateContactInfo} className="Icons"/>
            </div>
           
        </div>
    )
}
