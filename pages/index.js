import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import PokeSearch from '../components/PokeSearch';
import PokeList from '../components/PokeList';
import PokeCompare from '../components/PokeCompare';
import { TraderContext, TraderDefault } from '../components/context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'Center',
    color: theme.palette.text.primary,
  },
}));

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default function Home(props) {
  const classes = useStyles();
  const [sides, setSides] = useState({ a: [], b: [] });
  const updateList = (side, list) => {
    let newSide = { ...sides };
    newSide[side] = list;
    setSides({...newSide});
  }
  console.log(props)
  const saveTrade = ({ baseUrl }, context) => {
    console.log(context)
    // postData(baseUrl, )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h1" gutterBottom>
            Poketrader
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <TraderContext.Provider value={{ ...TraderDefault, sides, updateList }}>
        <Grid container spacing={3}>
          <Grid item xs>
          </Grid>
          <Grid item xs={3}>
            <PokeSearch side="a"/>
          </Grid>
          <Grid item xs={3}>
            <PokeSearch side="b"/> 
          </Grid>
          <Grid item xs>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Side A
              </Typography>
              <PokeList side="a"/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <PokeCompare></PokeCompare>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Side B
              </Typography>
              <PokeList side="b"/>
            </Paper>
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={10}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={saveTrade(props, context)}
            >
              Save trade
            </Button>
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>
      </TraderContext.Provider>
    </div>
    )
  }
  
  export async function getServerSideProps(context) {
    const protocol = context.req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = context.req ? `${protocol}://${context.req.headers.host}/api/` : ''
    return {
      props: {
        baseUrl
      }
    }
  }
  