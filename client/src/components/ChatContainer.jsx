import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {

    const { messages, selectedUser, setSelectedUser, sendMessage, 
        getMessages} = useContext(ChatContext)

    const { authUser, onlineUsers } = useContext(AuthContext)

    const scrollEnd = useRef()

    const [input, setInput] = useState('');

    const handleSendMessage = async (e)=>{
        e.preventDefault();
        if(input.trim() === "") return null;
        await sendMessage({text: input.trim()});
        setInput("")
    }

    const handleSendImage = async (e) =>{
        const file = e.target.files[0];
        if(!file || !file.type.startsWith("image/")){
            toast.error("select an image file")
            return;
        }
        const reader = new FileReader();

        reader.onloadend = async ()=>{
            await sendMessage({image: reader.result})
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }

    useEffect(()=>{
        if(selectedUser){
            getMessages(selectedUser._id)
        }
    },[selectedUser])

    useEffect(()=>{
        if(scrollEnd.current && messages){
            scrollEnd.current.scrollIntoView({ behavior: "smooth"})
        }
    },[messages])

  return selectedUser ? (
    <section className='chat-panel'>
      <div className='chat-header'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="chat-header-avatar"/>
        <p className='chat-contact-name'>
            {selectedUser.fullName}
            <span className={`chat-contact-status ${onlineUsers.includes(selectedUser._id) ? 'is-online' : ''}`}>
                {onlineUsers.includes(selectedUser._id) ? 'Online now' : 'Offline'}
            </span>
        </p>
        <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="Back to conversations" className='back-button'/>
        <img src={assets.help_icon} alt="" className='help-icon'/>
      </div>
      <div className='chat-messages'>
        {messages.map((msg, index)=>(
            <div key={index} className={`message-row ${msg.senderId === authUser._id ? 'message-outgoing' : 'message-incoming'}`}>
                {msg.image ? (
                    <img src={msg.image} alt="Shared image" className='message-image'/>
                ):(
                    <p className='message-bubble'>{msg.text}</p>
                )}
                <div className="message-meta">
                    <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='message-avatar' />
                    <p className='message-time'>{formatMessageTime(msg.createdAt)}</p>
                </div>
            </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>


    <form onSubmit={handleSendMessage} className='message-composer'>
        <div className='composer-field'>
            <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder="Send a message"
            className='composer-input'/>
            <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden/>
            <label htmlFor="image" className='attachment-label'>
                <img src={assets.gallery_icon} alt="Attach image" className="attachment-icon"/>
            </label>
        </div>
        <button type="submit" className="send-button" aria-label="Send message">
            <img src={assets.send_button} alt="" />
        </button>
    </form>


    </section>
  ) : (
    <section className='empty-chat'>
        <div className='empty-chat-icon'><img src={assets.logo_icon} alt="" /></div>
        <p className='empty-chat-eyebrow'>YOUR SPACE TO CONNECT</p>
        <h1>Good conversations<br/>start here.</h1>
        <p className='empty-chat-hint'>Pick a friend from the sidebar and say hello.</p>
    </section>
  )
}

export default ChatContainer
