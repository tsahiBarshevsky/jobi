import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    paper: 
    { 
        borderRadius: 15, 
        width: 350, 
        '@media (max-width: 400px)':
        {
            width: '100%'
        }
    },
    dialog:
    {
        cursor: 'default',
    },
    title:
    {
        backgroundColor: '#f5f5f5'
    },
    titleItems:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content:
    {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#f5f5f5'
    },
    input:
    {
        width: '100%',
        marginBottom: 20
    },
    select:
    {
        width: '100%',
        marginBottom: 20
    },
    button:
    {
        marginBlock: 5,
        height: 40,
        borderRadius: 5,
        fontSize: 18,
        zIndex: 1,
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
        color: 'white',
        backgroundColor: '#1d5692',
        textTransform: 'capitalize',
        transition: '0.5s ease-out',
        '&:hover':
        {
            backgroundColor: '#1d5692CC'
        }
    }
}));