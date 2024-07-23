/* eslint-disable react/no-unescaped-entities */
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const loaction = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(loaction.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    if (searchTermFormUrl) {
      setSearchTerm(searchTermFormUrl);
    }
  }, [location.search]);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <header className="shadow-md">
      <Navbar className="">
        <Link
          to="/"
          className={` self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white `}
        >
          <span
            className={` px-2 rounded-xl text-white py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `}
          >
            HuuThanh's
          </span>
          Blog
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(ev) => setSearchTerm(ev.target.value)}
          ></TextInput>
        </form>
        <Button
          className="flex items-center w-12 h-10 lg:hidden"
          color={"gray"}
          pill
        >
          <AiOutlineSearch className="text-lg"></AiOutlineSearch>
        </Button>
        <div className="flex items-center gap-2 md:order-2">
          <Button
            className="inline w-12 h-10 "
            color={"gray"}
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaMoon></FaMoon> : <FaSun></FaSun>}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture}
                  rounded
                ></Avatar>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider> </Dropdown.Divider>
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to={"/sign-in"}>
              <Button gradientDuoTone={"purpleToBlue"} outline>
                Sign In
              </Button>
            </Link>
          )}
          <Navbar.Toggle></Navbar.Toggle>
        </div>
        <Navbar.Collapse fluid rounded>
          <Navbar.Link
            active={path === "/"}
            as={"div"}
            className="border-b-[1px] border-gray-300 border-solid"
          >
            <Link className="block text-lg font-semibold " to="/">
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link
            className="border-b-[1px] border-gray-300 border-solid"
            active={path === "/about"}
            as={"div"}
          >
            <Link className="block text-lg font-semibold" to="/about">
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link
            className="border-b-[1px] border-gray-300 border-solid"
            active={path === "/projects"}
            as={"div"}
          >
            <Link className="block text-lg font-semibold" to="/projects">
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
