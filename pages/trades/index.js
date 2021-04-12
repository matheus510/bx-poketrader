import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'next/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'Center',
        color: theme.palette.text.primary,
    },
    paper_card: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'Left',
        backgroundColor: theme.palette.secondary,
        color: theme.palette.text.primary,
    },
}));

export default function Home({ data }) {
    const classes = useStyles();

    const renderList = (list) => {
		return (list.reverse().map((trade) => {
			return (
                    <Paper key={`${trade._id}`} className={classes.paper}>
                        <Grid container className={classes.paper_card}>
                            <Grid item xs={4}>
                                <Link
                                    color="textSecondary"
                                    href={`trades/${trade._id}/`} 
                                    prefetch
                                    >
                                        <Button variant="outlined">
                                            Click more details
                                        </Button>
                                    </Link>
                            </Grid>
                            <Grid item xs={4}>
                                <List>
                                    <ListItem>{`
                                    Side A total exp: ${trade.side_a.totalExp}
                                `}</ListItem>
                                    <ListItem>{`
                                    Side B total exp: ${trade.side_b.totalExp}
                                `}</ListItem>
                                    <ListItem>{`
                                    Benefited side: ${trade.benefited_side}
                                `}</ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper>
                                <Typography variant="caption2" gutterBottom>
                                    { trade._id }
                                </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
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
                        Trades list
                    </Typography>
                    <Link
                        color="textSecondary"
                        href="/" 
                        prefetch
                        >
                        <Button variant="contained">
                            <Typography variant="subtitle2" gutterBottom>
                                Back to trader
                            </Typography>
                        </Button>
                    </Link>
                </Paper>
            </Grid>
            <Grid item xs></Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={8}>
                <List className={classes.root}>
                    {data[0] ? renderList(data) : ""}
                </List>
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
    