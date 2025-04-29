import { useSelector } from "react-redux";
import { useAddCartMutation } from "../features/users/cartApi";
import { toast } from "react-toastify";

const useHandleCart = () => {
  const [addCart] = useAddCartMutation();
  const user = useSelector((state) => state?.auth?.user?.data);

  const handleCart = async (plantId) => {
    if (!user?._id) {
      toast.error("Please Login First");
      return;
    }

    try {
      await addCart({
        user: user._id,
        plantId,
        quantity: 1,
      }).unwrap();
      toast.success("Added to Cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return { handleCart };
};

export default useHandleCart;
