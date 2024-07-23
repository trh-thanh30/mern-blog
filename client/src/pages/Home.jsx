/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Spinner } from "flowbite-react";
import ScrollToTop from "../components/ScrollToTop";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?limit=6`);
        setLoading(false);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen ">
          <Spinner className="w-14"></Spinner>
        </div>
      ) : (
        <>
          <ScrollToTop> </ScrollToTop>
          <div>
            <div className="flex flex-col max-w-6xl gap-6 px-3 mx-auto p-28">
              <h1 className="text-3xl font-bold lg:text-6xl">
                Welcome to my Blog
              </h1>
              <p className="text-xs text-gray-500 sm:text-sm">
                Here you'll find a variety of articles and tutorials on topics
                such as web development, software engineering, progamming
                languages, and more.
              </p>{" "}
              <Link
                to={"/search"}
                className="text-xs font-bold text-teal-500 sm:text-sm hover:underline"
              >
                View all posts
              </Link>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700">
              <CallToAction></CallToAction>
            </div>
            <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto py-7">
              {posts && posts.length > 0 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-semibold text-center">
                    Recent Posts
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {posts.map((post) => (
                      <PostCard key={post._id} post={post}></PostCard>
                    ))}
                  </div>
                  <Link
                    className="text-lg text-center text-teal-500 hover:underline"
                    to={"/search"}
                  >
                    View all posts
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
