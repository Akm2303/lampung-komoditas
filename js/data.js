import { db } from "./firebase-init.js";
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ---------- COMMODITIES ---------- */
export async function fetchCommodities() {
  const q = query(collection(db, "commodities"), orderBy("name"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchCommodityBySlug(slug) {
  const q = query(collection(db, "commodities"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

export async function createCommodity(data) {
  return addDoc(collection(db, "commodities"), { ...data, createdAt: serverTimestamp() });
}

export async function updateCommodity(id, data) {
  return updateDoc(doc(db, "commodities", id), data);
}

export async function deleteCommodity(id) {
  return deleteDoc(doc(db, "commodities", id));
}

/* ---------- USERS ---------- */
export async function fetchUsers() {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateUser(id, data) {
  return updateDoc(doc(db, "users", id), data);
}

/* ---------- COMPANY & OWNER ---------- */
export async function fetchCompany() {
  const snap = await getDoc(doc(db, "settings", "company"));
  return snap.exists() ? snap.data() : {};
}
export async function fetchOwner() {
  const snap = await getDoc(doc(db, "settings", "owner"));
  return snap.exists() ? snap.data() : {};
}
export async function saveCompany(data) {
  return setDoc(doc(db, "settings", "company"), data, { merge: true });
}
export async function saveOwner(data) {
  return setDoc(doc(db, "settings", "owner"), data, { merge: true });
}