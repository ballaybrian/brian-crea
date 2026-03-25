import { db, initFirebase, collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp } from "./firebase-config.js";
let started = false;
export async function startFirebase() { if (started) return; await initFirebase(); started = true; }
export async function saveDocumentToCloud(data) {
  await startFirebase();
  const payload = { ...data, updatedAt: serverTimestamp(), createdAt: data.createdAt || serverTimestamp() };
  await setDoc(doc(db, "documents", data.number), payload, { merge: true });
}
export async function deleteDocumentFromCloud(number) { await startFirebase(); await deleteDoc(doc(db, "documents", number)); }
export async function subscribeDocuments(callback) {
  await startFirebase();
  const q = query(collection(db, "documents"), orderBy("updatedAt", "desc"));
  return onSnapshot(q, snapshot => callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))));
}
