import { Grid, Container, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LazyLoadindDataGrid from "../conponent/LazyLoadindDataGrid";
import LazyLoadindDataGridForClosedPortel from "../conponent/LazyLoadindDataGridForClosedPortel";
import Loading from "../conponent/Loading";
import UpperHeader from "../conponent/UpperHeader";
import HostManager from "../HostManager/HostManager";
import UrlManager from "../HostManager/UrlManager";

export default function PortelCloseReport(props) {

    const { storeCode, rsoName, level } = useParams();
    const [report, setReport] = useState({
        col: [],
        rows: [],
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setImmediate(() => { setLoading(true) });

        ReportRestCall()
    }, []);

    function ReportRestCall() {


        axios.get(`${HostManager.mainHostL3}/npim/item/wise/rpt/L3/for/close/portel/${storeCode}/${level}`)
            .then((response) => {

                console.log(response);

                setImmediate(() => {

                    if (response.data.code === "1000") {

                        setReport({
                            col: response.data.coloum,
                            rows: response.data.value,
                        })

                    } else {

                        setReport({
                            col: [],
                            rows: [],
                        })

                    }
                });
            }, (error) => {
                console.log(error);
                alert(error);

            });
        setTimeout(() => {
            setImmediate(() => { setLoading(false) });
        }, 1000);


    }

    return (<>

        <Grid container spacing={4} >
            <Grid item xs={12} sm={12}>
                <UpperHeader
                    itemCode={rsoName}
                    storeCode={storeCode}
                />
                <Loading
                    flag={loading} />
            </Grid>
            <Grid item xs={12} sm={12}  >
                <Container maxWidth="xl" >
                    <Paper>

                        {(report.rows.length > 0 && report.col.length > 0) ?

                            <LazyLoadindDataGrid
                                col={report.col}
                                rows={report.rows}
                                autoHeight={true}
                                autoPageSize={true}
                            // reportLable={reportLable}
                            // rowDataHandler={rowDataHandler}
                            />
                            :
                            <Typography align="center" variant="h5" color="secondary"> No Data Found...!</Typography>
                        }
                    </Paper>
                </Container>
            </Grid>
        </Grid>

    </>);

}