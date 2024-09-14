import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Form from "./components/Form";
import Cards from "./pages/Cards";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState("Ro'yxatdan O'tish");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [isUser, setIsUser] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Form
                isUser={isUser}
                setIsUser={setIsUser}
                loader={loader}
                login={login}
                setLogin={setLogin}
                password={password}
                setPassword={setPassword}
                user={user}
                setUser={setUser}
                setLoader={setLoader}
              />
            }
          />

          <Route path="/cards" element={<Cards />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
