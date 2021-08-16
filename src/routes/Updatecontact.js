import React, {useState,useContext, useEffect} from 'react'
import firebase from 'firebase'
import { useHistory } from 'react-router';
import ContactContext from '../context/ContactContext'
import { toast, ToastContainer } from 'react-toastify';

export default function Updatecontact() {
    let history = useHistory();
    const {state} = useContext(ContactContext);
    const {UpdateContact,ContactKey} = state;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [star, setStar] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [update,setUpdate] = useState(false);
    const [phone, setPhone] = useState('')
    const [downloadURL, setDownloadURL] = useState('')

    useEffect(() => {
        if(UpdateContact != null){
            setName(UpdateContact.name);
            setEmail(UpdateContact.email);
            setPassword(UpdateContact.password);
            setPhone(UpdateContact.phone);
            setAddress(UpdateContact.address);
            setUpdate(true);
            console.log(update);
        }
    }, [UpdateContact])

    const uploadImage = async (e) =>{
        const file = e.target.files[0];
        var metadata = {
            contentType : file.type
        }
        const storageRef = firebase.storage().ref();
        const uploadPic = storageRef.child('images/' + file.name).put(file,metadata);

        uploadPic.on(firebase.storage.TaskState, snapshot => {
            setIsUploading(true);
            var progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    setIsUploading(false);
                    console.log("Uploading is Paused");
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log("Uploading is Going On");
            }
            if(progress == 100){
                setIsUploading(false);
                console.log("Uploading Successfull");
                toast("Image Uploaded Successfully",{type:"success"})
            }
        },
        error => {
            console.log(error);
        },
        ()=>{
            uploadPic.snapshot.ref.getDownloadURL()
            .then(
                downloadURL => (setDownloadURL(downloadURL))
            )
            .catch(error=>{
                console.log("something Went Wrong")
                toast(error.message,{type:"error"})
            })
        }
        )
    }

    const handleUpdateContact = async ()=>{
        try{
            const databaseRef = await firebase.database().ref();
            const data = {
                name:name,
                email:email,
                password:password,
                phone:phone,
                address:address,
                star:star,
                picture:downloadURL
            }
            const uploadData = databaseRef.child("contacts/" + ContactKey).set(data);
        }
        catch(error) {
            console.log(error)
            toast(error.message,{type:"error"})
        }
    }
    const handleSubmit = ()=>{
        handleUpdateContact();
        toast("Task Completed Successfully" , {type:"success"});
        history.push("/Home/ContactList");
    }


    return (
        <div className="AddContactDiv">
            <ToastContainer/>
            <div className="add-contact-div">
                <h2>UPDATE CONTACT</h2>
                <div className="img-div">
                    <img src={downloadURL} />
                    <input type="file" onChange={(e) => uploadImage(e)} placeholder="Upload Image"/>
                </div>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name"/>
                <label>Email: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email ID"/>
                <label>Password: </label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
                <label>Mobile Number: </label>
                <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Your Mobile Number"/>
                <label>Address: </label>
                <input className="Address-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Your Address"/>
                <div className="checkbox-div">
                    <input type="checkbox" value={star} onChange={(e)=>setStar(e.target.value)} />
                    Mark Star as True
                </div>
                
                <button onClick={handleSubmit}>Update Contact</button>
            </div>
        </div>
        
    )
}
