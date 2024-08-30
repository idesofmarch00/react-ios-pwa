import React from 'react'
import Notification from './Notification'
import { getNotificationPermission,getMessagingToken } from './general';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">FCM Push Notification Test</h1>
        <p className="mb-4">This page is set up to receive push notifications from Firebase Cloud Messaging.</p>

        <button onClick={()=>{getNotificationPermission()}}>request notif token</button>
        <Notification />
      </div>
    </div>
  )
}

export default App