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

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

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
	// 	body: "Please check the app to start delivery",
	// 	icon: "../../public/icons/maskable_icon_x48.png",
	// 	badge: "../../public/fuelbuddy-logo.svg",
	// 	image: "../../public/fuelbuddy-logo.svg",
	// 	tag: "renotify",
	// 	renotify: true,
	// 	requireInteraction: true,
	// 	// sound: "../src/assets/sounds/notification.mp3",
	// 	timestamp: Date.parse(new Date()),
	// 	actions: [
	// 		// { action: "playAudio", title: "Play Audio" },
	// 		{
	// 			action: "openApp",
	// 			type: "button",
	// 			title: "Order",
	// 			icon: "../src/assets/tanker-truck.svg",
	// 		},
	// 	],
	// 	data: {
	// 		time: new Date(Date.now()).toString(),
	// 		message: "going to dashboard ...",
	// 		click_action: "/dashboard",
	// 	},
	// };
	// const notificationTitle = "New Order";

	// //show notif
	// self.registration.showNotification(
	// 	notificationTitle,
	// 	notificationOptions,
	// );
});

//todo:remove if redundant in future
// Handle notification click
// self.addEventListener("notificationclick", (event) => {
// 	const clickedNotification = event.notification;
// 	clickedNotification.close();

// 	const promiseChain = clients.openWindow(
// 		event.notification.data.click_action,
// 	);
// 	// const promiseChain = clients.openWindow(
// 	// 	self.location.origin + "/dashboard",
// 	// );
// 	event.waitUntil(promiseChain);
// });

// //Handle notification click - audio and route
// self.addEventListener("notificationclick", (event) => {
// 	const action = event.action;

// 	// Handle notification actions
// 	switch (action) {
// 		// case "playAudio": {
// 		// 	// Play the audio in the context of your web page
// 		// 	const audio = new Audio(
// 		// 		"../src/assets/sounds/notification.mp3",
// 		// 	);
// 		// 	audio.play();
// 		// 	break;
// 		// }
// 		case "openApp":
// 			{
// 				const clickedNotification = event.notification;
// 				clickedNotification.close();

// 				//todo:remove after testing
// 				// // const promiseChain = clients.openWindow(
// 				// // 	event.notification.data.click_action,
// 				// // );
// 				// const promiseChain = clients.openWindow(
// 				// 	self.location.origin + "/dashboard",
// 				// );
// 				// event.waitUntil(promiseChain);
// 				// break;

// 				const urlToOpen = self.location.origin + "/dashboard";

// 				event.waitUntil(
// 					clients
// 						.matchAll({
// 							type: "window",
// 							includeUncontrolled: true,
// 						})
// 						.then((windowClients) => {
// 							for (const client of windowClients) {
// 								if (client.url === urlToOpen && "focus" in client) {
// 									return client.focus();
// 								}
// 							}

// 							return clients.openWindow(urlToOpen);
// 						}),
// 				);
// 			}
// 			break;
// 		default:
// 			// Handle default action
// 			break;
// 	}
// });

//todo: remove if confirmed doesn't work
// messaging.onMessage((payload) => {
// 	console.log("foreground,message received sw=> ", payload);
// 	alert("foreground Notification received sw");

// 	const notificationTitle = payload.notification.title;
// 	const notificationOptions = {
// 		body: payload.notification.body,
// 		icon: "./icons/fb_min_logo.png",
// 		badge: "./icons/fb_min_logo.png",
// 		tag: "renotify",
// 		renotify: true,
// 		requireInteraction: true,
// 		sound: "../src/assets/sounds/notification.mp3",
// 		timestamp: Date.parse(new Date()),
// 		actions: [
// 			{
// 				action: "open-app",
// 				type: "button",
// 				title: "Order",
// 				icon: "../src/assets/tanker-truck.svg",
// 			},
// 		],
// 		data: {
// 			time: new Date(Date.now()).toString(),
// 			message: "new order",
// 		},
// 	};

// 	self.registration.showNotification(
// 		notificationTitle,
// 		notificationOptions,
// 	);

// 	// // Handle click on the notification (optional)
// 	// notification.addEventListener("click", () => {
// 	// 	// Do something when the user clicks the notification
// 	// 	console.log("Notification clicked");
// 	// });
// });