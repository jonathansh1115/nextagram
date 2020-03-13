import React, { useEffect, useState } from 'react'

// css
import './profilepage.css'

// library
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Masonry from 'react-masonry-component';

// component
import Loading from '../components/loading'
import UploadImageModal from '../components/uploadimagemodal'


export default () => {

    let { id } = useParams('')
    const token = localStorage.getItem('auth_token')
    const [profile, setProfile] = useState({})
    const [img, setImg] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then((response) => {
            setProfile(response.data)
        })
    }, [])


    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${id}`)
        .then((response) => {
            console.log(response.data)
            setImg(response.data)
            setIsLoading(false)
        })
    }, [])

    console.log(profile.id)

    return (
        <div>
            <header className="user-profile">
                <section className='name'>
                    <img className='profile' src={profile.profileImage} alt='' />
                    <h1 id='user-name'>{profile.username}</h1>
                </section>
            </header>

            <Masonry options={{fitWidth: true}} style={{margin:'auto', marginTop: '10px'}}>
                {
                    isLoading?
                    <div id='loading'><Loading /></div>
                    :
                    img.map((item) => (
                        <img className='not-profile' src={item.url} alt='' />
                    ))
                }
            </Masonry>

        </div>
    )
}