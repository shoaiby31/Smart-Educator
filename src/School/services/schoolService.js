import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { db, storage } from "../../config/firebase";

const COLLECTION = "schools";

const create = async (ownerUid, data) => {
  const schoolRef = doc(db, COLLECTION, ownerUid);

  await setDoc(schoolRef, {
    ownerUid,

    instituteName: data.instituteName,
    instituteAddress: data.instituteAddress,
    city: data.city,
    province: data.province,
    country: data.country,
    postalCode: data.postalCode,
    phone: data.phone,
    email: data.email || "",
    website: data.website || "",

    logoUrl: "",
    coverPhotoUrl: "",

    academicSession: data.academicSession || "",

    timezone: "Asia/Karachi",
    currency: "PKR",
    language: "en",
    status: "active",

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

const get = async (ownerUid) => {
  const schoolRef = doc(db, COLLECTION, ownerUid);

  const snapshot = await getDoc(schoolRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

const update = async (ownerUid, data) => {
  const schoolRef = doc(db, COLLECTION, ownerUid);

  await updateDoc(schoolRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

const uploadLogo = async (ownerUid, file) => {
  const storageRef = ref(storage, `schools/${ownerUid}/logo`);

  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);

  await update(ownerUid, {
    logoUrl: downloadURL,
  });

  return downloadURL;
};

const uploadCover = async (ownerUid, file) => {
  const storageRef = ref(storage, `schools/${ownerUid}/cover`);

  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);

  await update(ownerUid, {
    coverPhotoUrl: downloadURL,
  });

  return downloadURL;
};

const schoolService = {
  create,
  get,
  update,
  uploadLogo,
  uploadCover,
};

export default schoolService;