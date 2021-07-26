import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    columnTitle: {
        fontFamily: `'Poppins', sans-serif`,
        // fontWeight: 600,
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
        marginBlock: 10
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