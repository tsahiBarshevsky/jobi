import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    text: 
    { 
        fontFamily: `'Poppins', sans-serif`,
        zIndex: 1 
    },
    formText: 
    { 
        fontFamily: `'Poppins', sans-serif`,
        color: '#1d5692',
        textAlign: 'center',
        fontWeight: 600,
        marginBottom: 25,
        letterSpacing: 1.2,
        zIndex: 1
    },
    title: 
    { 
        fontFamily: `'Poppins', sans-serif`,
        fontWeight: 600,
        letterSpacing: 1,
        marginBottom: 20,
        zIndex: 1 
    },
    button:
    {
        width: 200,
        height: 40,
        borderRadius: 25,
        fontSize: 18,
        zIndex: 1,
        marginTop: 20,
        color: 'white',
        backgroundColor: 'transparent',
        border: '2px solid white',
        textTransform: 'capitalize',
        transition: '0.3s ease-out',
        '&:hover':
        {
            color: '#1d5692',
            backgroundColor: 'white'
        }
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
    visibilty:
    {
        fontSize: 20,
        marginRight: 15,
        color: '#BEBEBE',
        cursor: 'pointer',
        transition: 'color 0.5s ease-in-out',
        '&:hover':
        {
            color: 'black'
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
    },
    google:
    {
        width: 250,
        height: 40,
        borderRadius: 25,
        fontSize: 18,
        zIndex: 1,
        marginTop: 10,
        color: 'white',
        textTransform: 'capitalize',
        backgroundColor: '#DB4437',
        background: 'linear-gradient(to left, #DB4437 50%, #c74034 50%) right',
        backgroundSize: '200%',
        transition: '0.4s ease-out',
        '&:hover':
        {
            backgroundPosition: 'left'
        }
    }
}))