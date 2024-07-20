/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgess, setImageFileUploadingProgress] = useState();
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
  const [imageFileUpLoading, setImageFileUpLoading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModel] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    setImageFileUpLoading(true);
    setImageFileUploadingError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadingError(
          `Could not upload image (File must be less than 2MB), ${error}`
        );
        setImageFileUploadingProgress(null);
        setImageFileUrl(null);
        setImageFile(null);
        setImageFileUpLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUpLoading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUpLoading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserError("Failed to update user's profile", err.message);
    }
  };
  const offAlert = () => {
    return setUpdateUserError(null) || setUpdateUserSuccess(null);
  };
  const handleDeleteUser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <div className="my-3">
        {updateUserSuccess && (
          <Alert onDismiss={() => offAlert()} color="success" className="mt-4">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert
            onDismiss={() => offAlert()}
            color={"failure"}
            className="mt-4"
          >
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert
            onDismiss={() => offAlert()}
            color={"failure"}
            className="mt-4"
          >
            {error}
          </Alert>
        )}
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        <div
          className="relative self-center w-32 h-32 overflow-hidden rounded-full shadow-md cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgess && (
            <CircularProgressbar
              value={imageFileUploadingProgess || 0}
              text={`${imageFileUploadingProgess}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadingProgess / 100})`,
                },
              }}
            ></CircularProgressbar>
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user-imgae"
            className={`w-full h-full border-8 object-cover border-solid rounded-full border-[lightgray] ${
              imageFileUploadingProgess &&
              imageFileUploadingProgess < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadingError && <Alert color="failure"></Alert>}

        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          placeholder="Username"
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          placeholder="Email"
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          defaultValue={currentUser.username}
          onChange={handleChange}
        ></TextInput>
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          Update
        </Button>
      </form>
      <div className="flex items-center justify-between mt-2">
        <span
          onClick={() => setShowModel(true)}
          className="p-2 text-red-500 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="p-2 text-red-500 cursor-pointer"
        >
          Sign Out
        </span>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModel(false)}
        popup
        size={"md"}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200"></HiOutlineExclamationCircle>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDeleteUser} color={"failure"}>
                Yes, I'm sure
              </Button>
              <Button color={"gray"} onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
