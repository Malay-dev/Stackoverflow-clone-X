import { BrowserRouter as Router } from "react-router-dom";
import RouterTemp from "./RouterTemp";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllQuestions } from "./actions/questions";
import { fetchAllUsers } from "./actions/users";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <RouterTemp />
      </Router>
    </div>
  );
}

export default App;
