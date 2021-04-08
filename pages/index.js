import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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

export default function Home() {
  const classes = useStyles();
  const [sides, setSides] = useState({ a: [], b: [] });
  const updateList = (side, list) => {
    let newSide = { ...sides };
    newSide[side] = list;
    setSides({...newSide});
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
              <Typography variant="h4" component="h1" gutterBottom>
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
              <Typography variant="h4" component="h1" gutterBottom>
                Side B
              </Typography>
              <PokeList side="b"/>
            </Paper>
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>
      </TraderContext.Provider>
    </div>
    )
  }
  
  export async function getStaticProps() {
    
    return {
      props: {
      }
    }
  }
  