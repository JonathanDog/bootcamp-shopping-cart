import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography, TextField, Snackbar } from '@material-ui/core'
import {useState} from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function ShopItem({name, description, image_url, price, id}) {
    //For the alert
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    //For quanitity
    const [textInput, setTextInput] = useState(0)
    
    const handleTextInputChange = event => {
      setTextInput(event.target.value)
    }
    const addToCart = async () => {
      const cartItemURL = "http://localhost:8000/v1/cartitems"
      //check if already in cart

      let cart = await fetch(cartItemURL, {method: "GET"})
      cart = await cart.json()
      console.log(cart)
      let exists = cart.filter(e => e.name === name)
      if(exists.length > 0) {
        console.log("Already Found")
        console.log(exists)
        let patchResponse = await fetch(`${cartItemURL}/${exists[0].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: exists[0].quantity + parseInt(textInput)
          })
        })
      } else {
        let payload = {
          name: name,
          price: price,
          quantity: parseInt(textInput)
        }
        const response = await fetch(cartItemURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)})
      }

      handleClick()
    
    
    
  }

  return (
    <Card style={{width: 275, height: 300, backgroundColor: "#ABECFB", margin: 10}}>
    
    <CardContent>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal: "center", vertical: "top"}}>
        <Alert onClose={handleClose} severity="success">
          Successfully added {textInput} {name} to cart!
        </Alert>
      </Snackbar>
    <Typography variant="h5" component="div">
          {name}
      </Typography>
    <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
         {description}
    </Typography>
    <Typography variant="h6">
    ${price}
    </Typography>
       
    </CardContent>
      <CardActions>
        <TextField  value={textInput} onChange={handleTextInputChange} variant="filled" label="Quantity" type="number"></TextField>
       <Button onClick={addToCart} variant="contained" style={{
        backgroundColor: "#21b6ae"
       }}>Add To Cart</Button>
      </CardActions>
    </Card>
  );
}

export default ShopItem;