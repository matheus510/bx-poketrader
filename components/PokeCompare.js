import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TraderContext } from '../components/context'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
}));

function PokeCompare() {
  const classes = useStyles();
  const { sides, even } = useContext(TraderContext)
  const sumBaseExp = (list) => list.reduce((acc, pokemon) => acc + pokemon.base_experience, 0)
  const totalBaseExperience = sides ? Object.values(sides).map(side => {
    return side.length ? sumBaseExp(side) : "";
  }) : [0, 0];
  console.log(totalBaseExperience)
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {totalBaseExperience.map((value, index) => (
            <Grid key={index} item xs={6}>
              <Paper className={classes.paper}>
                <Typography>
                  {`Side ${index === 0 ? 'A' : 'B'} \n
                  Total Base Experience ${value}`}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PokeCompare
