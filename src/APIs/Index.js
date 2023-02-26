import axios from "axios";

export const getData = async (type, sw, ne) => {
  try {
    const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}


export const getWeatherData = async (lat, lng) => {
  try {
    const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json`, {
      params: { q: `${lat},${lng}` },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    });
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}