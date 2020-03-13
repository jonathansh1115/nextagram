import React from 'react'

export default (props) => {

    const {height} = props
    
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:{height}}}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xmlspace="preserve">
                <g>
                    <path d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z" 
                    fill="#000000" 
                    fill-opacity="1" />
                    
                    <animateTransform 
                        attributeName="transform" 
                        type="rotate" 
                        from="0 64 64" 
                        to="360 64 64" 
                        dur="1400ms" 
                        repeatCount="indefinite">
                    </animateTransform>
                </g>
            </svg>
        </div>
    )
}