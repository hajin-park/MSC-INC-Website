import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzPXtKlYgWPrPrqwACWabZBiQscZko6uk",
  authDomain: "msc-demo-c43c7.firebaseapp.com",
  projectId: "msc-demo-c43c7",
  storageBucket: "msc-demo-c43c7.appspot.com",
  messagingSenderId: "971794424262",
  appId: "1:971794424262:web:b4691059e9595b684912c7",
  measurementId: "G-V72ZKNSQ1G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;