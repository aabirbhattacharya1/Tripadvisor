import React from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import GoogleMapReact from 'google-map-react'

import useStyles from './Styles'

export default function Maps(props) {

  let places = props.Places.data

  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:600px)')
  let coordinates = props.coordinates

  let weatherData = props.weatherData

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={coordinates}
          center={coordinates}
          zoom={10}
          margin={[50, 50, 50, 50]}
          onChange={(event) => {
            props.setCoordinates({ lat: event.center.lat, lng: event.center.lng });
            props.setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
          }}
          onChildClick={(child) => props.setChildClicked(child)}
        >
          {places && places.map((place, i) => (
            console.log(place),
            console.log(i),
            <div key={i}>
              {place.longitude && place.latitude &&
                <div
                  className={classes.markerContainer}
                  lat={place.latitude}
                  lng={place.longitude}
                  key={i}
                >
                  {
                    !isDesktop ? (
                      <LocationOnOutlinedIcon color="primary" fontSize="large" />
                    ) : (
                      <Paper elevation={3} className={classes.paper}>
                        <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                          {place.name}
                        </Typography>
                        <img
                          className={classes.pointer}
                          src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                          alt={place.name}
                        />
                        <Rating size="small" value={Number(place.rating)} readOnly />
                      </Paper>
                    )
                  }
                </div>
              }
            </div>
          ))}
          {
            weatherData && weatherData.list && weatherData.list.map((data, i) => (
              <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                <img height={100} src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
              </div>
            ))
          }
        </GoogleMapReact>
      </div>
    </>
  )
}

