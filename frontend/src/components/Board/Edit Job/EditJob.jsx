import React, { useState, useEffect } from 'react';
import { 
    Dialog, TextField, Typography, Divider, Button, IconButton,
    DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { Timeline, Icon } from 'rsuite';
import { toast } from 'react-toastify';
import 'rsuite/dist/styles/rsuite-default.css';
import useStyles from './styles';

const EditJob = ({ openEdit, setOpenEdit, id, columns, setColumns }) =>
{
    const [job, setJob] = useState({});
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [contact, setContact] = useState('');
    const [url, setUrl] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
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

    const handleAlertClose = () => 
    {
        setOpenAlert(false);
    }

    const handleEditing = (event) =>
    {
        event.preventDefault();
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
            toast.success(json);

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

    const renderDate = (date) =>
    {
        var formatted = date.toLocaleDateString('en-GB');
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return `${formatted} ${hours}:${minutes.substr(-2)}`;
    }

    const deleteJob = () =>
    {
        setOpenAlert(false);
        setOpenEdit(false);
        fetch(`/delete-job?id=${job._id}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);

            // Update columns
            const source = job.status;
            const column = columns[source];
            const copiedItems = [...column.items];
            const indexToDelete = copiedItems.map(function(e) { return e._id }).indexOf(job._id);
            if (indexToDelete > -1)
                copiedItems.splice(indexToDelete, 1);
            setColumns({
                ...columns,
                [source]: {
                    ...column,
                    items: copiedItems
                }
            });
        });
    }

    return (
        <>
            <Dialog open={openEdit} onClose={handleClose} classes={{paper: classes.paper}} className={classes.dialog}>
                <div className={classes.container}>
                    <div className={classes.details}>
                        <div className={classes.header}>
                            <div>
                                <Typography className={classes.text} variant="h5">{job.title}</Typography>
                                <Typography className={classes.text} variant="subtitle2" color="textSecondary">At {job.company}</Typography>
                            </div>
                            <IconButton size="small" onClick={() => setOpenEdit(false)}><CloseRoundedIcon /></IconButton>
                        </div>
                        <form className={classes.inputs} onSubmit={handleEditing}>
                            <TextField
                                required
                                autoFocus
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
                                type="number"
                                inputProps={{ min: 1 }} />
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
                            <div className={classes.actions}>
                                <Button variant="contained" className={classes.delete} onClick={() => setOpenAlert(true)}>Delete job</Button>
                                <Button type="submit" variant="contained" className={classes.saveChanges}>Save changes</Button>
                            </div>
                        </form>
                    </div>
                    <div className={classes.timelineContainer}>
                        <Typography className={classes.text} variant="h6">Timeline</Typography>
                        <Divider className={classes.divider} />
                        <Timeline>
                        {Object.keys(job).length > 0 && job.timeline.map((step, index) => {
                            return (
                                <Timeline.Item 
                                    key={index} 
                                    dot={
                                        step.action === 'Accepted!' ? 
                                        <Icon icon="check" className={classes.icon} style={{backgroundColor: 'green'}} />
                                        :
                                        (step.action === 'Rejected' ?
                                        <Icon icon="close" className={classes.icon} style={{backgroundColor: 'red'}} /> : null)
                                    }>
                                    <Typography className={classes.text} variant="subtitle1">{step.action}</Typography>
                                    <Typography className={classes.text} variant="caption">{renderDate(new Date(step.date * 1000))}</Typography>
                                </Timeline.Item>
                            )
                        })}
                        </Timeline>
                    </div>
                </div>
            </Dialog>
            <Dialog open={openAlert} onClose={handleAlertClose} className={classes.dialog}>
                <DialogTitle>
                    <Typography className={classes.text} variant="h6">Delete job</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.dialogContentText}>
                        Are you sure you want to delete {`${job.title}`}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.cancel} onClick={handleAlertClose} variant="contained">
                        Cancel
                    </Button>
                    <Button className={classes.deleteAction} onClick={deleteJob} variant="contained">
                        Yes, delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditJob;
