import React, {useContext, useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../context/UserContext'

const LOCAL_STORAGE_KEY = "context_data";

export default function NavBar() {
    const context = useContext(UserContext);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        context.setUsers(data);
    }, [])
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(context.users));
    }, [context])

    return (
        <div className="NavBar">
            <Link className="title" to="/">Contact<span className="title-span"> APP</span></Link>
            <ul className="NavList">
                  {
                (context.users?.uid) ? (
                    <li><Link onClick={()=>context.setUsers(null)}  className="navItems" to="/Signup">LogOut</Link></li>
                ):(
                    <> 
                        <li ><Link  className="navItems" to="/Signup">SignUp</Link></li>
                        <li ><Link className="navItems" to="SignIn">SignIn</Link></li>
                     </> 
                 )
                } 
            </ul>
        </div>
    )
}
