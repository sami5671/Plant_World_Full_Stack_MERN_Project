import { FaTrash, FaUserGear, FaUsers } from "react-icons/fa6";
import { Input } from "rizzui/input";
import { useGetAllUsersQuery } from "../../../features/adminControl/manageUsersApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../../features/adminControl/manageUsersControlSlice";
import { formateDate } from "./../../../components/shared/TimeAndDateFormate/FormateDate";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { data: users, isLoading, isError, isSuccess } = useGetAllUsersQuery();
  const { filteredUser } = useSelector((state) => state?.manageUsers);

  useEffect(() => {
    if (isSuccess && users) {
      dispatch(allUsers(users));
    }
  }, [dispatch, isSuccess, users]);

  return (
    <>
      <section className="bg-white px-4 py-4 lg:px-12 lg:py-12 rounded-2xl">
        <div className="flex justify-end">
          <h1 className="text-primary-dashboardPrimaryTextColor font-bold text-xl flex items-center gap-2">
            Manage Users <FaUsers />
          </h1>
        </div>
        {/* searching and filtering */}

        <div className="flex gap-6">
          <div>
            <Input
              label="Search By ID"
              placeholder="Enter the Product ID "
              inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
              // onChange={(e) => handleSearchById(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Search By Name"
              placeholder="Enter Plant Name"
              inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
              // onChange={(e) => handleSearchByName(e.target.value)}
            />
          </div>
        </div>
        {/* data table */}
        <div className="overflow-x-auto">
          <table className="table mt-8">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Image</th>
                <th>Set Role</th>
                <th>Delete</th>
                <th>Joined At</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {filteredUser?.map((item, index) => (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>0{item?.mobile}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item?.avatar} alt="img" />
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <button className="flex items-center">
                        <span className="text-2xl text-lime-600">
                          <FaUserGear />
                        </span>
                      </button>
                    </td>

                    <td>
                      <button
                      //   onClick={() => handleDeleteProduct(item._id)}
                      >
                        <span className="text-xl text-red-600 hover:text-orange-500">
                          <FaTrash />
                        </span>
                      </button>
                    </td>
                    <td>{formateDate(item?.createdAt)}</td>
                    <td>{item?.role}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageUsers;
