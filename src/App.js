import Header from "./Header";
import Sidebar from "./Sidebar";
import Data from "./Data";
import { useState } from "react";
import { auth, provider } from "./firebase";

function App() {

  const [user, SetUser] = useState(null);
  const signIn = () => {
    auth.signInWithPopup(provider).then(({user}) => {
      SetUser(user)
    }).catch(error => {
      alert(error.message)
    })
  }

  return (
    <>
    {
      user ? (
        <>
        <Header photoURL={user.photoURL}/>
        <div className="App">
          <Sidebar />
          <Data />
        </div>
        </>
      ):(
        <div className="login_page">
          <img src="https://tse1.mm.bing.net/th?id=OIP.JsM4JQenSv5KTf-OStOCdgHaEK&pid=Api&rs=1&c=1&qlt=95&w=203&h=114"/>
          <button onClick={signIn}>Login to Google Drive Clone</button>
        </div>
      )
    }
      
    </>
  );
}

export default App;
