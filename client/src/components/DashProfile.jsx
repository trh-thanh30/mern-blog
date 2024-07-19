import { Alert, Button, TextInput } from "flowbite-react";
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
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgess, setImageFileUploadingProgress] = useState();
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
  const filePickerRef = useRef();

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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="w-full max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          placeholder="Username"
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
        ></TextInput>
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          Update
        </Button>
      </form>
      <div className="flex items-center justify-between mt-2">
        <span className="text-red-500">Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  );
}
