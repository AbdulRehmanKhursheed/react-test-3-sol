import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Auth/Signup/SignUp";
import SignIn from "./components/Auth/Signin/SignIn";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
