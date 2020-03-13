import React, { useState, useEffect } from 'react';

// css
import '../App.css';

// reactstarp
import { Container, Row, Col } from 'reactstrap';

//axios
import axios from 'axios'

//components
import Getimg from '../components/getimg'
import Loading from '../components/loading.js'

//react router
import {Link} from 'react-router-dom'


export default () => {
    const [user, setUser] = useState([])
    const [isLoading, changeIsLoading] = useState(true)
    const [quote, setQuote] = useState('')

    useEffect(() => {
        axios.get('https://insta.nextacademy.com/api/v1/users/')
        .then((response) => {
          // console.log("API(profile pic) triggered")
          setUser(response.data)
          changeIsLoading(false)
        })
    }, [])

    useEffect(() => {
        axios.get('https://api.tronalddump.io/random/quote')
        .then((response) => {
            console.log(response.data.value)
            setQuote(response.data.value)
        })
    }, [])

    return (
        <Container fluid={true}>
        
          {
            isLoading?
            <Loading height='92vh' />
            :
            user.map((item) => (


              <Row>

                {/* Left */}

                <Col id='left' md='3' style={{backgroundColor:'rgb(235,235,235)', padding:'0'}}>

                      <span style={{textAlign:'center'}}>
                        <Link to={`/profilepage/${item.id}`}>
                            <img className='profile' src={item.profileImage} alt='' />
                        </Link>
                        <h3>{item.username}</h3>
                        <p>{quote}</p>
                      </span>

                </Col>

                {/* Right */}

                <Getimg url={item.id} userstate={user}/>

              </Row>

            ))
          }
      </Container>
    )
}