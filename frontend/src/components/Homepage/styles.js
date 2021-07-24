import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    text: 
    { 
        fontFamily: `'Ubuntu', sans-serif`,
        letterSpacing: 1.5,
        zIndex: 1
    },
    /* ============ Hero elements ============ */
    heroTitle:
    {
        fontFamily: `'Permanent Marker', sans-serif`,
        textStorke: '1px red',
        textShadow: '5px 5px 0px rgba(255, 255, 255, 0.2)',
        WebkitTextStroke: '1px black',
        letterSpacing: 1.5,
        zIndex: 1
    },
    heroSubtitle:
    {
        fontFamily: `'Ubuntu', sans-serif`,
        zIndex: 1,
        width: '50%',
        [theme.breakpoints.down('md')]: { width: '75%'},
        [theme.breakpoints.down('sm')]: { width: '90%'}
    },
    button:
    {
        borderRadius: 25,
        width: 200,
        height: 40,
        fontSize: 18,
        letterSpacing: 1,
        zIndex: 1,
        marginTop: 30,
        color: 'white',
        backgroundColor: 'transparent',
        border: '2px solid white',
        textTransform: 'capitalize',
        transition: 'all 0.35s ease-in-out',
        '&:hover':
        {
            color: 'black',
            backgroundColor: 'white'
        }
    },
    /* ============ Features elements ============ */
    featureTitle:
    {
        fontFamily: `'Poppins', sans-serif`,
        fontWeight: 600,
        letterSpacing: 1
    },
    featureText:
    {
        fontFamily: `'Poppins', sans-serif`,
        lineHeight: 1.4
    }
}));