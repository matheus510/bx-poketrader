import { useState, useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { TraderContext } from './context';

const useStyles = makeStyles((theme) => ({
	popover: {
		pointerEvents: 'none',
	},
	inline: {
		display: 'inline',
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

function PokeList (props) {
	const classes = useStyles();
	const { sides } = useContext(TraderContext);
	
	const renderList = (list) => {
		return (list.map((pokemon) => {
			const pokeId = pokemon.id;
			const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
			return (
				<div key={`${props.side}${pokeId}`}>
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
			<List>
				{sides ? renderList(sides[props.side]) : ""}
			</List>
			);
		}
		
		export async function getServerSideProps() {
			return {
			}
		}
		
		export default PokeList;