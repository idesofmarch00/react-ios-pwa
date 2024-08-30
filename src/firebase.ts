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

//for foreground notification, 100% working
onMessage(messaging, (payload) => {
	console.log(
		"foreground,message received in firebase.ts=> ",
		payload.notification,
	);
	// alert("foreground Notification received index.ts alert");

	const audio = new Audio("./notification.mp3");
	audio.play();

	if (Notification.permission === "granted") {
		// Create a notification
		// const notification = new Notification("New order !", {
		// 	body: "Please start the delivery",
		// 	icon: "../../public/icons/maskable_icon_x48.png",
		// 	requireInteraction: true,
		// 	badge: "./../public/icons/maskable_icon_x48.png",
		// 	// image: "./../public/icons/maskable_icon_x48.png",
		// 	tag: "renotify",
		// 	// renotify: true,
		// 	// sound: "../src/assets/sounds/notification.mp3",
		// 	// timestamp: Date.parse(new Date()),
		// 	// actions: [
		// 	// 	{
		// 	// 		action: "open-app",
		// 	// 		// type: "button",
		// 	// 		title: "Order",
		// 	// 		icon: "../src/assets/tanker-truck.svg",
		// 	// 	},
		// 	// ],
		// 	data: {
		// 		time: new Date(Date.now()).toString(),
		// 		message: "new order",
		// 	},
		// });

		const notification = new Notification(payload.notification?.title as string, {
			body: payload.notification?.body,
			icon: "./icon-192x192.png",
			requireInteraction: true,
			badge: "./icon-192x192.png",
			// image: "./../public/icons/maskable_icon_x48.png",
			tag: "renotify",
			// renotify: true,
			// sound: "../src/assets/sounds/notification.mp3",
			// timestamp: Date.parse(new Date()),
			// actions: [
			// 	{
			// 		action: "open-app",
			// 		// type: "button",
			// 		title: "Order",
			// 		icon: "../src/assets/tanker-truck.svg",
			// 	},
			// ],
			data: {
				time: new Date(Date.now()).toString(),
				message: "new order",
			},
		});

		// Handle click on the notification (optional)
		notification.addEventListener("click", () => {
			// Do something when the user clicks the notification
			// window.open("/", "_blank");
			console.log("do something when notif clicked")
		});
	} else if (Notification.permission !== "denied") {
		// If permission isn't granted or denied, request permission
		Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				// Now you can create the notification
				const notification = new Notification(
					"New order assigned !",
					{
						body: "Please start the delivery",
						icon: "../../public/icons/maskable_icon_x48.png", // Replace with the path to your notification icon
					},
				);

				// Handle click on the notification (optional)
				notification.addEventListener("click", () => {
					alert("Notification clicked");
				});
			}
		});
	}
});

export { app, messaging };