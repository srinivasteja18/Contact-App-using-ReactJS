import React,{useState,useContext} from 'react'
import { Redirect } from 'react-router'
import  firebase from 'firebase/app'
import UserContext from '../context/UserContext'
import { toast, ToastContainer } from 'react-toastify';
import { FaUser,FaLock } from 'react-icons/fa';

export default function Signup() {
    const context = useContext(UserContext);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp=()=>{
        firebase
            .auth()
            .signInWithEmailAndPassword(email,password)
            .then(
                res =>{
                    console.log(res);
                    context.setUsers({email:res.user.email, uid : res.user.uid});
                }
            )
            .catch(error =>{
                console.log(error);
                toast(error.message, {type:"error"});
            })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        handleSignUp();
    }

    if(context.users?.uid){
        return <Redirect to="/Home"/>
    }
    return (
        <div className="form-div">
            <div className="helper">
                <div className="sign-title">SignIn Here</div>
                <ToastContainer/>
                <form className="sign-form" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="input-div">
                        <label >Email:</label><br></br>
                        <div className="input-container">
                            <FaUser className="input-icon"/>
                            <input value={email} 
                                onChange={(e)=>setEmail(e.target.value)} 
                                type="email" 
                                placeholder="Enter your Email ID"/>
                        </div>
                        <br></br><label>Password:</label><br></br>
                        <div className="input-container">
                            <FaLock className="input-icon"/>
                            <input value={password} 
                                onChange={(e)=>setPassword(e.target.value)} 
                                type="password"
                                placeholder="Enter your Password"/>
                        </div>
                        
                        <button className="button">SIGNIN</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
