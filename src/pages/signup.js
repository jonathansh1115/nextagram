import React, { useState } from 'react';

// reactstrap
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

// library
import { useHistory } from 'react-router-dom'
import Axios from 'axios';
import { toast } from 'react-toastify'


export default () => {
    
    let history = useHistory()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [password2, setPassword2] = useState('') 
    const [error, setError] = useState([])

    const divstyle = {
        width:'50vw',
        height:'30vh',
        // backgroundColor:'yellowgreen',
        margin:'auto',
        marginTop:'10px'
    }

    const signup = (e) => {
        e.preventDefault()
        const trimmedUsername = username.trim()
        const trimmedEmail = email.trim()
        let errorCopy = []
        // make sure psw=psw2
        if (password !== password2) {
            errorCopy.push("Password doesn't match!")
        }
        if (trimmedUsername === '') {
            errorCopy.push("Username cannot be empty")
        }
        if (trimmedEmail === '') {
            errorCopy.push("Email cannot be empty")
        }
        setError(errorCopy)

        if ((password === password2) && 
        (trimmedUsername !== '') &&
        (trimmedEmail !== '')) {
             Axios({
                method: 'POST',
                url: 'https://insta.nextacademy.com/api/v1/users/',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'username': username,
                    'email': email,
                    'password': password
                }
            })
            .then((response) => {
                console.log(response)
                // console.log(response.data.auth_token)
                localStorage.setItem('auth_token', response.data.auth_token)
                localStorage.setItem('username', username)

                history.push(`/me`)

                toast.success(`${username}, you'd successfully created your account!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    });
            })
            .catch((error) => {
                console.log(error)
                debugger
                // toast.error(error.response.data.message, {
                //     position: "top-center",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true
                //     });
            })
        }
    }
    
  return (
    <div style={divstyle}>
        <Form>
        <Col form>
            <FormGroup>
                <Label for="exampleEmail">Username</Label>
                <Input onChange={e => setUsername(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="username" />
            </FormGroup>
            
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input onChange={e => setEmail(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="your-email@example.com" />
            </FormGroup>
            
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input onChange={e => setPassword(e.target.value)} type="password" name="password" id="examplePassword" placeholder="your super secret password..." />
            </FormGroup>

            <FormGroup>
                <Label for="examplePassword">Re-type password</Label>
                <Input onChange={e => setPassword2(e.target.value)} type="password" name="password" id="examplePassword" placeholder="your super secret password..." />
            </FormGroup>

                {
                    error.map((item) => (
                        <h6 style={{color:'red'}}>
                            {item}
                        </h6>
                    ))
                }
            <Button onClick={signup} style={{marginTop:'15px'}}>Sign up</Button>
        </Col>
        </Form>
    </div>
  );
}
