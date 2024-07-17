/* eslint-disable react/no-unescaped-entities */
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitterX,
  BsMessenger,
} from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 ">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className={` self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white `}
            >
              <span
                className={` px-2 rounded-xl text-white py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `}
              >
                HuuThanh's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About"></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://trh-thanh30.github.io/the-moviess/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Movies
                </Footer.Link>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer">
                  Ecommerce Tech
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow me"></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/trh-thanh30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal"></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider></Footer.Divider>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="HuuThanh's blog"
            year={new Date().getFullYear()}
          ></Footer.Copyright>
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/profile.php?id=100046281706417&locale=vi_VN"
              icon={BsFacebook}
            ></Footer.Icon>
            <Footer.Icon href="#" icon={BsInstagram}></Footer.Icon>
            <Footer.Icon
              href="https://github.com/trh-thanh30"
              icon={BsGithub}
            ></Footer.Icon>
            <Footer.Icon href="#" icon={BsTwitterX}></Footer.Icon>
            <Footer.Icon href="#" icon={BsMessenger}></Footer.Icon>
          </div>
        </div>
      </div>
    </Footer>
  );
}
