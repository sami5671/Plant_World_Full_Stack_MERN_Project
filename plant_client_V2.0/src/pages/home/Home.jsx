import { useDispatch } from "react-redux";
import Banner from "../../components/home/banner/Banner";
import TrendingProduct from "../../components/home/trendingProducts/TrendingProduct";
import WhoWeAre from "../../components/home/whoWeAre/WhoWeAre";
import { useEffect } from "react";
import { userLoggedIn } from "../../features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();

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
  return (
    <>
      <Banner />
      <WhoWeAre />
      <TrendingProduct />
    </>
  );
};

export default Home;
