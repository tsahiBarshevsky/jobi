import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    paper: 
    { 
        borderRadius: 10, 
        minWidth: '85vh',
        minHeight: '85vh',
        '@media (max-width: 1000px)':
        {
            minWidth: '90%'
        }
    },
    container:
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: '85vh',
    },
    details:
    {
        width: '65%',
        padding: 20
    },
    inputs:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    timelineContainer:
    {
        width: '35%',
        height: '85vh',
        color: 'white',
        backgroundColor: '#1d5692',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingBlock: 10,
        paddingInline: 15
    },
    divider:
    {
        backgroundColor: '#ffffff4D',
        marginTop: 2,
        marginBottom: 15
    },
    icon:
    {
        width: 20, 
        height: 20, 
        paddingTop: 3,
        backgroundColor: 'green', 
        color: 'white', 
        borderRadius: '50%',
        transform: 'translateX(-22%)'
    },
    action:
    {
        fontFamily: `'Poppins', sans-serif`,
        lineHeight: 1.2
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
        marginBlock: 10
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