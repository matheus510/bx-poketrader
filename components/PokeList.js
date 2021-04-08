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
	root: {
		maxWidth: '36ch',
		backgroundColor: theme.palette.background.paper,
	},
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
	const [anchorEl, setAnchorEl] = useState(null);
	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	
	const open = Boolean(anchorEl);
	
	const { sides } = useContext(TraderContext);
	const renderList = (list) => {
		console.log('render list again')
		console.log(list)
		return (list.map((pokemon) => {
			const pokeId = pokemon.id;
			const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
			return (
				<div key={pokeId}>
				<ListItem
				aria-owns={open ? 'mouse-over-popover' : undefined}
				aria-haspopup="true"
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
				alignItems="flex-start"
				>
				<ListItemAvatar width="200px">
				<Avatar alt={pokemon.name} src={img} className={classes.large}/>
				</ListItemAvatar>
				<ListItemText primary={pokemon.name}/>
				</ListItem>
				<Popover
				id="mouse-over-popover"
				className={classes.popover}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
				>
				{props.pokeInfo ? props.pokeInfo[pokeId] : "Loading"}
				</Popover>
				<Divider variant="inset" component="li" />
				</div>
				);
			})
			)
		}

		return (
			<List className={classes.root}>
			{(sides ? renderList(sides[props.side]) : "")}
			</List>
			);
		}
		
		export async function getServerSideProps() {
			return {
			}
		}
		
		export default PokeList;