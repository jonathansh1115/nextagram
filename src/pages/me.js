import React, { useState, useEffect } from 'react'

// components
import Loading from '../components/loading'
import Uploadingimagemodal from '../components/uploadimagemodal'
import Changeprofilepicmodal from '../components/changeprofilepicmodal'

// libraries
import Masonry from "react-masonry-component";
import Axios from 'axios'

export default () => {

    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [username, setUsername] = useState('')
    const [profilepic, setProfilepic] = useState('')
    const [images, setImages] = useState([])
    // const [errormessage, setErrormessage] = useState('')
    let errormessage = ''

    const fetchImg = () => {
        Axios({
            method: 'GET',
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        })
        .then((response) => {
            setImages(response.data)
            setIsLoading2(false)
        })
    }
    
    useEffect(() => {
        if (localStorage.getItem('auth_token')!=='') {
            Axios({
                method: 'GET',
                url: 'https://insta.nextacademy.com/api/v1/users/me',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            })
            .then((response) => {
                setUsername(response.data.username)
                setProfilepic(response.data.profile_picture)
                setIsLoading1(false)
                // id will be response.data.id if later need 
            })
            fetchImg()
        } 
    }, [])

    if (localStorage.getItem('auth_token')==='') {
        // useEffect(() => {
        //     setIsLoading1(false)
        //     setIsLoading2(false)
        // })
        errormessage = 'You are not logged in. Please log in or create a new account now.'
    }


    return (
        <div>
            {
                isLoading1?
                <Loading />
                :
                <div>
                    <Uploadingimagemodal fetchImg={fetchImg} />
                    <header className="user-profile">
                        <section className='name'>
                            <Changeprofilepicmodal profilepic={profilepic} />
                            <h1 id='user-name'>{username}</h1>
                        </section>
                    </header>
                </div>
            }

            <h1>{errormessage}</h1>

            <Masonry options={{fitWidth: true}} style={{margin:'auto', marginTop: '10px'}}>
                {
                    isLoading2?
                    <div id='loading'><Loading /></div>
                    :
                    images.map((item) => (
                        <img className='not-profile' src={item} alt='' />
                    ))
                }
            </Masonry>
        </div>
    )
}