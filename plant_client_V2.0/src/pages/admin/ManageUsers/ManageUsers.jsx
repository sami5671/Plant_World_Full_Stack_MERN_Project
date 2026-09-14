import { FaTrash, FaUserGear, FaUsers } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";

import { Input } from "rizzui/input";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../features/adminControl/manageUsersApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../../features/adminControl/manageUsersControlSlice";
import { formateDate } from "./../../../components/shared/TimeAndDateFormate/FormateDate";

import { getAuth } from "firebase/auth";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { data: users, isLoading, isError, isSuccess } = useGetAllUsersQuery();
  const { filteredUser } = useSelector((state) => state?.manageUsers);
  const [deleteUser, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] =
    useDeleteUserMutation();
  const [deletingUserId, setDeletingUserId] = useState(null);

  // delete user from database & firebase
  const handleDeleteUser = async (item) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setDeletingUserId(item._id);
      const idToken = await user.getIdToken();
      try {
        const res = await deleteUser({
          userId: item?._id,
          uid: item?.providerId,
          idToken,
        }).unwrap(); // call redux mutation
        console.log("Deleted successfully", res);
        // Optionally you can refetch the users here or remove from local state
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setDeletingUserId(null);
      }
    }
  };

  // ----------------------------------------------------
  useEffect(() => {
    if (isSuccess && users) {
      dispatch(allUsers(users));
    }
  }, [dispatch, isSuccess, users]);

  // console.log(filteredUser[1].avatar);
  return (
    <>
      <div className="relative z-10">

        <section className="bg-white/70 backdrop-blur-xl border border-white/50 px-4 py-6 lg:px-8 lg:py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-3">
              Manage Users <FaUsers className="text-emerald-600" />
            </h1>
          </div>
          {/* searching and filtering */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <Input
                label="Search By ID"
                placeholder="Enter the User ID "
                inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3 w-full"
                // onChange={(e) => handleSearchById(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Search By Name"
                placeholder="Enter User Name"
                inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3 w-full"
                // onChange={(e) => handleSearchByName(e.target.value)}
              />
            </div>
          </div>
          {/* data table */}
          <div className="overflow-x-auto h-[650px] rounded-xl border border-emerald-100/50 shadow-inner bg-white/40">
            <table className="table table-pin-rows">
              {/* head */}
              <thead>
                <tr className="bg-emerald-50/50 text-slate-600 border-b border-emerald-100/50">
                  <th className="bg-transparent">No</th>
                  <th className="bg-transparent">Name</th>
                  <th className="bg-transparent">Email</th>
                  <th className="bg-transparent">Mobile</th>
                  <th className="bg-transparent">Image</th>
                  <th className="bg-transparent">Set Role</th>
                  <th className="bg-transparent">Delete</th>
                  <th className="bg-transparent">Joined At</th>
                  <th className="bg-transparent">Role</th>
                </tr>
              </thead>
            <tbody>
              {/* row 1 */}

              {filteredUser?.map((item, index) => (
                  <tr key={item?._id} className="border-b border-slate-100/50 hover:bg-emerald-50/30 transition-colors">
                    <td className="text-slate-600 font-medium">{index + 1}</td>
                    <td className="text-slate-700 font-medium">{item?.name}</td>
                    <td className="text-slate-600">{item?.email}</td>
                    <td className="text-slate-600 font-mono">0{item?.mobile}</td>
                    <td>
                      <div className="avatar drop-shadow-sm">
                        <div className="mask mask-squircle h-12 w-12 border border-emerald-100">
                          <img src={item?.avatar} alt="img" />
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <button className="transition-transform hover:scale-110">
                        <span className="text-2xl text-teal-600 hover:text-teal-800 inline-block">
                          <FaUserGear />
                        </span>
                      </button>
                    </td>

                    <td>
                      {deletingUserId === item._id ? (
                        <ImSpinner9 className="text-rose-600 animate-spin text-xl inline-block" />
                      ) : (
                        <button onClick={() => handleDeleteUser(item)} className="transition-transform hover:scale-110">
                          <span className="text-xl text-rose-500 hover:text-rose-700 inline-block">
                            <FaTrash />
                          </span>
                        </button>
                      )}
                    </td>
                    <td className="text-slate-500 text-sm">{formateDate(item?.createdAt)}</td>
                    <td>
                      <span className={`font-bold text-sm px-3 py-1 rounded-full w-fit ${
                        item?.role?.toLowerCase() === 'admin' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : item?.role?.toLowerCase() === 'moderator'
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item?.role}
                      </span>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
        </section>
      </div>
    </>
  );
};

export default ManageUsers;
