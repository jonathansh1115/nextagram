import React, { useState } from 'react'

// libraries
import { Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    FormText,
    Col } from 'reactstrap'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

export default (props) => {

    const {profilepic} = props
    const [modal, setModal] = useState(false)
    const [image, setImage] = useState({})
    const [img2upload, setImg2upload] = useState()
    let history = useHistory()

    const profile = {
        borderRadius: '50%',
        width: '22vw',
    }
    
    const toggle = () => {
        setModal(!modal)
    }

    const upload = () => {
        const imageData = new FormData()
        imageData.append("image", img2upload)
        Axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/images/',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            },
            data: imageData
        })
        .then((response) => {
            history.push('/me')
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    return (
        <div>
            <button onClick={toggle} style={{border:'none', backgroundColor:'transparent'}}>
                <img style={profile} src={profilepic} alt='' />
            </button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Upload Profile Picture</ModalHeader>
                <ModalBody>

                <Form>
                    <FormGroup row>
                        <Label for="exampleFile" sm={2}>File</Label>
                        <Col sm={10}>
                        <Input type="file" name="file" id="image-file" onChange={
                            (e) => {
                                setImage(URL.createObjectURL(e.target.files[0]))
                                setImg2upload(e.target.files[0])
                            }
                        } />
                        <FormText color="muted">
                            Upload your amazing profile picture here and show it to the world!
                        </FormText>
                        </Col>
                    </FormGroup>
                </Form>

                <img 
                    style={
                        {
                            width: '100%'
                        }
                    }
                    src={image}
                    alt=''
                />

                </ModalBody>
                <ModalFooter>
                <Button onClick={upload} color="primary">Upload</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}