import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating'

import useStyles from './Styles'

export default function PlaceDetails(props) {

  const classes = useStyles()
  let place = props.place
  // console.log(place.category.name)

  if(props.selected) props.refProp && props.refProp.current && props.refProp.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <Card elevation={6}>
        <CardMedia
          style={{ height: 350 }}
          image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">{place.name}</Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Price</Typography>
            <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
          </Box>
          {place?place.awards?place.awards.map((award) => (
            <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
              <img src={award.images.small} alt={award.display_name} />
              <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
            </Box>
          )):null:null}
          {place?place.cuisine?place.cuisine.map(({ name }) => (
            <Chip key={name} size="small" label={name} className={classes.chip} />
          )):null:null}
          {place?place.address?(
            <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
              <LocationOnOutlinedIcon /> {place.address}
            </Typography>
          ):null:null}
          {place?place.phone?(
            <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
              <PhoneIcon /> {place.phone}
            </Typography>
          ):null:null}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Rating</Typography>
            <Rating name="read-only" value={Number(place.rating)} readOnly />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Categories</Typography>
            <Typography gutterBottom variant="subtitle1">{place?place.category?place.category.name:null:null}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Reviews</Typography>
            <Typography gutterBottom variant="subtitle1">{place.review_count}</Typography>
            <Button size="small" color="primary" onClick={() => window.open(place.reviews_url, '_blank')}>
              View Reviews
            </Button>
            <Button size="small" color="primary" onClick={() => window.open(place.reviews_url, '_blank')}>
              Add Review
            </Button>
            <Button size="small" color="primary" onClick={() => window.open(place.reviews_url, '_blank')}>
              Share
            </Button>
          </Box>
          <CardActions>
            <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
              Trip Advisor
            </Button>
            <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
              Website
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  )
}
