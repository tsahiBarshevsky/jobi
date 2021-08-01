import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ScrollToTop from 'react-scroll-up';

const useStyles = makeStyles(() => ({
    toTop:
    {
        zIndex: 20,
        bottom: 9,
        right: 8,
        width: 40,
        height: 40,
        borderRadius: 5,
        position: 'fixed',
        color: 'white',
        backgroundColor: '#212121CC',
        border: '1px solid #ffffff40',
        transition: '0.3s ease-out',
        "&:hover":
        {
            transform: 'translateY(-5%)',
            backgroundColor: '#212121',
            transition: '0.3s ease-in',
        }
    },
    arrow:
    {
        fontSize: 40,
        transform: 'translateX(-3%)'
    }
}));

const BackToTop = ({showBelow}) => 
{
    const clasess = useStyles();
    const [show, setShow] = useState(showBelow ? false : true);
    const scrollToTopStyle = {
        transitionDuration: '0.7s',
        bottom: 30,
        zIndex: 40
    }
    
    const handleScroll = () =>
    {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true);
        } else {
            if (show) setShow(false);
        }
    }

    useEffect(() =>
    {
        if (showBelow)
        {
            window.addEventListener(`scroll`, handleScroll);
            return () => window.removeEventListener(`scroll`, handleScroll);
        }
    })

    const handleClick = () => 
    {
        window['scrollTo']({top: 0, behavior: 'smooth'});
    }

    return (
        <ScrollToTop duration={1250} showUnder={70} style={scrollToTopStyle}>
            <span>
                <button onClick={handleClick} className={clasess.toTop}>
                    <ExpandLessRoundedIcon className={clasess.arrow} />
                </button>
            </span>
        </ScrollToTop>
    )
}

export default BackToTop;