const header = { color: 'black', letterSpacing: 1 };
const cell = { color: 'black', fontSize: 16, padding: '5px 0' };

export const tableColumns = [
    {
        name: <h5 style={header}>Position</h5>,
        selector: 'position',
        sortable: true,
        width: '200px',
        cell: row => <div style={cell}>{row.position}</div>
    },
    {
        name: <h5 style={header}>Company</h5>,
        selector: 'company',
        sortable: true,
        width: '200px',
        cell: row => <div style={cell}>{row.company}</div>
    },
    {
        name: <h5 style={header}>Status</h5>,
        selector: 'status',
        sortable: true,
        width: '200px',
        cell: row => <div style={cell}>{row.status}</div>
    },
    {
        name: <h5 style={header}>Progress</h5>,
        selector: 'progress',
        sortable: false,
        width: '300px',
        cell: row => <div style={cell}>{row.progress}</div>
    },
    {
        name: <h5 style={header}>Link</h5>,
        selector: 'link',
        sortable: false,
        width: '350px',
        cell: row => <div style={cell}>{row.link}</div>
    }
];