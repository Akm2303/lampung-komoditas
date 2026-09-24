import { auth, db } from "./firebase-init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, setDoc, getDoc, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================================================
   Production authentication WAJIB memakai:
   - HTTPS
   - Firebase Auth (sudah secure by default)
   - Firestore Security Rules untuk role-based access
   ========================================================= */

/** Ambil profil user (dokumen users/{uid}) */
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Register user baru + simpan profil ke Firestore */
export async function registerUser({ name, phone, email, password, userType }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });

  await setDoc(doc(db, "users", cred.user.uid), {
    name, phone, email,
    role: "user",           // default
    userType,               // Petani | Exportir | Pemilik Lahan
    status: "active",
    createdAt: serverTimestamp(),
  });

  return cred.user;
}

/** Login */
export async function loginUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const profile = await getUserProfile(cred.user.uid);
  return { user: cred.user, profile };
}

/** Logout */
export async function logoutUser() {
  await signOut(auth);
}

/** Guard halaman dashboard */
export function requireAuth(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) { location.href = "../login.html"; return; }
    const profile = await getUserProfile(user.uid);
    callback(user, profile);
  });
}

/** Guard dengan role tertentu */
export function requireRole(roles, callback) {
  requireAuth((user, profile) => {
    if (!profile || !roles.includes(profile.role)) {
      alert("Akses ditolak.");
      location.href = "../index.html";
      return;
    }
    callback(user, profile);
  });
}