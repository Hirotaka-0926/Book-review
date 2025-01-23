import Header from "../Header";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState<string>("");
  const [cookies] = useCookies();
  const [iconUrl, setIconUrl] = useState<string>("");
  const token = cookies.token;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile(token);
      const data = await response.json();
      setName(data.name);
      setIconUrl(data.iconUrl);
    };

    fetchProfile();
  }, []);

  const handleUpload = async () => {
    const response = await updateProfile(name, token);
    if (response.ok) {
      console.log("更新成功");
      navigate("/");
    } else {
      console.log("更新失敗");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-exl font-bold mb-4">Profile</h1>
        <img src={iconUrl} alt="icon" className="w-24 h-24 rounded-full" />
        <div></div>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleUpload}
        >
          更新
        </button>
      </div>
    </div>
  );
};

export default Profile;
