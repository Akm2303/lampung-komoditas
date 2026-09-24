/**
 * Konfigurasi Firebase Web.
 * ⚠️ Nilai apiKey di sini AMAN dipublikasikan — bukan rahasia.
 * Yang WAJIB dirahasiakan adalah SERVICE ACCOUNT KEY (jangan taruh di frontend!).
 * Keamanan data dijaga lewat Firestore Security Rules (lihat firestore.rules).
 */
export const firebaseConfig = {
  apiKey:            "ISI_API_KEY",
  authDomain:        "lampung-commodity-hub.firebaseapp.com",
  projectId:         "lampung-commodity-hub",
  storageBucket:     "lampung-commodity-hub.appspot.com",
  messagingSenderId: "ISI_SENDER_ID",
  appId:             "ISI_APP_ID",
};