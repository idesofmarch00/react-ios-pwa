import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: "AIzaSyDjHF1z0Vq6bm4gXPDXBwarGIA6V969MWA",
	authDomain: "fir-ios-pwa-fcm.firebaseapp.com",
	projectId: "fir-ios-pwa-fcm",
	storageBucket: "fir-ios-pwa-fcm.appspot.com",
	messagingSenderId: "949015997290",
	appId: "1:949015997290:web:6b3aa6014df65dd85c5313"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload onmessagelistener", payload)
      resolve(payload);
    });
});

type notificationOptions = { body: string,
	icon: "./icon-192x192.png",
	requireInteraction: boolean,
	tag: "renotify",
	data: {
	  time: string,
	  message: "new order",
	},}
  
// Usage in your onMessage handler
onMessage(messaging, (payload) => {
	console.log("Message received in firebase.ts=> ", payload.notification);
	alert("Foreground message received: " + payload.notification?.title + " " + payload.notification?.body);
  
	// const audio = new Audio("./notification.mp3");
	// audio.play();
  
	showNotification(payload.notification?.title as string, {
	  body: payload.notification?.body as string,
	  icon: "./icon-192x192.png",
	  requireInteraction: true,
	  tag: "renotify",
	  data: {
		time: new Date(Date.now()).toString(),
		message: "new order",
	  },
	});
  });


function showNotification(title: string, options: notificationOptions) {
	const platform = detectPlatform();
	
	switch(platform) {
	  case 'iOS':
		// On iOS, we'll use a custom alert or UI element
		showIOSAlert(title, options.body);
		break;
	  case 'Android':
		if ('serviceWorker' in navigator && 'PushManager' in window) {
		  navigator.serviceWorker.ready.then(function(registration) {
			registration.showNotification(title, options);
		  });
		} else {
		  console.warn("Service Worker or Push API not supported on this browser");
		}
		break;
		case 'Other':
			// For other platforms, use the Notification API
			Notification.requestPermission().then(function (permission) {
			  if (permission === "granted") {
				new Notification(title, options);
			  }
			});
			break;
		 default:
	// For other platforms, use the Notification API
	Notification.requestPermission().then(function (permission) {
		if (permission === "granted") {
		  new Notification(title, options);
		}
	  });
	}
  }
  
function showIOSAlert(title: string, body: string) {
	// Implement a custom alert for iOS
	// This could be a custom UI element in your app
	alert(`${title}\n\n${body}`);
  }


function detectPlatform() {
	const userAgent = navigator.userAgent || navigator.vendor
	
	if (/android/i.test(userAgent)) {
	  return 'Android';
	}
	
	if (/iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window)) {
	  return 'iOS';
	}
	
	if (/chrome/i.test(userAgent) && /android/i.test(userAgent)) {
	  return 'ChromeAndroid';
	}
	
	return 'Other';
}
export { app, messaging };