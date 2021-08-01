import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar:
    {
        top: 0,
        padding: '0 15px',
        color: 'white',
        boxShadow: '0 2px 3px rgba(15, 15, 15, 0.25)',
        backgroundColor: '#010E21',
        [theme.breakpoints.down('xs')]: { padding: '0 5px' }
    },
    toolbar:
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    links:
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 'fit-content',
    },
    link:
    {
        fontSize: 18,
        color: 'white',
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        textTransform: 'capitalize',
        padding: '0 10px'
    },
    logo:
    {
        fontFamily: `'WindSong', sans-serif`,
        cursor: 'pointer',
        userSelect: 'none'
    },
    registration:
    {
        borderRadius: 25,
        width: 120,
        height: 32,
        fontSize: 18,
        letterSpacing: 1,
        zIndex: 1,
        margin: '5px 0',
        color: 'white',
        backgroundColor: 'transparent',
        border: '2px solid white',
        textTransform: 'capitalize',
        transition: 'all 0.35s ease-in-out',
        '&:hover':
        {
            color: 'black',
            backgroundColor: 'white'
        }
    },
    login:
    {
        borderRadius: 25,
        width: 120,
        height: 32,
        fontSize: 18,
        letterSpacing: 1,
        zIndex: 1,
        margin: '5px 0',
        color: 'black',
        backgroundColor: 'white',
        border: '2px solid white',
        textTransform: 'capitalize',
        transition: 'all 0.35s ease-in-out',
        '&:hover':
        {
            color: 'white',
            backgroundColor: 'transparent'
        }
    },
    mobileMenu:
    {
        padding: '20px 15px',
        backgroundColor: '#010E21',
        [theme.breakpoints.down('xs')]: { padding: '0 5px' }
    },
    list:
    {
        listStyle: 'none'
    },
    listItem:
    {
        margin: '7px 0'
    },
    navLink:
    {
        color: 'white',
        textDecoration: 'none',
        fontSize: 19,
        cursor: 'pointer'
    }
}));