import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    progress: {
        margin: theme.spacing(2)
    }
})

class Progress extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <TableRow>
                <TableCell colspan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.props.completed}/>
                </TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(Progress);