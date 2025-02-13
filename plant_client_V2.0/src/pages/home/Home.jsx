import { useDispatch } from "react-redux";
import Banner from "../../components/home/banner/Banner";
import TrendingProduct from "../../components/home/trendingProducts/TrendingProduct";
import WhoWeAre from "../../components/home/whoWeAre/WhoWeAre";
import { useEffect } from "react";
import { userLoggedIn } from "../../features/auth/authSlice";
import { useGetProductsQuery } from "../../features/products/productsApi";
import { allPlants } from "../../features/products/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isError } = useGetProductsQuery();

  useEffect(() => {
    if (localStorage.length > 0) {
      const user = localStorage.getItem("auth");
      const data = JSON.parse(user);
      // console.log(data);
      if (user) {
        dispatch(userLoggedIn(JSON.parse(user)));
      }
    }
  }, [dispatch]);
  // set to redux local store
  useEffect(() => {
    if (isSuccess) {
      dispatch(allPlants(data));
    }
  }, [data, dispatch, isSuccess]);

  return (
    <>
      <Banner />
      <WhoWeAre />
      <TrendingProduct />
    </>
  );
};

export default Home;
