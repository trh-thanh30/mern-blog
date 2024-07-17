/* eslint-disable react/no-unescaped-entities */
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
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
        <form>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          ></TextInput>
        </form>
        <Button
          className="w-12 h-10 flex items-center lg:hidden"
          color={"gray"}
          pill
        >
          <AiOutlineSearch className="text-lg"></AiOutlineSearch>
        </Button>
        <div className="flex gap-2 items-center md:order-2">
          <Button className="w-12 h-10 sm:inline hidden" color={"gray"} pill>
            <FaMoon></FaMoon>
          </Button>
          <Link to={"/sign-in"}>
            <Button gradientDuoTone={"purpleToBlue"} outline>
              Sign In
            </Button>
          </Link>
          <Navbar.Toggle></Navbar.Toggle>
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link className="text-lg font-semibold block" to="/">
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link className="text-lg font-semibold block" to="/about">
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link className="text-lg font-semibold block" to="/projects">
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
