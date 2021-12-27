import { makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    table: {
        minWidth: 1,
        margin: "0%",
        marginBottom: "1%",

        pending: "0%"

    },
    tableHeader: {
        backgroundColor: "#a1887f"
    },
    tableCell: {
        border: "solid",
        borderColor: "#dcded5"
    },



});
const StatusTabular = (props) => {
    const classes = useStyles();
    console.log("statusData DAata from Statsus table  ", props.statusData);
    let statusData = props.statusData;
    const rowcreater = (oneStatus) => {
        let rows = [];
        let count = 0;
        for (const property in oneStatus) {
            rows[count++] = <TableCell className={classes.tableCell} align="center">{oneStatus[property]}</TableCell>;
        }
        return rows;
    };

    return (
        <>
            <Paper>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead >
                        <TableRow  >
                            {
                                statusData.coloum.map((statusColoum, index) => (
                                    <TableCell className={classes.tableCell} key={index} align="center"><Typography variant="h6">{statusColoum.toUpperCase()}</Typography></TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            statusData.value.map((statusColoum, index) => (
                                <TableRow key={statusColoum.id}>
                                    {rowcreater(statusColoum)}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
};

export default StatusTabular;




