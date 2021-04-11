import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

export default function Home({ data }) {
    const classes = useStyles();

    const renderList = (list) => {
        console.log(list)
		return (list.map((trade) => {
			return (
				<li key={`${trade._id}`}>
                    <ul>
                        <li>{`
                        Trade #${trade._id} 
                    `}</li>
                        <li>{`
                        Side A total exp: ${trade.side_a[0].totalExp}
                    `}</li>
                        <li>{`
                        Side B total exp: ${trade.side_b[0].totalExp}
                    `}</li>
                        <li>{`
                        Benefited side: ${trade.benefited_side}
                    `}</li>
                    </ul>
				</li>
				);
			})
			)
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
        <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={8}>
                <ul className={classes.root}>
                    {data[0] ? renderList(data) : ""}
                </ul>
            </Grid>
            <Grid item xs></Grid>
        </Grid>
        </div>
        )
    }
    
    export async function getServerSideProps(context) {
        const protocol = context.req.headers['x-forwarded-proto'] || 'http'
        const baseUrl = context.req ? `${protocol}://${context.req.headers.host}` : ''
        
        const res = await fetch(baseUrl + '/api/')
        const data = await res.json()

        if (!data) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                ...data
            }, // will be passed to the page component as props
        }
    }
    