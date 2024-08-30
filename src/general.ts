import {  messaging } from "./firebase";
import { getToken } from "firebase/messaging";

export const getNotificationPermission = async () => {
	Notification.requestPermission().then(async (permission) => {
		if (permission === "granted") {
			console.log("Notification permission has been granted.");

			const messagingToken = await getMessagingToken();

			console.log("messagingToken =>", messagingToken);
		} else {
			alert(
				"Please allow notifications or enable them from device settings",
			);
		}
	});

	try {
		Notification.requestPermission().then((permission) => {
			checkNotificationPermissionGranted(permission);
		});
	} catch (error) {
		if (error instanceof TypeError) {
			Notification.requestPermission((permission) => {
				checkNotificationPermissionGranted(permission);
			});
		} else {
			throw error;
		}
	}
};

async function checkNotificationPermissionGranted(
	permission: string,
) {
	// console.log(
	// 	"apiKey:",
	// 	import.meta.env.VITE_FIREBASE_API_KEY,
	// 	"authDomain:",
	// 	import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	// 	"databaseURL:",
	// 	import.meta.env.VITE_FIREBASE_DATABASE_URL,
	// 	"projectId:",
	// 	import.meta.env.VITE_FIREBASE_PROJECT_ID,
	// 	"storageBucket:",
	// 	import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	// 	"messagingSenderId:",
	// 	import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	// 	"appId:",
	// 	import.meta.env.VITE_FIREBASE_APP_ID,
	// 	"measurementId:",
	// 	import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
	// );
	if (permission === "granted") {
		console.log("Notification permission has been granted.");

		const messagingToken = await getMessagingToken();

		if (messagingToken) {
			console.log(
				"messagingToken to be send to server=>",
				messagingToken,
			);
			// alert(messagingToken);
			localStorage.setItem(
				"fcm_token",
				JSON.stringify(messagingToken),
			);

			sendTokenToServer(messagingToken as string);
		} else {
			// setTokenSentToServer;
			// false;
		}
	} else {
		if (
			/* if we're on iOS,ask user to enable permission manually */
			navigator.platform.includes("Mac") ||
			navigator.platform.includes("iPad") ||
			navigator.platform.includes("iPhone")
		) {
			Notification.requestPermission((permission) => {
				checkNotificationPermissionGranted(permission);
			});
		} else {
			alert(
				"Please allow notifications or enable them from device settings",
			);
			// setTokenSentToServer(false);
		}
	}
}

//logic to send msg token to server
function sendTokenToServer(token: string) {
	// if (!isTokenSentToServer()) {
	console.log("Sending token to server ...", token);
	//api to send token to server
	//if api successful set true
	// setTokenSentToServer(true);
	// } else {
	// console.log("Token already sent to server");
	// }
}
// function isTokenSentToServer() {
// 	return window.localStorage.getItem("sentToServer") === "1";
// }
// function setTokenSentToServer(sent: boolean) {
// 	return window.localStorage.setItem(
// 		"sentToServer",
// 		sent ? "1" : "0",
// 	);
// }

export const getMessagingToken = async () => {
	try {
		const messagingToken = await getToken(messaging, {
			vapidKey: 'BDRDytlZwyuEaGb2oLk3tit65oIZGMJbQ_4mTI1RWHYbF3TF4mNaypkPIA3g1_OdDWi26DSFjs4sVBeaYzWpivY',
		});

		if (messagingToken) {
			return messagingToken;
		} else {
			alert(
				"No registration token available. Request permission to generate one.",
			);
		}
	} catch (err) {
		// alert("An error occurred while retrieving token. ");
		// alert(err);
		throw new Error("An error occurred while retrieving token. ");
	}
};