import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    title:
    {
        fontFamily: `'Poppins', sans-serif`,
        fontWeight: 600,
        lineHeight: 1.1
    },
    statTitle:
    {
        fontFamily: `'Poppins', sans-serif`,
        color: '#1d5692',
        fontWeight: 600,
        letterSpacing: 1.2,
        marginBottom: 10
    },
    statContent:
    {
        fontFamily: `'Poppins', sans-serif`,
        marginBottom: -3
    },
    grid:
    {
        marginBottom: 2
    },
    item:
    {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    }
}));