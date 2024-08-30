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
    <div className="text-white min-h-screen max-w-1/2 bg-gray-100 flex items-center justify-center bg-gray-800">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-md bg-gray-600 w-11/12 m-auto">
        <h1 className="text-2xl font-bold mb-4">FCM Push Notification Test</h1>
        <p className="mb-4">This page is set up to receive push notifications from Firebase Cloud Messaging.</p>

        <button onClick={async()=>{const token = await getMessagingToken();setText(token as string)}} className='text-blue-900 font-bold w-40 h-10 bg-blue-400 rounded-lg text-sm'>Get notif permission</button>
        <button onClick={copyToClipboard} className='my-4 border overflow-auto h-20 rounded-lg p-4 text-sm font-bold'><p>{text}</p></button>
    </div>
    <Notification />
      </div>
  )
}

export default App