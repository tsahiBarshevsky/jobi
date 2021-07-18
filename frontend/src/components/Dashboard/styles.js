import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    divider:
    {
        width: '100%',
        marginBlock: 10
    },
    fab:
    {
        position: 'fixed',
        width: 45,
        height: 45,
        zIndex: 1,
        bottom: 15,
        right: 15
    }
}));