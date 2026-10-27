import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  useEffect(() => {
    if (!selectedImg) {
      setPreviewUrl(null)
      return
    }

    const imageUrl = URL.createObjectURL(selectedImg)
    setPreviewUrl(imageUrl)
    return () => URL.revokeObjectURL(imageUrl)
  }, [selectedImg])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName: name, bio});
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async ()=>{
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio});
      navigate('/');
    }
    
  }

  return (
    <main className='profile-page'>
      <div className='profile-card'>
        <form onSubmit={handleSubmit} className="profile-form">
          <p className='auth-eyebrow'>MAKE IT YOURS</p>
          <h3>Profile details</h3>
          <label htmlFor="avatar" className='profile-upload'>
            <input onChange={(e)=>setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <img src={previewUrl || assets.avatar_icon} alt="" />
            <span>Upload a profile photo</span>
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name}
           type="text" required placeholder='Your name' className='auth-input'/>
           <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder="Write a short bio" required className="auth-input auth-textarea" rows={4}></textarea>

           <button type="submit" className="auth-submit">Save changes</button>
        </form>
        <div className='profile-preview'>
          <img src={previewUrl || authUser?.profilePic || assets.logo_icon} alt="" />
          <p>{name}</p>
          <span>{authUser?.email}</span>
        </div>
      </div>
     
    </main>
  )
}

export default ProfilePage
