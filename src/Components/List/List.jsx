import React from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import { useState, useEffect, createRef } from 'react'
import useStyles from './Styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

export default function List(props) {

  const classes = useStyles()

  const type = props.type
  const setType = props.setType
  const rating = props.rating
  const setRating = props.setRating

  let places = props.Places.data
  console.log(places)

  // places=[{name:"test"}]

  const handleType = (event) => {
    setType(event.target.value)
  }

  const handleRating = (event) => {
    setRating(event.target.value)
  }

  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    const refs = Array(places && places.length).fill().map((_, i) => elRefs[i] || createRef())
    setElRefs(refs)
  }, [places])


  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels and Attractions around you</Typography>
      {props.isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={handleType}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={handleRating}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places ? places.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetails place={place} selected={Number(props.childClicked) === i} refProp={elRefs[i]} />
              </Grid>
            )) : "No Places Found"}
          </Grid>
        </>
      )}
    </div>
  )
}
