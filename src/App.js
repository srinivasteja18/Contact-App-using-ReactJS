import React, {useState,useReducer} from 'react';
import './App.css';
import NavBar from './layouts/navBar';
import Footer from './layouts/Footer.js'
import SignIn from './sections/SignIn'
import SignUp from './sections/SignUp'

import ContactContext from './context/ContactContext'
import ContactList from './routes/ContactsList'
import AddUpdateContact from './routes/AddUpdateContact'
import ViewContact from './routes/ViewContact'

import Reducer from './context/Reducer';

import Home from './sections/Home'
import PageNotFound from './sections/PageNotFound'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import UserContext from './context/UserContext';
import firebase from 'firebase/app';
import {FirebaseConfig} from './FirebaseConfig';
import 'firebase/firebase-auth'
import 'firebase/firebase-database'
import DashBoard from './sections/DashBoard';
import Updatecontact from './routes/Updatecontact';
firebase.initializeApp(FirebaseConfig);

const initialState = {
  contacts:[],
  isLoading : false,
  UpdateContact:null,
  ContactKey:null,
  contact:null
}

function App() {
  const [users,setUsers] = useState(null);
  const [state, dispatch] = useReducer(Reducer,initialState);

  return (
    <Router>
        <ContactContext.Provider value={{state,dispatch}}>
      <UserContext.Provider value={{users,setUsers}}>
          <ToastContainer/>
          <NavBar/>
          <Switch>
            <Route exact path="/"> <DashBoard/> </Route>
            <Route exact path="/Home"><Home/></Route>
            <Route exact path="/SignUp"><SignUp/></Route>
            <Route exact path="/SignIn"><SignIn/></Route>
            <Route exact path="/Home/ContactList"> <ContactList/> </Route>
            <Route exact path="/Home/AddContact"> <AddUpdateContact/> </Route>
            <Route exact path="/Home/UpdateContact"> <Updatecontact/> </Route>
            <Route exact path="/Home/ViewContact"> <ViewContact/> </Route>
            <Route exact path="*"> <PageNotFound/> </Route>
          </Switch>
          <Footer/>
      </UserContext.Provider>
      </ContactContext.Provider>
    </Router>
  );
}

export default App;
