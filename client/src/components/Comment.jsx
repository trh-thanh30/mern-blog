/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CommentUser from "./CommentUser";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function Comment({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [comments, setComments] = useState([]);
  const [errorComment, setErrorComment] = useState(null);
  const navigate = useNavigate();

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

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Like response data:", data); // Debugging log
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map(
        (c) => (c._id = comment._id ? { ...c, content: editedContent } : c)
      )
    );
  };
  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setComment(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error);
    }
  };
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
              <p className="w-2">{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <CommentUser
              onEdit={handleEdit}
              onLike={handleLike}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
              comment={comment}
              key={comment._id}
            ></CommentUser>
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size={"md"}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200"></HiOutlineExclamationCircle>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleDelete(commentToDelete)}
                color={"failure"}
              >
                Yes, I'm sure
              </Button>
              <Button color={"gray"} onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
