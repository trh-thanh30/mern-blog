import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import AboutPage from "./pages/About";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProjectsPage from "./pages/Projects";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/about" element={<AboutPage></AboutPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/projects" element={<ProjectsPage></ProjectsPage>}></Route>

        <Route
          path="/dashboard"
          element={<DashboardPage></DashboardPage>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
