import { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { TraderContext } from './context';

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data)
    });
    return response.json();
  }

function PokeFooter ({ url }) {
	const context = useContext(TraderContext);
    const saveTrade = async (url) => {
        const mapList = (side) => {
          const list = side.map((pokemon) => {
            return {
              name: pokemon.name,
              base_experience: pokemon.base_experience,
              id: pokemon.id
            }
          })
          const sumBaseExp = (list) => list.reduce((acc, pokemon) => acc + pokemon.base_experience, 0)
          return {
            totalExp: sumBaseExp(list),
            pokeList: list
          }
        }
        const body = {
            side_a: mapList(context.sides.a),
            side_b: mapList(context.sides.b),
            benefited_side: context.advantage,
            even: context.even
        }
        console.log(body)
        const res = await postData(url, body)
        console.log(res)
        
    }

		return (
            <Grid container justify="center" spacing={3}>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={async () => await saveTrade(url)}
              >
                Save trade
              </Button>
            </Grid>
          </Grid>
			);
		}
		
		export default PokeFooter;
