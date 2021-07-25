import React from 'react';
import { motion } from "framer-motion";
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    menuButton:
    {
        transform: 'translate(30%, 8%)',
        '&:hover': { backgroundColor: 'transparent '},
    },
}));

const Path = (props) => 
(
    <motion.path
        fill="transparent"
        strokeLinecap="round"
        strokeWidth="3"
        {...props}
    />
);
  
const transition = { duration: 0.5 };

export default function MenuToggle({expanded, setExpanded})
{
    const classes = useStyles();

    return (
        <IconButton disableTouchRipple className={classes.menuButton} onClick={() => setExpanded(!expanded)}>
            <svg width="23" height="23" viewBox="0 0 23 23">
                <Path
                    animate={expanded ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { d: "M 2 2.5 L 20 2.5", stroke: "hsl(360, 100%, 100%, 1)" },
                        open: { d: "M 3 16.5 L 17 2.5", stroke: "hsl(360, 100%, 100%, 1)" },
                    }}
                    transition={transition}
                />
                <Path
                    d="M 2 9.423 L 20 9.423"
                    stroke="hsl(360, 100%, 100%, 1)"
                    animate={expanded ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                    }}
                    transition={transition}
                />
                <Path
                    animate={expanded ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { d: "M 2 16.346 L 20 16.346", stroke: "hsl(360, 100%, 100%, 1)" },
                        open: { d: "M 3 2.5 L 17 16.346", stroke: "hsl(360, 100%, 100%, 1)" },
                    }}
                    transition={transition}
                />
            </svg>
        </IconButton>
    )
}