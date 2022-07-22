import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography, TextField, Snackbar } from '@material-ui/core'
import {useState} from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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

function ShopItem({name, description, image_url, price, id, user}) {
    //For the alert
    const classes = useStyles()
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);

    const handleClickSuccess = () => {
      setSuccessOpen(true);
    };

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessOpen(false);
    };

    const handleClickError = () => {
      setErrorOpen(true);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
    };
    //For quanitity
    const [textInput, setTextInput] = useState(1)
    
    const handleTextInputChange = event => {
      setTextInput(event.target.value)
    }
    const addToCart = async () => {
      const cartItemURL = `http://localhost:8000/v1/cartitems/${user}`
      //check if already in cart

      let cart = await fetch(cartItemURL, {method: "GET"})
      cart = await cart.json()
      console.log(cart)
      let exists = cart.filter(e => e.name === name)
      let amount = textInput
      if(amount <= 0) {
        //Show alert if trying to add to cart 0
        handleClickError()

        return
      }
      if(exists.length > 0) {
        console.log("Already Found")
        console.log(exists)
        
        let patchResponse = await fetch(`${cartItemURL}/${exists[0].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: exists[0].quantity + parseInt(amount)
          })
        })
      } else {
        let payload = {
          name: name,
          price: price,
          quantity: parseInt(amount),
          cartId: user
        }
        const response = await fetch(cartItemURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)})
      }

      handleClickSuccess()
    
    
    
  }

  return (
    <Card style={{width: 275, height: 250, backgroundColor: "#ABECFB", margin: 10}}>
    
    <CardContent>
    <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleCloseSuccess} anchorOrigin={{horizontal: "center", vertical: "top"}}>
        <Alert onClose={handleCloseSuccess} severity="success">
          Successfully added {textInput} {name} to cart!
        </Alert>
    </Snackbar>
    <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{horizontal: "center", vertical: "top"}}>
      <Alert onClose={handleCloseError} severity="error">
        Cannot add quantity {textInput} to cart
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
       }}> <AddShoppingCartIcon></AddShoppingCartIcon></Button>
      </CardActions>
    </Card>
  );
}

export default ShopItem;