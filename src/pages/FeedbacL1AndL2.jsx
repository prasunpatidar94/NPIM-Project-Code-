import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./FeedbacL1AndL2.css"
import UpperHeader from "../conponent/UpperHeader";
import LowerHeader from "../conponent/LowerHeader";
import MuliSelectDropdownField from "../conponent/MuliSelectDropdownField";
import axios from "axios";
import NpimDataDisplay from "../conponent/NpimDataDisplay";
import { FormGroup, FormControlLabel, Switch, makeStyles, Grid, Button, Container, Typography, Drawer, Divider, CssBaseline } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useParams } from "react-router";
import HostManager from "../HostManager/HostManager";
import Loading from "../conponent/Loading";
import StaticTabularInformation from "../conponent/StaticTabularInformation";
import StatusTabular from "../conponent/StatusTabular";
import WarningPopup from "../conponent/WarningPopup";
import ImgShowForFeedBack from "../conponent/FeedbackComponentForL1AndL2";
import ImgShow from "../conponent/ImgShow";
import AlertPopup from "../conponent/AlertPopup";



const useStyles = makeStyles({

    root: {
        flexGrow: 1,
    },
    feedbackSwitch: {
        justifyContent: "center",
    },
    btnGroup: {
        minWidth: "100%",
    },
    hidden: {
        display: "none"
    },
    show: {
        display: "block"

    },
    btnGroupContaincer: {
        paddingTop: "13%",
    },



    image_data_show: {
        maxWidth: "25rem",
    },
    card: {
        maxWidth: "22rem",
        height: "55vh",
        margin: "5%",
        /* background-color: rgb(189, 173, 153); */
    },

    img_show: {
        width: "22wh",
        height: "50vh",
        /* margin: 2%; */
        /* background-color: wheat; */
    },

    img_info_show: {
        padding: "2 %"
    },
    product_disc_show: {
        marginTop: "2 %",
    },
    feedback_show: {
        marginTop: "2 %"
    },

    pro_info: {
        marginTop: "8%",
        height: "20rem",
    },
    feed_info: {
        marginTop: "8%",
        height: "20rem",
    },
    headingColor: {
        backgroundColor: "#c4c4c0",
        fontWeight: "bolder"
    },

    hadding: {
        fontWeight: 500,
        fontSize: '18px',
        fontStretch: 'normal',
        // lineHeight: 5.4,
        fontFamily: 'Raleway, sans-serif',
        letterSpacing: '5px',
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
    headingCss: {

        fontWeight: 'bolder',
        fontStretch: 'normal',
        fontSize: '16px',
        lineHeight: 'normal',
        fontFamily: 'Raleway, sans - serif',
        letterSpacing: '2px',

    },
    btn: {
        fontWeight: 500,
        fontSize: '14px',
        fontFamily: 'Raleway, sans-serif',
        letterSpacing: '2px',
        padding: '5px',
    },

    btnSub: {
        fontWeight: 500,
        fontSize: '14px',
        fontFamily: 'Raleway, sans-serif',
        letterSpacing: '2px',
        padding: '5px',
        backgroundColor: "black",
        color: "white"
    },
});

const FeedbacL1AndL2 = () => {

    const classes = useStyles();
    const { storeCode, rsoName } = useParams();

    const [feedShowState, setFeedShowState] = useState(NpimDataDisplay);
    const [multiSelectDrop, setMultiSelectDrop] = useState([]);
    const [loading, setLoading] = useState(false);
    const [switchData, setSwitchData] = useState(true);
    const [resetDrop, SetResetDrop] = useState(true);
    const [warningPopupState, setWarningPopupState] = useState(false);


    const [alertPopupStatus, setAlertPopupStatus] = useState({
        status: false,
        main: "",
        contain: "",
        mode: false,
    });
    const [productDetails, setProductDetails] = useState({
        storeCode: storeCode,
        collection: 'ALL',
        consumerBase: 'ALL',
        group: 'ALL',
        category: 'ALL'
    });
    const [statusData, setStatusData] = useState({});



    const navBarList = [
        { id: 1, name: "Home", link: `/feedbackL1andL2/${storeCode}/${rsoName}`, icon: "HomeIcon" },
        { id: 3, name: "Report", link: `/reportL1andL2/${storeCode}/${rsoName}`, icon: "ReportIcon" },
    ];
    // const navBarList = [
    //     { id: 1, name: "Home", link: `/feedbackL1andL2/${storeCode}/${rsoName}`, icon: "HomeIcon" },
    //     // { id: 2, name: "Status", link: "/status", icon: "EqualizerIcon" },
    //     { id: 3, name: "Report", link: `/reportL1andL2/${storeCode}/${rsoName}`, icon: "ReportIcon" },
    // ];
    const handleChange = (event) => {
        setSwitchData(!switchData)

        console.log(switchData);




    };



    useEffect(() => {

        setImmediate(() => {
            setLoading(true);
        });


        setTimeout(() => {
            axios.post(`${HostManager.mainHost}/npim/get/product/details`, productDetails).
                then(responce => {

                    console.log(responce.data);
                    let mailSms = "";

                    if (responce.data.code === "1001") {

                        if (productDetails.collection == "ALL" || productDetails.consumerBase == "ALL" ||
                            productDetails.group == "ALL" || productDetails.category == "ALL") {
                            mailSms = "You have successfully completed the Indented. Thankyou."

                        } else if (productDetails.collection !== "ALL" || productDetails.consumerBase !== "ALL" ||
                            productDetails.group !== "ALL" || productDetails.category !== "ALL") {
                            mailSms = "No more data available for the selected category."
                        } else {
                            mailSms = responce.data.value;
                        }

                        setImmediate(() => {
                            setAlertPopupStatus({
                                status: true,
                                main: mailSms,
                                contain: "",
                                mode: true,

                            });
                        });
                    } else {
                        setFeedShowState(responce.data.value);


                    }



                }).catch(error => {


                    console.log(error);
                    alert(error);


                });





            axios.get(`${HostManager.mainHost}/npim/status/L1/${storeCode}`).
                then((response) => {

                    console.log(response);

                    if (response.data.code === "1001") {
                        alert(response.data.value);
                    } else {
                        setStatusData(response.data);
                    }
                }, (error) => {
                    console.log(error);
                    alert(error);

                });

            setImmediate(() => {
                setLoading(false);
            });
        }, 1000);



    }, [productDetails]);



    const onSearchClick = (dropState) => {
        console.log(dropState);


        setProductDetails({
            storeCode: storeCode,
            collection: dropState.collection,
            consumerBase: dropState.consumerBase,
            group: dropState.groupdata,
            category: dropState.category,
        });


        console.log(productDetails);
        ;

    };

    const onBarClick = () => {
        console.log("click bbar *****************");


    };


    function closeHandler() {
        setImmediate(() => {
            setAlertPopupStatus({

                status: false,
                main: "",
                contain: "",
                mode: false,


            });
        });
        setImmediate(() => {
            setLoading(false);
        });
    }

    function closeHandlerForRest() {
        setImmediate(() => {
            setAlertPopupStatus({


                status: false,
                main: "",
                contain: "",
                mode: false,

            });

            SetResetDrop(!resetDrop)
            setProductDetails({
                storeCode: storeCode,
                collection: 'ALL',
                consumerBase: 'ALL',
                group: 'ALL',
                category: 'ALL',
            });



        });

        setImmediate(() => {
            setLoading(false);
            SetResetDrop(true)
        });


    }

    const onClickSubmitBtnHandler = (event) => {

        setImmediate(() => {
            setLoading(true);
        });


        if (!switchData && multiSelectDrop.toString().length == 0) {
            alert("Please select reason for NO..  !");
            ;

            return;
        }

        // setTimeout(() => {

        setFeedShowState(old => {
            if (!switchData) {
                old.reasons = multiSelectDrop.toString();
                old.saleable = "NO";
                old.rsoName = storeCode;
            }
            else {
                old.reasons = "";
                old.saleable = "YES";
                old.rsoName = storeCode;
            }
            old.collection = productDetails.collection;
            old.consumerBase = productDetails.consumerBase;
            old.itGroup = productDetails.group;
            old.submitStatus = "feedback";
            old.category = productDetails.category;
            return old;
        });


        // }, 1000);

        setTimeout(() => {

            axios.post(`${HostManager.mainHost}/npim/insert/responses`, feedShowState).
                then(responce => {
                    console.log(responce.data);
                    let mailSms = "";
                    if (responce.data.code === "1001") {
                        // alert(responce.data.value)
                        if (productDetails.collection == "ALL" || productDetails.consumerBase == "ALL" ||
                            productDetails.group == "ALL" || productDetails.category == "ALL") {
                            mailSms = "You have successfully completed the Indented. Thankyou."

                        } else if (productDetails.collection !== "ALL" || productDetails.consumerBase !== "ALL" ||
                            productDetails.group !== "ALL" || productDetails.category !== "ALL") {
                            mailSms = "No more data available for the selected category."
                        } else {
                            mailSms = responce.data.value;
                        }

                        setImmediate(() => {
                            setAlertPopupStatus({
                                status: true,
                                main: mailSms,
                                contain: "",
                                mode: true,

                            });
                        });

                    } else {
                        setFeedShowState(responce.data.value);
                    }


                }).catch(error => {
                    console.log(error);
                    alert(error);
                });
            setMultiSelectDrop([]);
            setSwitchData(true);
            setImmediate(() => {
                setLoading(false);
            });

        }
            , 1500);

    };

    const onMultiSelect = (multiSelectData) => {
        setMultiSelectDrop(multiSelectData);
        console.log(multiSelectDrop);
    };


    const onClickNextPreBtnHandler = (direction) => {



        setImmediate(() => {
            setLoading(true);
        });


        const Input = {
            "storeCode": storeCode,
            "collection": productDetails.collection,
            "consumerBase": productDetails.consumerBase,
            "group": productDetails.group,
            "category": productDetails.category,
            "itemCode": feedShowState.itemCode,
            "direction": direction
        };

        console.log(Input);

        setTimeout(() => {
            axios.post(`${HostManager.mainHost}/npim/get/product/details/PreNex`, Input).
                then(responce => {

                    console.log(responce.data);
                    let mailSms = "";
                    if (responce.data.code === "1001") {

                        // alert(responce.data.value)
                        if (productDetails.collection == "ALL" || productDetails.consumerBase == "ALL" ||
                            productDetails.group == "ALL" || productDetails.category == "ALL") {
                            mailSms = "You have successfully completed the Indented. Thankyou."

                        } else if (productDetails.collection !== "ALL" || productDetails.consumerBase !== "ALL" ||
                            productDetails.group !== "ALL" || productDetails.category !== "ALL") {
                            mailSms = "No more data available for the selected category."
                        } else {
                            mailSms = responce.data.value;
                        }

                        setImmediate(() => {
                            setAlertPopupStatus({
                                status: true,
                                main: mailSms,
                                contain: "",
                                mode: true,

                            });
                        });

                    } else {
                        setFeedShowState(responce.data.value);


                    }




                }).catch(error => {


                    console.log(error);
                    ;
                    alert(error);


                });
            setSwitchData(true);

            setImmediate(() => {
                setLoading(false);
            });

        }, 1500);





    };

    return (<React.Fragment>

        <CssBaseline />

        <WarningPopup
            flag={warningPopupState}
            headerSms="No more data available for the selected category"
            subSms="Please click on Agree...!"
            reportLink={`/reportL1andL2/${storeCode}/${rsoName}`}
        />


        <AlertPopup
            status={alertPopupStatus.status}
            // status={true}
            mainLable={alertPopupStatus.main}
            containLable={alertPopupStatus.contain}
            procideHandler=""
            discardHandler=""
            closeHandler={() => {
                (alertPopupStatus.mode) ? closeHandlerForRest() : closeHandler()
            }}
        />

        <Grid container className={classes.root} spacing={2} >
            <Grid item xs={12}>
                <UpperHeader itemCode={feedShowState.itemCode} storeCode={feedShowState.strCode} />
                <Loading
                    flag={loading} />

                {(resetDrop) ?
                    <LowerHeader
                        onBar={onBarClick}
                        onSear={onSearchClick}
                        navBarList={navBarList}
                        statusData={statusData}

                    /> : "LOding...!"}
            </Grid>
            <Grid item xs={12}>
                <div className="container-fluid   " style={{ marginTop: "1%" }} >
                    <div className="row">
                        <div className="col-md-5 border">
                            <div className="img_info_show ">

                                {

                                    (feedShowState.itemCode !== "") ?
                                        <ImgShow className="img_show"
                                            itemCode={feedShowState.itemCode}
                                            imgLink="https://tanishqdigitalnpim.titan.in/NpimImages/"
                                            videoLink={feedShowState.videoLink}
                                        /> : "Loding Images... "
                                }

                            </div>
                        </div>
                        <div className="col-md-7 border" style={{ margin: "0%", padding: "0%" }}>
                            <Typography className={classes.headingColor} align="center">{feedShowState.itemCode}</Typography>

                            <div className="row">
                                <div className="col-md-6 border" style={{ margin: "0%", padding: "0%" }} >
                                    <div className="pro_info ">
                                        <Typography className={classes.headingCss} align="center">Product Details</Typography>

                                        <table style={{ width: "100%", fontWeight: 900, letterSpacing: "2px" }}>
                                            <tbody>
                                                <tr>
                                                    <th classNme={classes.hadding}>Collection</th>
                                                    <td>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                    <td className={classes.rowData}> {feedShowState.collection}</td>
                                                </tr>
                                                <tr>
                                                    <th classNme={classes.hadding}>Consumer Base</th>
                                                    <td>-</td>
                                                    <td className={classes.rowData}> {feedShowState.consumerBase}</td>
                                                </tr>
                                                <tr>
                                                    <th classNme={classes.hadding}>Group</th>
                                                    <td>-</td>
                                                    <td className={classes.rowData}> {feedShowState.itGroup}</td>
                                                </tr>
                                                <tr>
                                                    <th classNme={classes.hadding}>Category</th>
                                                    <td>-</td>
                                                    <td className={classes.rowData}> {feedShowState.category}</td>
                                                </tr>
                                                <tr>
                                                    <th classNme={classes.hadding}>Gender</th>
                                                    <td>-</td>
                                                    <td className={classes.rowData}> {feedShowState.gender}</td>
                                                </tr>
                                                <tr>
                                                    <th classNme={classes.hadding}>Complexity</th>
                                                    <td>-</td>
                                                    <td className={classes.rowData}> {feedShowState.complexity}</td>
                                                </tr>
                                                <tr>
                                                    <th classNme={classes.hadding}>Std Wt</th>
                                                    <td>-</td>
                                                    <td className={classes.rowData}> {feedShowState.stdWt}</td>
                                                </tr>
                                                <tr>
                                                    <th classNme={classes.hadding}>Std UCp</th>
                                                    <td>-</td>
                                                    <td className={classes.rowData}> {feedShowState.stdUCP}</td>
                                                </tr>
                                                <tr>
                                                    <th classNme={classes.hadding}>Metal Colour</th>
                                                    <td>-</td>
                                                    <td className={classes.rowData}> {feedShowState.colourWt}</td>
                                                </tr>
                                                <tr>
                                                    <th classNme={classes.hadding}>Findings</th>
                                                    <td>-</td>
                                                    <td className={classes.rowData}> {feedShowState.findings}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-6 border" style={{ margin: "0%", padding: "0%" }}>
                                    <div className="feed_info  ">
                                        {/* <h5 className="text-center">Feedback</h5> */}
                                        <Typography className={classes.headingCss} align="center">Feedback</Typography>


                                        <div className="text-lg-center" >
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {(feedShowState.si2Gh) ?
                                <div className="row-cols-1 staticTabularInfo">
                                    <Container m={0} p={0}>

                                        <StaticTabularInformation
                                            si2Gh={feedShowState.si2Gh}
                                            vsGh={feedShowState.vsGh}
                                            vvs1={feedShowState.vvs1}
                                            i2Gh={feedShowState.i2Gh}
                                            si2Ij={feedShowState.si2Ij}

                                        />
                                    </Container>
                                </div>
                                : ""
                            }
                            <div className="row-cols-1 btn_feed_show">
                                <Container className={classes.btnGroupContaincer} >
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={4}  >
                                            <Button className={classes.btn} onClick={() => { onClickNextPreBtnHandler("pre") }} startIcon={<ArrowBackIosIcon />} variant="outlined" fullWidth >
                                                Previous
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={4}  >
                                            <Button className={classes.btnSub} onClick={onClickSubmitBtnHandler} variant="contained" fullWidth>
                                                Submit
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={4}  >
                                            <Button className={classes.btn} onClick={() => { onClickNextPreBtnHandler("next") }} endIcon={<ArrowForwardIosIcon />} variant="outlined" fullWidth>
                                                Next
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    </React.Fragment>);
};
export default FeedbacL1AndL2;













