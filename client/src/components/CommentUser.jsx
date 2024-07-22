/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function CommentUser({ comment, onLike, onEdit, onDelete }) {
  console.log("Comment data:", comment); // Debugging log
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  // Check if the current user has liked the comment
  const hasLiked = currentUser && comment.likes.includes(currentUser._id);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex p-4 text-sm border-b border-gray-600 border-solid">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 bg-gray-200 rounded-full"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="mr-1 text-xs font-bold truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></Textarea>
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size={"sm"}
                onClick={handleSave}
                gradientDuoTone={"purpleToPink"}
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                type="button"
                size={"sm"}
                gradientDuoTone={"purpleToPink"}
                outline
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="pb-2 font-medium text-gray-500">{comment.content}</p>
            <div className="flex items-center gap-2 pt-2 text-xs border-t border-solid dark:border-gray-700 max-w-fit">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500  ${
                  hasLiked && "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-500 dark:text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      onClick={handleEdit}
                      type="button"
                      className="font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(comment._id)}
                      type="button"
                      className="font-semibold text-gray-500 dark:text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
