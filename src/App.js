import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Maps from './Components/Maps/Maps';
import { CssBaseline, Grid } from '@material-ui/core';
import { getData, getWeatherData } from './APIs/Index';
import { useEffect, useState } from 'react';

function App() {

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({ sw: {}, ne: {} });
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));

      getData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data && data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List Places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked} isLoading={isLoading} type={type} setType={setType} rating={rating} setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Maps setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} Places={filteredPlaces.length ? filteredPlaces : places} setChildClicked={setChildClicked} weatherData={weatherData}/>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
