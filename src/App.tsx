import {useState} from 'react'
import Message from "./Message";
import "react-toastify/dist/ReactToastify.css";
import { getNotificationPermission,getMessagingToken } from './general';
import { toast, ToastContainer } from "react-toastify";
import { onMessage } from 'firebase/messaging';
import {messaging} from './firebase';

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

  onMessage(messaging, (payload) => {
    if (payload.notification) {
      toast(<Message notification={{
        title: payload.notification.title || '',
        body: payload.notification.body || '',
        image: payload.notification.image
      }} />);
    }
  });

  return (
    <div className="flex flex-col items-center space-y-10 text-white min-h-screen max-w-1/2 bg-gray-100 flex items-center justify-center bg-gray-800">
     <p className='text-4xl text-white font-bold'>REACT PWA</p>
      <div className="flex flex-col p-8 px-4 rounded-lg shadow-md bg-gray-600 w-11/12 m-auto">
        <h1 className="text-2xl font-bold mb-4 text-white">FCM Push Notification</h1>

        <div className="mb-4 text-white text-sm">
          <p className='font-bold text-lg'>To receive notifications :</p> 
          <p>1. Get permission</p>
          <p>2. Get token</p>
          <p>3. Copy token by clicking inside the box on the text.</p>
          </div>
        
        <div className='flex items-center justify-between my-2'><button onClick={async()=>{await getNotificationPermission()}} className='text-blue-900 font-bold w-40 h-10 bg-green-400 rounded-lg text-sm'>Get notif permission</button>
        <button onClick={async()=>{const token = await getMessagingToken();setText(token as string)}} className='text-blue-900 font-bold w-32 h-10 bg-blue-400 rounded-lg text-sm'>Get token</button></div>
        
        <p className='mt-4'>token</p>
        <button onClick={copyToClipboard} className='mb-4 border overflow-auto h-20 rounded-lg px-4 py-2 text-sm font-bold text-white'><p>{text}</p></button>
    </div>
    <ToastContainer />
      </div>
  )
}

export default App