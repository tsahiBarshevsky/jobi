import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    text: { fontFamily: `'Poppins', sans-serif`, letterSpacing: 1 },
    menuItem: { fontFamily: `'Poppins', sans-serif`, letterSpacing: 2 },
    button: { marginRight: 10, marginLeft: -10 },
    close: { color: 'white'},
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