import {initializeApp} from "firebase/app";
import {getFirestore, doc, getDoc, setDoc, getDocs, collection} from 'firebase/firestore/lite';
import {v4 as uuidv4} from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyB-GiYH7ih7A1_EHlah9i5dq-3OcAZ6tYw",
  authDomain: "afamia-terminplaner.firebaseapp.com",
  projectId: "afamia-terminplaner",
  storageBucket: "afamia-terminplaner.appspot.com",
  messagingSenderId: "363932573290",
  appId: "1:363932573290:web:d10c07f56e90f4ca427413"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getAllUsers() {
  const userArray = []
  const collRef = collection(db, 'User')
  await getDocs(collRef).then((docs)=>docs.forEach((doc)=>userArray.push(doc.data())))
  return userArray
}

export async function getAllAppointments() {
  const appointmentArray = []
  const collRef = collection(db, 'Termine')
  await getDocs(collRef).then((docs)=>docs.forEach((doc)=>appointmentArray.push(doc.data())))
  return appointmentArray
}

export async function readComment(recipeID) {
  const docRef = doc(db, 'comments/' + recipeID);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function addAppointment(friseur, kunde, date, duration) {
  let myuuid = uuidv4();
  const docRef = doc(db, 'Termine/' + myuuid);
  await setDoc(docRef, {
    fid: friseur,
    knd: kunde,
    date: date,
    dur: duration
  }, {merge: true});
}