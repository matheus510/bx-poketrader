import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import theme from '../../styles/theme';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    buttons: {
        margin: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'Center',
        color: theme.palette.text.primary,
    },
}));

export default function Home({ data }) {
    const classes = useStyles(theme);

    const renderList = (side, list) => {
		return (list.map((pokemon) => {
			const pokeId = pokemon.id;
			const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
			return (
				<div key={`${side}${pokeId}`}>
				<ListItem
				alignItems="flex-start"
				>
				<ListItemAvatar>
				<Avatar alt={pokemon.name} src={img} className={classes.large}/>
				</ListItemAvatar>
				<ListItemText 
					primary={pokemon.name}
					secondary={`Base experience: ${pokemon.base_experience}`}
					/>
				</ListItem>
				<Divider variant="inset" component="li" />
				</div>
				);
			})
			)
		}

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={10}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Trades list
                    </Typography>
                    <Link
                        color="textSecondary"
                        href="/" 
                        
                        >
                        <Button className={classes.buttons} variant="contained">
                            <Typography variant="subtitle2" gutterBottom>
                                Back to trader
                            </Typography>
                        </Button>
                    </Link>
                    <Link
                        color="textSecondary"
                        href="/trades" 
                        
                        >
                        <Button className={classes.buttons} variant="contained">
                            <Typography variant="subtitle2" gutterBottom>
                                Back to trades list
                            </Typography>
                        </Button>
                    </Link>
                </Paper>
            </Grid>
            <Grid item xs></Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                Side A
            </Typography>
            <List className={classes.root}>
                {data.side_a.pokeList ? renderList("a", data.side_a.pokeList) : ""}
            </List>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} key={`${data._id}`}>
                    <ul>
                        <li>{`
                        Trade #${data._id} 
                    `}</li>
                        <li>{`
                        Side A total exp: ${data.side_a.totalExp}
                    `}</li>
                        <li>{`
                        Side B total exp: ${data.side_b.totalExp}
                    `}</li>
                        <li>{`
                        Benefited side: ${data.benefited_side}
                    `}</li>
                    </ul>
				</Paper>
            </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                Side B
            </Typography>
            <List className={classes.root}>
                {data.side_b.pokeList ? renderList("b", data.side_b.pokeList) : ""}
            </List>
            </Paper>
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>
        </div>
        )
    }
    
    export async function getServerSideProps(context) {
        const protocol = context.req.headers['x-forwarded-proto'] || 'http'
        const baseUrl = context.req ? `${protocol}://${context.req.headers.host}` : ''
        
        const res = await fetch(baseUrl + '/api/trades/' + context.params.tradeId)
        const data = await res.json()
        if (!data) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                data: data.data
            }, // will be passed to the page component as props
        }
    }
    