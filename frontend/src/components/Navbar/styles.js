import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    text: { fontFamily: `'Poppins', sans-serif`, letterSpacing: 1 },
    menuItem: { fontFamily: `'Poppins', sans-serif`, letterSpacing: 2 },
    close: { color: 'white' },
    avatar:
    {
        width: 90,
        height: 90,
        marginBottom: 10
    },
    divider: 
    {
        width: '100%', 
        backgroundColor: '#ffffff1A',
        borderRadius: 25,
        marginBottom: 5
    },
    button: 
    { 
        marginRight: 10, 
        marginLeft: -10, 
        width: 40,
        height: 40,
    },
    link:
    {
        textDecoration: 'none',
        color: 'white'
    },
    paper:
    {
        width: 350,
        paddingBlock: 10,
        paddingInline: 20,
        cursor: 'default',
        color: 'white',
        backgroundColor: '#18191d',
        borderRight: '1px solid #ffffff1A',
        [theme.breakpoints.down('xs')]:
        {
            width: '100%'
        }
    }
}));