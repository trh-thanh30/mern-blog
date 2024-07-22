/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import moment from "moment";
export default function CommentUser({ comment }) {
  const [user, setUser] = useState({});
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
            {user ? `@${user.username}` : "anonymus user"}
          </span>
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="pb-2 text-gray-500">{comment.content}</p>
      </div>
    </div>
  );
}
