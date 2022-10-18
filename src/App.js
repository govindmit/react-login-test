import Registration from "./component/Registration";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
