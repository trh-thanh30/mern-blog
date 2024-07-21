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
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
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
        <Route path="/post/:postSlug" element={<PostPage></PostPage>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute></OnlyAdminPrivateRoute>}>
          <Route
            path="/create-post"
            element={<CreatePost></CreatePost>}
          ></Route>
          <Route
            path="/update-post/:postId"
            element={<UpdatePost></UpdatePost>}
          ></Route>
        </Route>
      </Routes>
      <FooterCom></FooterCom>
    </BrowserRouter>
  );
}

export default App;
