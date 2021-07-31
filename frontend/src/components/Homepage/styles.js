import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    /* ============ General elements ============ */
    text: 
    { 
        fontFamily: `'Comfortaa', sans-serif`,
        letterSpacing: 1.5,
        zIndex: 1
    },
    sectionTitle:
    {
        marginBottom: 10,
        fontWeight: 600,
        color: 'black',
        fontFamily: `'Comfortaa', sans-serif`,
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    divider:
    {
        width: '65%',
        height: 2,
        borderRadius: 25,
        marginBottom: 15,
        backgroundColor: 'black'
    },
    /* ============ Hero elements ============ */
    toolbar: theme.mixins.toolbar,
    grid: 
    { 
        marginTop: 35,
        zIndex: 2,
        [theme.breakpoints.down('md')]: { margin: 0 }
    },
    heroTitle:
    {
        fontFamily: `'Bebas Neue', sans-serif`,
        textShadow: '5px 3px 3px black',
        letterSpacing: 1.5,
        lineHeight: 1,
        zIndex: 1
        //textStorke: '1px red',
        //textShadow: '5px 5px 0px rgba(255, 255, 255, 0.2)',
        // WebkitTextStroke: '1px black',
    },
    heroSubtitle:
    {
        fontFamily: `'Comfortaa', sans-serif`,
        letterSpacing: 1.2,
        marginTop: 5,
        zIndex: 1,
        [theme.breakpoints.down('md')]: { width: '75%'},
        [theme.breakpoints.down('sm')]: { width: '90%'}
    },
    /* ============ About us elements ============ */
    aboutTitle:
    {
        fontFamily: `'Poppins', sans-serif`,
        color: '#28395A',
        fontSize: 40,
        fontWeight: 600,
        lineHeight: 1.2,
        marginBottom: 25
    },
    aboutText:
    {
        fontFamily: `'Poppins', sans-serif`,
        fontSize: 18
    },
    aboutButton:
    {
        borderRadius: 25,
        width: 180,
        height: 45,
        fontSize: 18,
        letterSpacing: 1,
        zIndex: 1,
        marginTop: 30,
        color: 'white',
        textTransform: 'capitalize',
        background: 'linear-gradient(to left, #1d5692 50%, #153b64 50%) right',
        backgroundSize: '200%',
        transition: '0.4s ease-out',
        '&:hover':
        {
            backgroundPosition: 'left'
        }
    },
    /* ============ Features elements ============ */
    featureTitle:
    {
        fontFamily: `'Poppins', sans-serif`,
        fontWeight: 600,
        letterSpacing: 1,
        lineHeight: 1.1,
        marginBottom: 15
    },
    featureText:
    {
        fontFamily: `'Poppins', sans-serif`,
        lineHeight: 1.4
    },
    /* ============ Features elements ============ */
    footerContent:
    {
        color: 'white',
        fontFamily: `'Poppins', sans-serif`,
        fontSize: 18,
        '@media (max-width: 500px)':
        {
            textAlign: 'center'
        }
    },
    footerDivider:
    {
        width: '100%',
        backgroundColor: '#ffffff33',
        marginBlock: 20
    },
    copyright:
    {
        color: 'white',
        fontFamily: `'Poppins', sans-serif`,
        marginBottom: -5,
        '@media (max-width: 500px)':
        {
            textAlign: 'center'
        }
    }
}));