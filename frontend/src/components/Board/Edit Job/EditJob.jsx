import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Divider, Button } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from './styles';

import { Timeline, Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const EditJob = ({ openEdit, setOpenEdit, id, columns, setColumns }) =>
{
    const [job, setJob] = useState({});
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [contact, setContact] = useState('');
    const [url, setUrl] = useState('');
    const classes = useStyles();

    useEffect(() =>
    {
        if (openEdit)
        {
            fetch(`/get-single-job?id=${id}`)
            .then(res => res.json())
            .then(json => {
                setJob(json);
                setTitle(json.title);
                setCompany(json.company);
                setLocation(json.location)
                setSalary(json.salary)
                setContact(json.contact)
                setUrl(json.url);
            });
        }
    }, [id, openEdit]);

    const handleClose = () =>
    {
        setOpenEdit(false);
        setTitle('');
        setCompany('');
        setLocation('')
        setSalary('')
        setContact('')
        setUrl('');
    }

    const handleEditing = () =>
    {
        if (title === '' || company === '')
            // toast.error("Oops! You've left one of the fields blank");
            alert("Oops! You've left one of the fields blank");
        else
        {
            fetch(`/edit-job?id=${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        company: company,
                        location: location,
                        salary: salary,
                        contact: contact,
                        url: url
                    })
                }
            )
            .then(res => res.json())
            .then(json => {
                console.log(json);

                // New job to replace
                const newJob = {
                    _id: id,
                    title: title,
                    company: company,
                    location: location,
                    salary: salary,
                    contact: contact,
                    url: url,
                    owner: job.owner,
                    status: job.status,
                    timeline: job.timeline
                };

                // Update columns
                const source = job.status;
                const column = columns[source];
                const copiedItems = [...column.items];
                const indexToUpdate = copiedItems.map(function(e) { return e._id }).indexOf(id);

                // Replacement
                copiedItems[indexToUpdate] = newJob;
                setColumns({
                    ...columns,
                    [source]: {
                        ...column,
                        items: copiedItems
                    }
                });
            });
            handleClose();
        }
    }

    const renderDate = (date) =>
    {
        var formatted = date.toLocaleDateString('en-GB');
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return `${formatted} ${hours}:${minutes.substr(-2)}`;
    }

    return (
        <>
            <Dialog open={openEdit} onClose={handleClose} classes={{paper: classes.paper}} className={classes.dialog}>
                <div className={classes.container}>
                    <div className={classes.details}>
                        <div className={classes.inputs}>
                            <TextField
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={classes.input}
                                variant="outlined"
                                label="Job title" />
                            <TextField
                                required
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className={classes.input}
                                variant="outlined"
                                label="Company" />
                            <TextField
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className={classes.input}
                                variant="outlined"
                                label="Location" />
                            <TextField
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className={classes.input}
                                variant="outlined"
                                label="Salary"
                                type="number" />
                            <TextField
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className={classes.input}
                                variant="outlined"
                                label="Contact" />
                            <TextField
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className={classes.input}
                                variant="outlined"
                                label="URL" />
                        </div>
                        <Button variant="contained" onClick={handleEditing}>Save changes</Button>
                    </div>
                    <div className={classes.timelineContainer}>
                        <Typography className={classes.text} variant="h6">Timeline</Typography>
                        <Divider className={classes.divider} />
                        <Timeline>
                        {Object.keys(job).length > 0 && job.timeline.map((step, index) => {
                            return (
                                <Timeline.Item key={index} dot={step.action === 'Accepted!' && <Icon icon="check" className={classes.icon} />}>
                                    <Typography className={classes.action} variant="subtitle1">{step.action}</Typography>
                                    <Typography className={classes.text} variant="caption">{renderDate(new Date(step.date * 1000))}</Typography>
                                </Timeline.Item>
                            )
                        })}
                        </Timeline>
                    </div>
                </div>
                {/* <DialogTitle className={classes.title}>
                    <div className={classes.titleItems}>
                        <Typography className={classes.text} variant="h6">{job.title}</Typography>
                        <IconButton onClick={() => handleClose()} size="small" disableRipple><CloseRoundedIcon /></IconButton>
                    </div>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <Typography className={classes.text} variant="subtitle1">{`Applied on: ${new Date(job.date * 1000).toLocaleDateString("en-GB")}`}</Typography>
                    <Typography className={classes.text} variant="subtitle1">{`Status: ${job.status}`}</Typography>
                    <form style={{marginTop: 25}}>
                        <TextField
                            required
                            disabled={disableEditing}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={classes.input}
                            variant="outlined"
                            label="Job title" />
                        <TextField
                            required
                            disabled={disableEditing}
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className={classes.input}
                            variant="outlined"
                            label="Company" />
                    </form>
                    <h4>Timeline</h4>
                    {Object.keys(job).length > 0 && job.timeline.map((step, index) => {
                        return (
                            <p>{step.action} at {renderDate(new Date(step.date * 1000))} </p>
                        )
                    })}
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Tooltip title={<Typography className={classes.text} variant="caption">Save changes</Typography>} placement="top" arrow>
                        <IconButton className={classes.iconButton} onClick={() => handleEditing()}>
                            <SaveRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </DialogActions> */}
            </Dialog>
        </>
    )
}

export default EditJob;
