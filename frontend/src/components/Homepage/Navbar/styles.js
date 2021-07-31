import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar:
    {
        top: 0,
        paddingInline: 15,
        color: 'white',
        boxShadow: '0 2px 3px rgba(15, 15, 15, 0.25)',
        backgroundColor: '#010E21',
        [theme.breakpoints.down('xs')]: { paddingInline: 5 }
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
        paddingInline: 10
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
        marginInline: 5,
        zIndex: 1,
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
        marginInline: 5,
        zIndex: 1,
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
        paddingInline: 15,
        paddingBlock: 20,
        backgroundColor: '#010E21',
        [theme.breakpoints.down('xs')]: { paddingInline: 5 }
    },
    list:
    {
        listStyle: 'none'
    },
    listItem:
    {
        marginBlock: 7
    },
    navLink:
    {
        color: 'white',
        textDecoration: 'none',
        fontSize: 19,
        cursor: 'pointer'
    }
}));