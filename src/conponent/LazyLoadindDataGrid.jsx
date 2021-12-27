import React, { Suspense } from 'react';
import loadable from './loadable';
import { ButtonBase, Typography, Button, Container, makeStyles } from '@material-ui/core';
import SingleImgCreator from './SingleImgCreator';
import { GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';




const useStyles = makeStyles({

    drop_multi: {
        width: "100%",
        minWidth: "100%",
    },
    inputField: {
        width: "100%",
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
            borderRadius: "5px 5px 0 0"
        },
    },
    formControl: {
        minWidth: "100%",
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
            borderRadius: "5px 5px 0 0"
        },
    },
    hide: {
        display: "none",
    },
    show: {
        display: "block",
    },
    header: {
        backgroundColor: "red"
    },
    report: {
        width: "100wh",
        // minWidth: "100%",
        margin: "0%",
        padding: "0%",

    },


    haddingCss: {

        fontWeight: 'bolder',
        fontStretch: 'normal',
        fontSize: '16px',
        lineHeight: 'normal',
        fontFamily: 'Raleway, sans - serif',
        letterSpacing: '2px',

    },
    hadding: {
        fontWeight: 500,
        fontSize: '18px',
        fontStretch: 'normal',
        // lineHeight: 5.4,
        fontFamily: 'Raleway, sans-serif',
        letterSpacing: '1px',
        textAlign: "left"
    },
    rowData: {
        fontWeight: 500,
        fontFamily: "Playfair Display,seri",
        fontSize: '18px',
        // lineHeight: '20px',
        letterSpacing: '1px',
        textAlign: "left",
    },


});

const DataGrid = loadable(() =>
    import('@material-ui/data-grid').then(module => {
        return { default: module.DataGrid };
    }),
);

function CustomToolbar(props) {
    return (
        <GridToolbarContainer>
            <GridToolbarExport csvOptions={{ fileName: `Npim-${new Date()}` }} />
        </GridToolbarContainer>
    );
}
const LazyLoadindDataGrid = props => {
    const classes = useStyles();
    const { col, rows, caller, reportLable, rowDataHandler } = props;

    const coloum = col.map((element) => {

        let fieldRes;

        if (element === "Action") {
            fieldRes = {
                field: "Action",
                headerName: "Action",
                sortable: false,
                // width: 100,
                flex: 1,

                disableClickEventBubbling: true,
                renderCell: (params) => {
                    return <Button onClick={(data) => { rowDataHandler(params.row) }}>Edit</Button>;
                }
            }
        }
        else
            if (element === "Image") {
                fieldRes = {

                    field: "Image",
                    headerName: "Image",
                    sortable: false,
                    // width: 100,
                    innerHeight: 500,
                    flex: 1,

                    renderCell: (params) => {
                        return <SingleImgCreator
                            itemCode={(params.row.itemCode) ? params.row.itemCode : "not item codev"}
                            link="https://tanishqdigitalnpim.titan.in/NpimImages/"
                        />
                    }


                }
            }
            else {
                fieldRes = {

                    field: element,
                    flex: 1,
                    sortable: false,
                    // width: 150,
                    // headerName: element.toUpperCase(),



                }
            }



        return fieldRes

    });

    return (

        <>

            <Container maxWidth="xl" >

                <Typography align="center" variant="h5" color="secondary">{reportLable}</Typography>
                <Suspense fallback={<Typography>Data is loading </Typography>}  >
                    <DataGrid
                        rows={rows}
                        columns={coloum}
                        autoHeight={true}
                        // autoPageSize={true}
                        // pageSize={100}
                        // pageSize={10}
                        // paginationMode="server"
                        // disableColumnSelector
                        rowsPerPageOptions={[50]}
                        pagination
                        pageSize={50}
                        // rowCount={100}
                        // paginationMode="server"
                        // onPageChange={(newPage) => setPage(newPage)}
                        // loading={loading}
                        components={{
                            Toolbar: CustomToolbar,

                        }}

                    />
                </Suspense>
            </Container>
        </>
    );
};

export default LazyLoadindDataGrid;