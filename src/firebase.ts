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

// Function to detect Chrome on Android
function isChromiumBasedAndroid() {
	return /android/i.test(navigator.userAgent) &&
		   /chrome/i.test(navigator.userAgent) &&
		   !(/firefox|opera|edge|opr\//i.test(navigator.userAgent));
  }
  
type notificationOptions = { body: string,
	icon: "./icon-192x192.png",
	requireInteraction: boolean,
	tag: "renotify",
	data: {
	  time: string,
	  message: "new order",
	},}
// Function to show notification
function showNotification(title:string, options:notificationOptions) {

	alert(navigator.userAgent);

	if (isChromiumBasedAndroid()) {
	  // Use service worker to show notification on Chrome for Android
	  if ('serviceWorker' in navigator && 'PushManager' in window) {
		navigator.serviceWorker.ready.then(function(registration) {
		  registration.showNotification(title, options);
		});
	  } else {
		console.warn("Service Worker or Push API not supported on this browser");
	  }
	} else {
	  // Use standard Notification API for other browsers
	  Notification.requestPermission().then(function (permission) {
		if (permission === "granted") {
		  new Notification(title, options);
		}
	  });
	}
  }
  
// Usage in your onMessage handler
onMessage(messaging, (payload) => {
	console.log("Message received in firebase.ts=> ", payload.notification);
  
	const audio = new Audio("./notification.mp3");
	audio.play();
  
	showNotification("Foreground", {
	  body: "Foreground",
	  icon: "./icon-192x192.png",
	  requireInteraction: true,
	  tag: "renotify",
	  data: {
		time: new Date(Date.now()).toString(),
		message: "new order",
	  },
	});
  });

export { app, messaging };