import { useDispatch, useSelector } from "react-redux";
import { useAddCartMutation } from "../features/users/cartApi";
import { toast } from "react-toastify";
import { cartItem } from "../features/users/cartSlice";

const useHandleCart = () => {
  const dispatch = useDispatch();
  const [addCart] = useAddCartMutation();
  const user = useSelector((state) => state?.auth?.user);

  const handleCart = async (plantId) => {
    console.log(plantId);
    if (!user?._id) {
      toast.error("Please Login First");
      return;
    }
    try {
      const res = await addCart({
        user: user._id,
        plantId,
        quantity: 1,
      }).unwrap();
      // console.log(res.data);
      dispatch(cartItem(res?.data));
      toast.success("Added to Cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return { handleCart };
};

export default useHandleCart;
