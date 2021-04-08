import { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PokeSearch from '../components/PokeSearch';
import PokeList from '../components/PokeList';
import PokeCompare from '../components/PokeCompare';
import { TraderContext, TraderDefault } from '../components/context';

export default function Home() {
  const [sides, setSides] = useState(TraderDefault.sides);
  const updateList = (side, list) => {
    let newSides = sides;
    newSides[side] = list;
    setSides(newSides);
    console.log("new sides", sides)
  }
  return (
      <Container maxWidth="false">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" component="h1" gutterBottom>
              Poketrader
            </Typography>
          </Paper>
        </Grid>
        <TraderContext.Provider value={{ ...TraderDefault, updateList }}>
        <Grid item xs={6}>
          <PokeSearch side="a"/>
        </Grid>
        <Grid item xs={6}>
          <PokeSearch side="b"/> 
        </Grid>
          <Grid item xs={4}>
            <Paper>
            <Typography variant="h4" component="h1" gutterBottom>
              Side A
            </Typography>
              <PokeList side="a" list={sides.a}/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <PokeCompare></PokeCompare>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Typography variant="h4" component="h1" gutterBottom>
                Side B
              </Typography>
              <PokeList side="b" list={sides.b}/>
            </Paper>
          </Grid>
          </TraderContext.Provider>
        </Grid>
      </Container>
  )
}

export async function getStaticProps() {
  
  return {
    props: {
    }
  }
}
