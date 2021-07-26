import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
// import { auth } from '../../firebase';
import './Board.sass';

const Board = () => 
{
    const [columns, setColumns] = useState({});
    // const [open, setOpen] = useState(false);
    // const [openEdit, setOpenEdit] = useState(false);
    // const [id, setId] = useState('');
    // const classes = useStyles();
    const history = useHistory();
    const { user } = useAuth();

    useEffect(() => 
    {
        if (!user)
        {
            history.push('/login');
            return;
        }
        document.title = `Jobi - ${user.email}'s dashboard`;
        fetch(`/get-all-jobs?email=${user.email}`)
        .then(res => res.json())
        .then(json => {
            const fetchedData = {
                "Applied": {
                    name: "Applied",
                    items: json.applied
                },
                "In Progress": {
                    name: "In Progress",
                    items: json.inProgress
                },
                "Rejected": {
                    name: "Rejected",
                    items: json.rejected
                },
                "Not Answered": {
                    name: "Not Answered",
                    items: json.notAnswered
                }
            };
            setColumns(fetchedData);
        });
    }, [history, user]);

    return (
        <div className="board-container">
            {user.email}
        </div>
    )
}

export default Board;
