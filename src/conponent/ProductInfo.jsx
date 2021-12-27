

import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { makeStyles, Grid, Paper, Container, Divider, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import ImgShow from "./ImgShow";
import MuliSelectDropdownField from "./MuliSelectDropdownField";



const useStyles = makeStyles({
    feedbackSwitch: {
        justifyContent: "center",
    },
    root: {



    },
    proinfo: {
        padding: "5%",
        margin: "2%"
    },
    proHeading: {
        textAlign: "center",
        fontWeight: 'bolder',
        fontStretch: 'normal',
        fontSize: '16px',
        lineHeight: 'normal',
        fontFamily: 'Raleway, sans - serif',
        letterSpacing: '2px',
    },

    feedback: {

        textAlign: "center",
        textAlign: "center"

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
    headingColor: {
        backgroundColor: "#c4c4c0",
        fontWeight: "bolder"
    },

});
const ProductInfo = (props) => {

    const classes = useStyles();
    const [switchData, setSwitchData] = useState(true);
    const [multiSelectDrop, setMultiSelectDrop] = useState([]);

    useEffect(() => {
        setSwitchData(true)
    }, [props]);
    const handleChange = (event) => {
        setSwitchData(!switchData)

        console.log(switchData);
    };

    const onMultiSelect = (multiSelectData) => {
        setMultiSelectDrop(multiSelectData);
        console.log(multiSelectDrop);
    };



    const onClickSubmitBtnHandler = (event) => {

        return props.getResponceFormChild({
            switchData: switchData,
            multiSelectDrop: multiSelectDrop,
        });

    };


    return (
        <>


            <Container maxWidth="xl" className={classes.root} >
                <Paper>
                    <Grid container spacing={2}>

                        <Grid item xs={5}><br />
                            <Paper>
                                <div className="img_info_show ">
                                    <ImgShow className="img_show"
                                        // itemCode={props.itemCode}
                                        itemCode={props.productInfo.itemCode}
                                        imgLink="https://tanishqdigitalnpim.titan.in/NpimImages/"
                                        videoLink=""
                                    />
                                </div>
                            </Paper>
                        </Grid>
                        <Divider />
                        <Grid item xs={7}>

                            <Paper>
                                <div className={classes.proinfo}>

                                    <Typography className={classes.headingColor} align="center">{props.productInfo.itemCode}</Typography><br />


                                    <h5 className={classes.proHeading}>Product Description</h5>

                                    <table style={{ width: "100%", fontWeight: 900, letterSpacing: "2px" }}>
                                        <tbody>

                                            <tr>
                                                <th className={classes.hadding}>Collection</th>
                                                <td>-&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
                                                <td className={classes.rowData}> {props.productInfo.collection}</td>
                                            </tr>
                                            <tr>
                                                <th className={classes.hadding}>Consumer Base</th>
                                                <td>-</td>
                                                <td className={classes.rowData}> {props.productInfo.consumerBase}</td>
                                            </tr>
                                            <tr>
                                                <th className={classes.hadding}>Group</th>
                                                <td>-</td>
                                                <td className={classes.rowData}> {props.productInfo.itGroup}</td>
                                            </tr>
                                            <tr>
                                                <th className={classes.hadding}>Category</th>
                                                <td>-</td>
                                                <td className={classes.rowData}> {props.productInfo.category}</td>
                                            </tr>


                                            <tr>
                                                <th className={classes.hadding}>Std Wt</th>
                                                <td>-</td>
                                                <td className={classes.rowData}> {props.productInfo.stdWt}</td>
                                            </tr>
                                            <tr>
                                                <th className={classes.hadding}>Std UCp</th>
                                                <td>-</td>
                                                <td className={classes.rowData}> {props.productInfo.stdUCP}</td>
                                            </tr>
                                            <tr>
                                                <th className={classes.hadding}>Saleable</th>
                                                <td>-</td>
                                                <td className={classes.rowData}> {props.productInfo.saleable}</td>
                                            </tr>
                                            <tr>
                                                <th className={classes.hadding}>Reasons</th>
                                                <td>-</td>
                                                <td className={classes.rowData}> {props.productInfo.reasons}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={classes.feedback}>

                                    <Typography color="primary">Feedback</Typography>

                                    <FormGroup row className={classes.feedbackSwitch}>

                                        <FormControlLabel


                                            control={
                                                <Switch
                                                    checked={switchData}
                                                    onChange={handleChange}
                                                    name="feedbackSwitch"
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                switchData ? <Typography color="primary">YES</Typography>
                                                    :
                                                    <Typography color="secondary">NO</Typography>}
                                        />

                                    </FormGroup>
                                    <br />

                                    {(!switchData) ?
                                        <div className="mutli_select_drop">
                                            <MuliSelectDropdownField
                                                onMultiSelect={onMultiSelect}
                                                value={multiSelectDrop}

                                            />
                                        </div>
                                        : ""
                                    }

                                    <Button onClick={onClickSubmitBtnHandler} variant="outlined" color="secondary" fullWidth>
                                        Submit
                                    </Button>
                                </div>
                            </Paper>

                        </Grid>


                    </Grid>
                </Paper>
            </Container>
        </>
    )



};
export default ProductInfo;