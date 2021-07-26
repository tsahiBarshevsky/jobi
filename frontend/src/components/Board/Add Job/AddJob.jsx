import React, { useState } from 'react';
import { 
    Button, Dialog, DialogContent, DialogTitle, 
    TextField, Typography, IconButton, FormControl,
    Select, MenuItem, InputLabel } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from './styles';

const AddJob = ({ open, setOpen, email, columns, setColumns }) => 
{
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const classes = useStyles();

    const handleClose = () =>
    {
        setOpen(false);
        setTitle('');
        setCompany('');
        setStatus('');
    }

    const addJob = (event) =>
    {
        event.preventDefault();
        var newJob = {
            owner: email,
            title: title,
            company: company,
            status: status,
            color: 'default',
            location: '',
            salary: '',
            contact: '',
            url: '',
            timeline: [
                {
                    action: 'Created',
                    date: parseInt(new Date().getTime() / 1000)
                }
            ]
        }
        fetch('/add-new-job',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJob)
            }
        )
        .then(res => res.json())
        .then(res => {
            console.log(res.message);
            toast.success(res.message);

            // Update columns
            const source = status;
            const column = columns[source];
            const copiedItems = [...column.items];
            
            newJob._id = res.job_id;
            copiedItems.push(newJob);
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

    const handleStatusChange = (event) => 
    {
        setStatus(event.target.value);
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} classes={{paper: classes.paper}} className={classes.dialog}>
                <DialogTitle className={classes.title}>
                    <div className={classes.titleItems}>
                        <Typography className={classes.text} variant="h6">Add new job</Typography>
                        <IconButton onClick={() => handleClose()} size="small" disableRipple><CloseRoundedIcon /></IconButton>
                    </div>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <form onSubmit={addJob}>
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
                        <FormControl variant="outlined" className={classes.select}>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                required
                                labelId="status-label"
                                label="Status"
                                value={status}
                                onChange={handleStatusChange} 
                            >
                                <MenuItem value={'Wishlist'}>Wishlist</MenuItem>
                                <MenuItem value={'Applied'}>Applied</MenuItem>
                                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                                <MenuItem value={'Rejected'}>Rejected</MenuItem>
                                <MenuItem value={'Accepted'}>Accepted</MenuItem>
                                <MenuItem value={'Not Answered'}>Not Answered</MenuItem>
                            </Select>
                        </FormControl>
                        <Button 
                            type="submit" 
                            variant="contained"
                            className={classes.button} 
                        >
                            Add position
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default AddJob;
