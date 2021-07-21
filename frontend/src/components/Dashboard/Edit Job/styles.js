import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    paper: 
    { 
        borderRadius: 15, 
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
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5'
    },
    input:
    {
        width: '100%',
        marginBottom: 20
    },
    actions:
    {
        backgroundColor: '#f5f5f5',
        marginTop: -15
    },
    iconButton:
    {
        width: 35,
        height: 35,
    }
}));