import React from 'react';
import { makeStyles, Typography, Divider, IconButton, Tooltip } from '@material-ui/core';
import UnarchiveRoundedIcon from '@material-ui/icons/UnarchiveRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import './JobItem.sass';

const useStyles = makeStyles(() => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    divider: { marginBlock: 10}
}));

const JobItem = ({ job }) => 
{
    const classes = useStyles();

    return (
        <div className="job-item-container">
            <div className="header">
                <Typography className={classes.text} variant="subtitle1">{job.title}</Typography>
                <Typography className={classes.text} variant="caption" color="textSecondary">
                    {(new Date(job.date * 1000).toLocaleDateString("en-GB"))}
                </Typography>
            </div>
            <Divider className={classes.divider} />
            <Typography className={classes.text} variant="subtitle1">{job.company}</Typography>
            <div className="actions">
                <Tooltip title={<Typography className={classes.text} variant="caption">Unarchive</Typography>} placement="top" arrow>
                    <IconButton><UnarchiveRoundedIcon /></IconButton>
                </Tooltip>
                <Tooltip title={<Typography className={classes.text} variant="caption">Delete</Typography>} placement="top" arrow>
                    <IconButton><DeleteRoundedIcon /></IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default JobItem;
