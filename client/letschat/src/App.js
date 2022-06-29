// import "./App.css";
import { Chat } from "./Chat";
import { HomePage } from "./HomePage";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";

function App() {
  let navigate = useNavigate();
  const enter = (data) => {
    // console.log("DONE");
    // socket.emit("SendName");
    navigate("/chat");
  };

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage enter={enter} />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      {/* {fg === 0 ? <HomePage enter={enter} /> : <Chat />} */}
    </div>
  );
}

export default App;
