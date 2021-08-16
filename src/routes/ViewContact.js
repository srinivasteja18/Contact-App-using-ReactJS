import React, {useContext} from 'react'
import ContactContext from '../context/ContactContext'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function ViewContact() {
    const {state, dispatch} = useContext(ContactContext)
    const {contact} = state;
    return (
        <div className="viewContactDiv">
            <div className="viewContact-div">
                <img src={contact?.picture}/>
                <p>{contact?.name}</p>
                <p><FaPhone className="icon"/>{contact?.phone}</p>
                <a href={`mailto:{contact?.email}`} className="viewContact-email-div"><FaEnvelope className="icon"/> {contact?.email} 
                </a>
                <a className="viewContact-address-div" href={`https://maps.google.com/?=${contact?.address}`}>
                    <FaMapMarkerAlt className="icon"/>{contact?.address}
                </a>
            </div>
        </div>
        
    )
}
