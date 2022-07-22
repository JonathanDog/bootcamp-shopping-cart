
import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, } from '@material-ui/core'
import Head from '../components/head';
import CartItemList from '../components/CartItemList'
import {InputLabel, MenuItem, FormControl, Select} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const IndexPage = () => {
  const classes = useStyles();
  const [user, setUser] = React.useState(1);

  const handleChange = (event) => {
    setUser(event.target.value);
  };
  return (<Container>
    <Head title='Cart'/>
    <div style={{display: 'flex'}}>
      <Typography variant="h3">Cart</Typography>
      <FormControl variant="outlined" className={classes.formControl} style={{marginLeft: 'auto'}}>
        <InputLabel style={{color: "white"}}color="secondary"  id="demo-simple-select-outlined-label">User</InputLabel>
        <Select
          
          value={user}
          onChange={handleChange}
          label="User"
          color="secondary"
          style={{color: "white"}}  
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </Select>
      </FormControl>   
      <Link href="/shop">
        <Button style={{marginLeft: 'auto'}}variant="contained" color="primary">Shop </Button>
    </Link> 
    </div>
    
    <CartItemList user={user} ></CartItemList>
  </Container>
)};

export default IndexPage;
