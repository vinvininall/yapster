import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {

    const {getUsers, users, selectedUser, setSelectedUser,
        unseenMessages, setUnseenMessages } = useContext(ChatContext);

    const {logout, onlineUsers} = useContext(AuthContext)

    const [input, setInput] = useState(false)

    const navigate = useNavigate();

    const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

    useEffect(()=>{
        getUsers();
    },[onlineUsers])

  return (
    <aside className={`sidebar ${selectedUser ? 'sidebar-hidden' : ''}`}>
      <div className='sidebar-top'>
        <div className='sidebar-header'>
            <img src={assets.logo} alt="Yapster" className='sidebar-logo' />
            <div className="menu-wrapper">
                <img src={assets.menu_icon} alt="Menu" className='menu-trigger' />
                <div className='menu-popover'>
                    <p onClick={()=>navigate('/profile')} className='menu-item'>Edit Profile</p>
                    <hr className='menu-divider' />
                    <p onClick={()=> logout()} className='menu-item'>Logout</p>
                </div>
            </div>
        </div>

        <div className='search-bar'>
            <img src={assets.search_icon} alt="Search" className='search-icon'/>
            <input onChange={(e)=>setInput(e.target.value)} type="text" className='search-input' placeholder='Search conversations'/>
        </div>

      </div>

    <div className='user-list'>
        {filteredUsers.map((user, index)=>(
            <div onClick={()=> {setSelectedUser(user); setUnseenMessages(prev=> ({...prev, [user._id]:0}))}}
             key={index} className={`user-row ${selectedUser?._id === user._id ? 'user-row-selected' : ''}`}>
                <img src={user?.profilePic || assets.avatar_icon} alt="" className='user-avatar'/>
                <div className='user-meta'>
                    <p className='user-name'>{user.fullName}</p>
                    {
                        onlineUsers.includes(user._id)
                        ? <span className='user-presence is-online'>Online</span>
                        : <span className='user-presence'>Offline</span>
                    }
                </div>
                {unseenMessages[user._id] > 0 && <p className='unread-badge'>{unseenMessages[user._id]}</p>}
            </div>
        ) )}
    </div>

    </aside>
  )
}

export default Sidebar
