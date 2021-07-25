import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    fab:
    {
        backgroundColor: '#3aa9ab',
        color: 'white',
        position: 'fixed',
        width: 50,
        height: 50,
        zIndex: 1,
        bottom: 15,
        right: 15,
        '&:hover':
        {
            backgroundColor: '#3aa9abCC'
        }
    },
    paper: 
    { 
        borderRadius: 15, 
        width: 500,
        cursor: 'default', 
        [theme.breakpoints.down('xs')]:
        {
            width: '100%'
        }
    },
    cancel:
    {
        height: 40,
        borderRadius: 25,
        fontSize: 18,
        zIndex: 1,
        marginTop: 20,
        marginBottom: 10,
        color: '#3aa9ab',
        border: '2px solid #3aa9ab',
        backgroundColor: 'transparent',
        textTransform: 'capitalize',
        transition: '0.5s ease-out',
        '&:hover':
        {
            backgroundColor: 'transparent'
        }
    },
    delete:
    {
        height: 40,
        borderRadius: 25,
        fontSize: 18,
        zIndex: 1,
        marginTop: 20,
        marginBottom: 10,
        color: 'white',
        backgroundColor: '#3aa9ab',
        textTransform: 'capitalize',
        transition: '0.5s ease-out',
        '&:hover':
        {
            backgroundColor: '#3aa9ab'
        }
    }
}));