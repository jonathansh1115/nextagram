import React, { useEffect, useState } from 'react'

// reactstrap
import { Container, Row, Col } from 'reactstrap';

// axios
import axios from 'axios';

// components
import Loading from './loading'

export default (props) => {
    
    const {url, userstate} = props
    const [pics, setPics] = useState([])
    const [isLoading, changeIsLoading] = useState(true)


    useEffect(() => {
        if (userstate.length !== 0) {
          axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${url}`)
          .then((response) => {
            //   console.log("API(people pic) triggered")
              setPics(response.data)
              changeIsLoading(false)
            //   console.log(response.data)
            })
        }
    }, [userstate])
        
    return (
        <Col md='9' color='light'>

            <Container fluid={true}>
                
                <Row>

        {
            isLoading?
            <Loading />
            :
            pics.map((items) => (
                <Col md='4' sm='12'>
                    <img className='notProfile' src={items.url} alt='' />
                </Col>
            ))
        }

                </Row>

            </Container>
        </Col>
    )
}