import { Typography } from '@material-ui/core';
import { makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Divider } from '@material-ui/core';
import React from 'react';



const useStyles = makeStyles({
    root: {
        paddingTop: "0%",


    },
    table: {
        minWidth: 1,
        margin: "0%",
        marginBottom: "1%",
        pending: "0%",
        backgroundColor: "#c4c4c0",
        fontFamily: "Raleway,sans-serif",


    },

    tableHeader: {

    },
    tableCell: {
        border: "solid",
        borderColor: "white",
        letterSpacing: "2px",
        fontSize: "13px",
        fontWeight: 500,
        lineHeight: "normal",

    },

});

const StaticTabularInformation = (props) => {
    const classes = useStyles();
    return (
        <>

            <div className={classes.root}>

                <Paper>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead className={classes.tableHeader}>
                            <TableRow  >
                                <TableCell className={classes.tableCell} className={classes.tableCell} component="th" scope="row" align="left"> SI2_GH</TableCell>
                                <TableCell className={classes.tableCell} align="left"> VS_GH</TableCell>
                                <TableCell className={classes.tableCell} align="left"> VVS1</TableCell>
                                <TableCell className={classes.tableCell} align="left"> I2_GH</TableCell>
                                <TableCell className={classes.tableCell} align="left"> SI2_IJ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >

                            <TableRow key={props.si2Gh}>
                                <TableCell className={classes.tableCell} component="td" scope="row" align="left">{props.si2Gh}</TableCell>
                                <TableCell className={classes.tableCell} align="left">{props.vsGh}</TableCell>
                                <TableCell className={classes.tableCell} align="left">{props.vvs1}</TableCell>
                                <TableCell className={classes.tableCell} align="left">{props.i2Gh}</TableCell>
                                <TableCell className={classes.tableCell} align="left">{props.si2Ij}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </>
    );
};

export default StaticTabularInformation;