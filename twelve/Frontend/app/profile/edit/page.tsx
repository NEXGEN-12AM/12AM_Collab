"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState("/profile-image.png");
  const [gender, setGender] = useState("male");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageURL = URL.createObjectURL(event.target.files[0]);
      setProfilePic(imageURL);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile Updated:", formData);
    router.push("/profile"); // ✅ Redirects to profile page after save
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-white shadow-md rounded-md">
      <h1 className="text-center text-2xl font-bold mb-6">EDIT PROFILE</h1>
      <hr className="mb-6" />

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center space-y-2">
        <div className="border-2 border-black p-1 rounded-lg">
          <Image src={profilePic} alt="Profile Pic" width={120} height={140} className="rounded-md" />
        </div>
        <input type="file" onChange={handleProfilePicChange} className="hidden" id="file-upload" />
        <label
  htmlFor="file-upload"
  className="mt-2 px-6 py-1 border-2 border-black text-black font-semibold cursor-pointer transition rounded-md 
  hover:bg-black hover:text-white"
>
  CHANGE
</label>
      </div>

      {/* Gender Selection */}
      <div className="mt-6">
        <label className="text-lg font-bold">Gender :</label>
        <div className="flex items-center space-x-6 mt-4">
          <label className="flex items-center">
            <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} />
            <span className="ml-2">Male</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} />
            <span className="ml-2">Female</span>
          </label>
        </div>
      </div>

      {/* Input Fields */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-2 border border-black rounded" />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-2 border border-black rounded" />
          </div>
        </div>

        <div className="mt-4">
          <label>Telephone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-2 border border-black rounded" />
        </div>

        <div className="mt-4">
          <label>Date of birth (DD/MM/YYYY)</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full p-2 border border-black rounded" />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 mt-6 rounded hover:bg-gray-800">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
