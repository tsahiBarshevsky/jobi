import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    greet:
    {
        fontFamily: `'Poppins', sans-serif`,
        fontWeight: 600,
        lineHeight: 1.1
    },
    addJobButton:
    {
        width: 100,
        borderRadius: 5,
        color: 'white',
        backgroundColor: '#1d5692',
        textTransform: 'capitalize',
        marginLeft: 20,
        '&:hover':
        {
            backgroundColor: '#1d5692CC'
        }
    },
    columnTitle: {
        fontFamily: `'Poppins', sans-serif`,
        letterSpacing: 1.5
    },
    welcome: 
    { 
        fontFamily: `'Poppins', sans-serif`, 
        fontWeight: 600 
    },
    divider:
    {
        width: '100%',
        margin: '10px 0',
    },
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
    }
}));