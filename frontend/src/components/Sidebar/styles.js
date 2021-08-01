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
        marginBottom: 8
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
    logo:
    {
        fontFamily: `'WindSong', sans-serif`,
        userSelect: 'none',
        transform: 'translateX(-10%)',
        textDecoration: 'none',
        marginBottom: 25,
        fontSize: 35,
        [theme.breakpoints.down('sm')]: { display: 'none' }
    }
}));