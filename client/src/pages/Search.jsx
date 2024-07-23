import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  console.log(sidebarData);
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);

      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length < 9) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
      }
    };
    fetchPosts();
  }, [location.search]);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({
        ...sidebarData,
        sort: order,
      });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({
        ...sidebarData,
        category,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const serchQuery = urlParams.toString();
    navigate(`/search?${serchQuery}`);
  };
  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const serchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${serchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length < 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b border-gray-500 border-solid p-7 md:border-r md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select
              className="flex-1"
              onChange={handleChange}
              value={sidebarData.sort}
              id="sort"
            >
              <option value={"latest"}>Latest</option>
              <option value={"oldest"}>Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              className="flex-1"
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value={"uncategorized"}>Uncategorized</option>
              <option value={"javascript"}>Javascript</option>
              <option value={"reactjs"}>React.js</option>
              <option value={"nextjs"}>Next.js</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone={"purpleToPink"}>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="p-3 mt-5 text-3xl font-semibold border-gray-500 border-solid sm:border-b">
          Post results:
        </h1>
        <div className="flex flex-wrap gap-4 p-7">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && (
            <div className="flex items-center justify-center w-full min-h-screen">
              <Spinner size={"lg"}></Spinner>
            </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => (
              <PostCard key={post._id} post={post}></PostCard>
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-lg text-teal-500 p-7 hover:underline"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
