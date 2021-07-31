import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    text: 
    { 
        fontFamily: `'Poppins', sans-serif`,
        width: '25%',
        textAlign: 'center',
        lineHeight: 1.2,
        zIndex: 1,
        marginBottom: 25,
        [theme.breakpoints.down('md')]: {width: '50%'},
        [theme.breakpoints.down('sm')]: {width: '100%'},
    },
    formText: 
    { 
        fontFamily: `'Poppins', sans-serif`,
        color: '#1d5692',
        textAlign: 'center',
        fontWeight: 600,
        letterSpacing: 1.2,
        marginBottom: 5,
        zIndex: 1
    },
    input:
    {
        width: 350,
        height: 40,
        borderRadius: 25,
        marginBlock: 7,
        backgroundColor: 'white',
        fontFamily: `'Poppins', sans-serif`,
        zIndex: 1,
        '@media (max-width: 400px)':
        {
            width: 250
        }
    },
    submit:
    {
        width: 250,
        height: 40,
        borderRadius: 25,
        fontSize: 18,
        zIndex: 1,
        marginTop: 20,
        marginBottom: 10,
        color: 'white',
        textTransform: 'capitalize',
        background: 'linear-gradient(to left, #1d5692 50%, #153b64 50%) right',
        backgroundSize: '200%',
        transition: '0.4s ease-out',
        '&:hover':
        {
            backgroundPosition: 'left'
        }
    }
}))