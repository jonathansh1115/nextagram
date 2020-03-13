import React, { useState } from 'react';


// components
import Modal from './modal'

// libraries
import {
  Navbar,
  NavbarBrand,
  Button
} from 'reactstrap';
import {Link, useHistory} from 'react-router-dom'
import { toast } from 'react-toastify'


const Example = () => {
  let token = localStorage.getItem('auth_token')
  let history = useHistory()

  const signout = () => {
    localStorage.setItem('auth_token', '')
    // window.location.reload(false)
    history.push('/home')
    toast.warn('Bye bye!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
      
  }

  return (
    <div>
      <Navbar light expand="md" style={{backgroundColor:'rgb(211,211,211)', display:'flex', justifyContent:'space-between', height:'8vh'}}>
        <Link to='/home'>
          <NavbarBrand>
              <img src='https://image.flaticon.com/icons/png/512/87/87390.png' style={{height:'30px'}} alt='ig logo' />
              &nbsp;
              Nextagram
          </NavbarBrand>
        </Link>
        
        {
          token===''?
          <Modal />
          :
          <div style={{display:'flex'}}>
            <h5 style={{marginRight:'10px', marginTop:'10px'}}>Welcome, {localStorage.getItem('username')}!</h5>
            <Button color="dark" onClick={signout}>Sign out</Button>
          </div>
        }

      </Navbar>
    </div>
  );
}

export default Example;
