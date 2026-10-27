import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {

    const {selectedUser} = useContext(ChatContext)

  return (
    <main className='app-shell'>
      <div className={`chat-layout ${selectedUser ? 'has-selection' : ''}`}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar/>
      </div>
    </main>
  )
}

export default HomePage
