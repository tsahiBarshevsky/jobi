import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    dialog:
    {
        cursor: 'default',
    },
    content:
    {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input:
    {
        width: '100%',
        marginBottom: 20
    },
    button:
    {
        width: '100%',
        marginTop: 10
    }
}));