import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-full max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="self-center w-32 h-32 overflow-hidden rounded-full shadow-md cursor-pointer">
          <img
            src={currentUser.profilePicture}
            alt="user-imgae"
            className="w-full h-full border-8 object-cover border-solid rounded-full border-[lightgray]"
          />
        </div>
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
