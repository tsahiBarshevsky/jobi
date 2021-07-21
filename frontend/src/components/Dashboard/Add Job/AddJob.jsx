import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography, IconButton } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import useStyles from './styles';

const AddJob = ({ open, setOpen, email, columns, setColumns }) => 
{
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const classes = useStyles();

    const handleClose = () =>
    {
        setOpen(false);
        setTitle('');
        setCompany('');
    }

    const addJob = (event) =>
    {
        event.preventDefault();
        var newJob = {
            owner: email,
            title: title,
            company: company,
            date: parseInt(new Date().getTime() / 1000),
            status: 'Applied',
            archived: false
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

            // Update columns
            const source = "Applied";
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

    return (
        <Dialog open={open} onClose={handleClose} classes={{paper: classes.paper}} className={classes.dialog}>
            <DialogTitle className={classes.title}>
                <div className={classes.titleItems}>
                    <Typography className={classes.text} variant="h6">Add new position</Typography>
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
    )
}

export default AddJob;
