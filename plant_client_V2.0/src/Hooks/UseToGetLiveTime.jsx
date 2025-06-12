import { useEffect, useState } from "react";

const UseToGetLiveTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return now;
};

export default UseToGetLiveTime;
