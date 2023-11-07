import { useEffect, useState } from "react";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZQHyvysxwYC2kaJsHPjHBSvQv1gkivKc",
  authDomain: "blog-with-auth-6ee13.firebaseapp.com",
  projectId: "blog-with-auth-6ee13",
  storageBucket: "blog-with-auth-6ee13.appspot.com",
  messagingSenderId: "326989743724",
  appId: "1:326989743724:web:e1b630383c097e540afa49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)





const Home = () => {
    const [titles, setTitles] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
  
    useEffect(() => {
      const fetchTitles = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "posts"));
          const loadedTitles = [];
            
          querySnapshot.forEach((doc) => {
            loadedTitles.push(
            <div>
                <h1 key={doc.id}>{doc.data().title}</h1>
                <p key={doc.id}>{doc.data().body}</p>
            </div>
            );
          });
  
          setTitles(loadedTitles);
          setIsPending(false);
        } catch (error) {
          setError("Błąd podczas pobierania danych: " + error.message);
          setIsPending(false);
        }
      };
  
      fetchTitles();
    }, []);
  
    return (
      <div className="home">
        {error && <div>{error}</div>}
        {isPending && <div>Loading</div>}
        {titles}
      </div>
    );
  };
  
  export default Home;