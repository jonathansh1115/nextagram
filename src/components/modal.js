import React, { useState } from 'react';

// library
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios';
import { toast } from 'react-toastify'

export default () => {

  let history = useHistory()
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])

  const toggle = () => setModal(!modal);

  const signin = (e) => {
      e.preventDefault()

      const trimmedPassword = password.trim()
      const trimmedUsername = username.trim()
      let errorCopy = []
      // make sure psw=psw2
      if (trimmedPassword === '') {
          errorCopy.push("Please type in your password")
      }
      if (trimmedUsername === '') {
          errorCopy.push("Please type in your username")
      }
      setError(errorCopy)
      
      if ((trimmedPassword !== '') && (trimmedUsername !== '')) {
        Axios({
          method: 'POST',
          url: 'https://insta.nextacademy.com/api/v1/login',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            'username': username,   
            'password': password
          }
        })
        .then((response) => {
          // console.log(response)
          // debugger
          localStorage.setItem('auth_token', response.data.auth_token)
          localStorage.setItem('username', username)
          localStorage.setItem('id', response.data.user.id)

          history.push(`/me`)

          toast.success('Welcome back!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              });
          })
        .catch((error) => {
          // console.log(error.response.data.message)
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
            
        })
      }
    }

  return (
    <div>
      <Button color="dark" onClick={toggle}>Login</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login to your account.</ModalHeader>
        <ModalBody>

        <Form>
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input type="text" onChange={e => {setUsername(e.target.value)}} name="username" id="exampleUsername" placeholder="your username..." />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="examplePassword">Password:</Label>
                    <Input type="password" onChange={e => {setPassword(e.target.value)}} name="password" id="examplePassword" placeholder="your super secret password..." />
                </FormGroup>
                </Col>
            </Row>
            <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Remember me
                </Label>
            </FormGroup>

            {
                error.map((item) => (
                    <h6 style={{color:'red', marginTop:'10px'}}>
                        {item}
                    </h6>
                ))
            }

            <FormGroup style={{marginTop:'15px'}}>
                <Button onClick={signin}>Sign in</Button>
            </FormGroup>
        </Form>
            
        </ModalBody>
        <ModalFooter>
        <Link to='../signup'><Button color="dark" onClick={toggle}>Create your Nextagram account</Button>{' '}</Link>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
