import { useState } from "react";

const Profile = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6 bg-gray-50 min-h-screen">
      {/* Left Panel */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={image || "https://i.pravatar.cc/150?img=3"}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-full"
            />
            <button className="absolute top-0 right-0 bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center">
              ×
            </button>
          </div>
          <label className="mt-4 w-full text-center">
            <div className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded cursor-pointer">
              Upload Photo
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </label>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Change Password
        </button>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value="gene.rodrig"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value="Gene"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nickname</label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value="Gene.r"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              className="mt-1 w-full border px-3 py-2 rounded"
              defaultValue="Subscriber"
            >
              <option>Subscriber</option>
              <option>Admin</option>
              <option>Editor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value="Rodriguez"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Display Name Publicly as
            </label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value="Gene"
              readOnly
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">Contact Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Email (required)
            </label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value="gene.rodrig@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">WhatsApp</label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value="@gene-rod"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Website</label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value="gene-roding.webflow.io"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Telegram</label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value="@gene-rod"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">About the User</h2>
        <div>
          <label className="block text-sm font-medium">Biographical Info</label>
          <textarea
            rows={4}
            className="mt-1 w-full border px-3 py-2 rounded"
            defaultValue="Albert Einstein was a German mathematician and physicist who developed the special and general theories of relativity. In 1921, he won the Nobel Prize for physics for his explanation of the photoelectric effect. In the following decade."
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
