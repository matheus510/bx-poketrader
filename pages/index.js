import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PokeSearch from '../components/PokeSearch';
import PokeList from '../components/PokeList';
import PokeCompare from '../components/PokeCompare';
import PokeFooter from '../components/PokeFooter';
import { TraderContext, TraderDefault } from '../components/context';

export default function Home(props) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const [sides, setSides] = useState({ a: [], b: [] });
  const updateList = (side, list) => {
    let newSide = { ...sides };
    newSide[side] = list;
    setSides({...newSide});
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={8}>
          <Paper>
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
            <Paper>
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
            <Paper>
              <Typography variant="h6" gutterBottom>
                Side B
              </Typography>
              <PokeList side="b"/>
            </Paper>
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>
        <PokeFooter url={props.baseUrl}/>
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
  