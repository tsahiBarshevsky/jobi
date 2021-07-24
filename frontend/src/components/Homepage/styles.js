import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    text: 
    { 
        fontFamily: `'Ubuntu', sans-serif`,
        textAlign: 'start',
        letterSpacing: 1.5
    },
    item:
    {
        
        backgroundColor: 'blue'
    },
    button:
    {
        borderRadius: 25,
        width: 200,
        height: 40,
        fontSize: 18,
        letterSpacing: 1,
        marginTop: 20,
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