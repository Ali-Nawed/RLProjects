import React from 'react-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'name', label: 'Name', minWidth: 200 }
]

const data = [
    {value1: "A", value2: "1"},
    {value1: "B", value2: "2"}
];

const MyTable = () => {

    const dataRows = data.map(dataValues => {
        return (
            <TableRow key={dataValues.value1}>
                {Object.entries(dataValues).map(([k, v]) => {
                    return (
                        <TableCell key={k}>
                            {v}
                        </TableCell>
                    );
                })}
            </TableRow>
        )
    });

    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell key="name">Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyTable; 