import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {

    const {selectedUser, messages} = useContext(ChatContext)
    const {logout, onlineUsers} = useContext(AuthContext)
    const [msgImages, setMsgImages] = useState([])
    useEffect(()=>{
        setMsgImages(
            messages.filter(msg => msg.image).map(msg=>msg.image)
        )
    },[messages])

  return selectedUser && (
    <aside className='details-sidebar'>

        <div className='contact-card'>
            <img src={selectedUser?.profilePic || assets.avatar_icon} alt=""
            className='contact-avatar' />
            <h1 className='contact-name'>
                <span className={`contact-status ${onlineUsers.includes(selectedUser._id) ? 'is-online' : ''}`}></span>
                {selectedUser.fullName}
            </h1>
            <p className='contact-bio'>{selectedUser.bio || 'Always happy to connect.'}</p>
        </div>

        <div className='details-divider'></div>

        <div className="shared-media">
            <p className='section-label'>Shared media <span>{msgImages.length}</span></p>
            <div className='media-grid'>
                {msgImages.map((url, index)=>(
                    <div key={index} onClick={()=> window.open(url)} className='media-item'>
                        <img src={url} alt="Shared in chat" />
                    </div>
                ))}
            </div>
        </div>

        <button onClick={()=> logout()} className='details-logout'>
            Logout
        </button>
    </aside>
  )
}

export default RightSidebar
