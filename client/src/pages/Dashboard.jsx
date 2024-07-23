import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSideBar from "../components/DashSideBar";
import DashPosts from "../components/DashPosts";
import DashUser from "../components/DashUser";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
export default function DashboardPage() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSideBar></DashSideBar>
      </div>

      {/* Profile... */}
      {tab === "profile" && <DashProfile></DashProfile>}
      {/* posts ... */}
      {tab === "posts" && <DashPosts></DashPosts>}
      {/* Users ... */}
      {tab === "user" && <DashUser></DashUser>}
      {/* Comments ... */}
      {tab === "comments" && <DashComments></DashComments>}
      {/* dashboard comp */}
      {tab === "dash" && <DashboardComp></DashboardComp>}
    </div>
  );
}
