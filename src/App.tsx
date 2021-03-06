import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
