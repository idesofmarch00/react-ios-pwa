import React,{useState} from 'react'
import Notification from './Notification'
import { getNotificationPermission,getMessagingToken } from './general';

function App() {
  const [text, setText] = useState('');

  const copyToClipboard = async () => {
    try {
      if (text){
        setText(text)
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">FCM Push Notification Test</h1>
        <p className="mb-4">This page is set up to receive push notifications from Firebase Cloud Messaging.</p>

        <button onClick={async()=>{const token = await getMessagingToken();setText(token as string)}} className='w-40 h-10 bg-blue-400 rounded-lg text-sm'>Get notif permission</button>
        <button onClick={copyToClipboard} className='my-10 border overflow-auto h-20 w-full rounded-lg'><p>{text}</p></button>
    </div>
    <Notification />
      </div>

  )
}

export default App