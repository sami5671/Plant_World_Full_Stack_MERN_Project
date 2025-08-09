const OPEN_CAGE_API_KEY = "a5854130fc194c72bbab42394ce697cc";

export const getCurrentAddress = async () => {
  const getPosition = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      })
    );

  try {
    const position = await getPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // console.log("Latitude:", lat, "Longitude:", lon);

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPEN_CAGE_API_KEY}&language=en&pretty=1`
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // console.log("Full result:", data.results[0]);
      return data.results[0].formatted;
    }

    return null;
  } catch (err) {
    console.warn("Failed to get address via OpenCage:", err);
    return null;
  }
};
