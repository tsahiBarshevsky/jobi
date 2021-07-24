import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    text: 
    { 
        fontFamily: `'Ubuntu', sans-serif`,
        letterSpacing: 1.5,
        zIndex: 1
    },
    heroTitle:
    {
        fontFamily: `'Permanent Marker', sans-serif`,
        textShadow: '5px 5px 0px rgba(255, 255, 255, 0.2)',
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
        color: '#3aa9ab',
        backgroundColor: 'transparent',
        border: '2px solid #3aa9ab',
        textTransform: 'capitalize',
        transition: 'all 0.35s ease-in-out',
        '&:hover':
        {
            color: 'white',
            backgroundColor: '#3aa9ab'
        }
    }
}));