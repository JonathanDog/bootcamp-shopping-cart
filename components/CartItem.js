import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography} from '@material-ui/core'




function CartItem({name, description, image_url, price, quantity, id}) {
    const cartItemURL = "http://localhost:8000/v1/cartitems"
    

    const removeFromCart = async () => {
        console.log("here")
        const response = await fetch(`${cartItemURL}/${id}`, {
            method: "DELETE"
        })
        window.location.reload(false)
    }

  return (
    <Card style={{width: 275, height: 300, backgroundColor: "#ABECFB", margin: 10}}>

    <CardContent>
    <Typography variant="h5" component="div">
          {name}
      </Typography>
    <Typography variant="h8" color="textSecondary" gutterBottom>
         Quantity: {quantity}
    </Typography>
    <Typography variant="h6">
    ${price}
    </Typography>
    <Button  onClick={removeFromCart} variant="contained" color="secondary">Remove From Cart</Button>
    </CardContent>
    </Card>
  );
}

export default CartItem;