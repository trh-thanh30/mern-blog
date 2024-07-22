/* eslint-disable no-unused-vars */
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import Comment from "../components/Comment";
import PostCard from "../components/PostCard";
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
  useEffect(() => {
    try {
      const fetchRencentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRencentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={"xl"}></Spinner>
      </div>
    );
  }
  return (
    <main className="flex flex-col max-w-6xl min-h-screen p-3 mx-auto">
      <h1 className="max-w-2xl p-3 mx-auto mt-10 font-serif text-3xl text-center lg:text-4xl">
        {post?.title}
      </h1>
      <Link
        to={`/search?category=${post?.category}`}
        className={"self-center mt-5"}
      >
        <Button color={"gray"} pill size={"xs"}>
          {post?.category}
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post?.title}
        className=" mt-10 max-h-[600px] w-full object-cover rounded-lg"
      />
      <div className="flex items-center justify-between w-full max-w-2xl p-3 mx-auto text-xs border-b border-solid border-slate-400">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="w-full max-w-2xl p-3 mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      <div className="w-full max-w-4xl mx-auto">
        <CallToAction></CallToAction>
      </div>
      <Comment postId={post._id}></Comment>
      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="mt-5 text-3xl font-semibold">Recent articales</h1>
        <div className="flex flex-wrap justify-center gap-5 mt-5">
          {recentPosts.length > 0 &&
            recentPosts.map((post) => (
              <PostCard key={post._id} post={post}></PostCard>
            ))}
        </div>
      </div>
    </main>
  );
}
