// eslint-disable-next-line no-undef
importScripts(
	"https://www.gstatic.com/firebasejs/9.9.4/firebase-app-compat.js",
);
// eslint-disable-next-line no-undef
importScripts(
	"https://www.gstatic.com/firebasejs/9.9.4/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDjHF1z0Vq6bm4gXPDXBwarGIA6V969MWA",
  authDomain: "fir-ios-pwa-fcm.firebaseapp.com",
  projectId: "fir-ios-pwa-fcm",
  storageBucket: "fir-ios-pwa-fcm.appspot.com",
  messagingSenderId: "949015997290",
  appId: "1:949015997290:web:6b3aa6014df65dd85c5313"
};

// eslint-disable-next-line no-undef
firebase.initializeApp({ ...firebaseConfig });

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

//100% working
messaging.onBackgroundMessage((payload) => {
	console.log("background message received in sw => ", payload);

	//todo: remove if customisation not needed in future
	// payload.data.body;

	// Customize notification here

	// const notificationOptions = {
	// 	body: "Background Message body.",
	// 	icon: "../src/assets/fuelbuddy-logo.png",
	// };

	// const exampleOptions = {
	// 	//  "Visual Options",
	// 	body: "<String>",
	// 	icon: "<URL String>",
	// 	image: "<URL String>",
	// 	badge: "<URL String>",
	// 	dir: "<String of 'auto' | 'ltr' | 'rtl'>",
	// 	timestamp: "<Long>",

	// 	//   Both visual & behavioral options",
	// 	actions: "<Array of Strings>",
	// 	data: "<Anything>",

	// 	//    "Behavioral Options",
	// 	tag: "<String>",
	// 	requireInteraction: "<boolean>",
	// 	renotify: "<Boolean>",
	// 	vibrate: "<Array of Integers>", //depreceated in android
	// 	sound: "<URL String>",
	// 	silent: "<Boolean>",
	// };

	// const notificationOptions = {
	// 	body: "Background",
	// 	icon: "./favicon-16x16.png",
	// 	badge: "./favicon-32x32.png",
	// 	image: "./android-chrome-512x512.png",
	// 	tag: "renotify",
	// 	renotify: true,
	// 	requireInteraction: true,
	// 	sound: "./notification.mp3",
	// 	timestamp: Date.parse(new Date()),
	// 	actions: [
	// 		// { action: "playAudio", title: "Play Audio" },
	// 		{
	// 			action: "openApp",
	// 			type: "button",
	// 			title: "Order",
	// 			icon: "./vite.svg",
	// 		},
	// 	],
	// 	data: {
	// 		time: new Date(Date.now()).toString(),
	// 		message: "going to dashboard ...",
	// 		click_action: "/",
	// 	},
	// };
	// const notificationTitle = "Background";

	// // //show notif
	// self.registration.showNotification(
	// 	notificationTitle,
	// 	notificationOptions,
	// );
});
