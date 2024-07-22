/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentUser from "./CommentUser";

export default function Comment({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  console.log(comments);
  const [errorComment, setErrorComment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setErrorComment(null);
        setComments((prevComments) => [data, ...prevComments]);
      }
    } catch (error) {
      setErrorComment("Failed to publish, please try again");
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="w-full max-w-2xl p-3 mx-auto">
      {currentUser ? (
        <div className="flex items-center justify-center gap-1 my-5 text-sm text-gray-500">
          <p>Signed in as:</p>
          <img
            className="object-cover w-5 h-5 rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            className="text-xs text-cyan-600 hover:underline"
            to={`/dashboard?tab=profile`}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-1 my-5 text-sm text-gray-500 dark:text-gray-400">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="p-3 border border-teal-500 border-solid rounded-md"
        >
          <Textarea
            placeholder="Add a comment..."
            rows={"3"}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            maxLength={"200"}
          ></Textarea>
          <div className="flex items-center justify-between mt-5">
            <p className="text-sm text-gray-500">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone={"purpleToBlue"} type="submit">
              Submit
            </Button>
          </div>
          {errorComment && <Alert color="failure">{errorComment}</Alert>}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="my-5 text-sm">No comments yet</p>
      ) : (
        <>
          <div className="flex items-center gap-1 my-5 text-sm">
            <p>Comments</p>
            <div className="px-2 py-1 border border-gray-400 border-solid rounded-sm">
              <p className="">{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <CommentUser comment={comment} key={comment._id}></CommentUser>
          ))}
        </>
      )}
    </div>
  );
}
