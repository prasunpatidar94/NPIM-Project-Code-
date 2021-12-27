import { Container, FormControl, Grid, makeStyles, Paper, Typography, CssBaseline, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ImgShow from '../conponent/ImgShow';
import LowerHeader from '../conponent/LowerHeader';
import ProductDetailsTabular from '../conponent/ProductDetailsTabular';
import UpperHeader from '../conponent/UpperHeader';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';
import StaticTabularInformation from '../conponent/StaticTabularInformation';
import NpimDataDisplay, { IndentProductInsertL3 } from '../conponent/NpimDataDisplay';
import { useParams } from 'react-router-dom';
import Loading from '../conponent/Loading';
import axios from 'axios';
import HostManager from '../HostManager/HostManager';
import DisplayValidationComponent from '../conponent/DisplayValidationForL3';
import AlertPopup from '../conponent/AlertPopup';
import Skeleton from '@material-ui/lab/Skeleton'
import { BlinkingComponent, SmallDataTable } from '../conponent/ComponentForL3';
import { TramRounded } from '@material-ui/icons';


const useStyles = makeStyles({
    root: {
        // flexGrow: 1,
        // maxWidth: "100%",
        margin: "0%",
        padding: "0%",
        // fontFamily: 'Hanalei Fill',

    },
    imgShow: {
        // padding: "2%",
        margin: "4%",
    },
    productInfo: {
        marginTop: "3%",

    },
    hidden: {
        display: "none"
    },
    show: {
        display: "block"

    },
    headingColor: {
        backgroundColor: "#c4c4c0",
        fontWeight: "bolder"
    },
    heightCss: {
        minHeight: "50vh",

    },
    heightOuter: {
        minHeight: "78vh",
        // backgroundColor: "red"
    },
    buttonSpacing: {
        marginTop: "5%",
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
    haddingCss: {

        fontWeight: 'bolder',
        fontStretch: 'normal',
        fontSize: '16px',
        lineHeight: 'normal',
        fontFamily: 'Raleway, sans - serif',
        letterSpacing: '2px',

    }


});



const IndentL3 = () => {
    const { storeCode, rsoName } = useParams();
    const classes = useStyles();
    const [feedShowState, setFeedShowState] = useState(NpimDataDisplay);
    const [loading, setLoading] = useState(false);
    const [statusRefresh, setStatusRefresh] = useState(false);
    const [resetDrop, SetResetDrop] = useState(true);

    // const [stoneOption, setStoneOption] = useState([]);
    const [alertPopupStatus, setAlertPopupStatus] = useState({
        status: false,
        main: "",
        contain: "",
        mode: false,
    });


    const [allDataFromValidation, setAllDataFromValidation] = useState({
        sizeUomQuantityRes: [],
        sizeQuantityRes: [],
        stoneQualityRes: "",
        tegQuantityRes: [],
        typeSet2Res: "",
        quantityRes: "",
        findingsRes: "",
    });



    const [productDetails, setProductDetails] = useState({
        storeCode: storeCode,
        collection: 'ALL',
        consumerBase: 'ALL',
        group: 'ALL',
        category: 'ALL'
    });


    const [statusData, setStatusData] = useState({});

    const [digit, setDigit] = useState();
    const [setSelectState, setSetSelectState] = useState([])

    let seventhDigits;

    useEffect(() => {


        setImmediate(() => {
            setLoading(true);
        });
        setDigit();



        axios.post(`${HostManager.mainHost}/npim/get/product/details`, productDetails).
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


                    setImmediate(() => {
                        setFeedShowState(responce.data.value);
                        setDigit(responce.data.value.itemCode[6]);
                    });
                    seventhDigits = responce.data.value.itemCode[6];
                    // DisplayValidationRunner();



                }
            }).catch(error => {
                console.log(error);
                alert(error);
            });




        axios.get(`${HostManager.mainHostL3}/npim/get/status/L3/${storeCode}`)
            .then((response) => {

                console.log(response);

                if (response.data.code === "1001") {
                    alert(response.data.value);
                } else {
                    setImmediate(() => {
                        setStatusData(response.data);
                    });
                }
            }, (error) => {
                console.log(error);
                // alert(error);

            });
        setImmediate(() => {
            setLoading(false);
        });

    }, [productDetails, statusRefresh]);





    // let digit = feedShowState.itemCode[6];

    // console.log("data of seven data is the data ", digit);


    const navBarList = [
        { id: 1, name: "Home", link: `/indentL3/${storeCode}/${rsoName}`, icon: "HomeIcon" },
        // { id: 1, name: "Favorite", link: `/favoriteL3/${storeCode}`, icon: "StarsIcon" },
        { id: 3, name: "Report", link: `/reportL3/${storeCode}/${rsoName}`, icon: "ReportIcon" },
    ];
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
    };

    const onBarClick = () => {
        console.log("click bbar *****************");


    };

    const onClickSubmitBtnHandler = (event) => {

        setImmediate(() => {
            setLoading(true);
        });



        let displayData = displayPresentValidation(feedShowState.stdUCP);
        let stdUcpNotSeletData;

        if (!displayData.status) {

            // alert(displayData.alert);


            setImmediate(() => {
                setAlertPopupStatus({

                    status: true,
                    main: displayData.alert,
                    contain: ""

                });
            });

        } else {


            stdUcpNotSeletData = `stdUcp-${displayData.data}`;



            console.log("data of the feedShowState", feedShowState);




            const inputData = {
                itemCode: feedShowState.itemCode,
                strCode: storeCode,
                saleable: "",
                reasons: "",
                childNodesE: feedShowState.childNodesE,
                childNodesN: feedShowState.childNodesN,
                findings: allDataFromValidation.findingsRes,
                indQty: allDataFromValidation.quantityRes,
                indCategory: feedShowState.category,
                submitStatus: "indent",
                set2Type: allDataFromValidation.typeSet2Res,
                stoneQuality: (allDataFromValidation.stoneQualityRes) ? allDataFromValidation.stoneQualityRes : stdUcpNotSeletData,
                stoneQualityVal: feedShowState.stoneQualityVal,
                rsoName: rsoName,
                npimEventNo: feedShowState.npimEventNo,
                indentLevelType: feedShowState.itemLevelType,
                collection: productDetails.collection,
                consumerbase: productDetails.consumerBase,
                itgroup: productDetails.group,
                category: productDetails.category,
                sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
                sizeQuantitys: allDataFromValidation.sizeQuantityRes,
                tagQuantitys: allDataFromValidation.tegQuantityRes,



            }





            console.log("input from thr L3 data insert  inputData", inputData);

            DisplayValidationRunner();



            setTimeout(() => {

                axios.post(`${HostManager.mainHostL3}/npim/insert/responses/from/L3`, inputData).

                    then(responce => {

                        let mailSms = "";
                        console.log(responce.data);
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
                            // alert(responce.data.value)


                        } else {

                            setImmediate(() => {
                                setFeedShowState(responce.data.value)
                                setStatusRefresh(!statusRefresh);
                            });
                            seventhDigits = responce.data.value.itemCode[6];
                        }


                    }).catch(error => {
                        console.log(error);
                        alert(error);
                    });
                setImmediate(() => {
                    setLoading(false);
                });



                // digit = feedShowState.itemCode[6];
            }
                , 1500);





        }

        setImmediate(() => {
            setAllDataFromValidation({
                sizeUomQuantityRes: [],
                sizeQuantityRes: [],
                stoneQualityRes: "",
                tegQuantityRes: [],
                typeSet2Res: "",
                quantityRes: "",
                findingsRes: "",
            });
        });

        setImmediate(() => {
            setLoading(false);
        });
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

            SetResetDrop(!resetDrop);

            setProductDetails({
                storeCode: storeCode,
                collection: 'ALL',
                consumerBase: 'ALL',
                group: 'ALL',
                category: 'ALL'
            });

        });



        setImmediate(() => {
            setLoading(false);
            SetResetDrop(true);
        });
    }

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
                    setImmediate(() => {
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

                            seventhDigits = responce.data.value.itemCode[6];

                        }


                    })



                }).catch(error => {
                    console.log(error);
                    ;
                    alert(error);
                });

            setImmediate(() => {
                setLoading(false);
            });

        }, 1500);


        DisplayValidationRunner();


    };

    function stoneQualityCheck(inputObj) {



        if (inputObj.si2Gh) {
            return true;
        }
        if (inputObj.vsGh) {
            return true;
        }
        if (inputObj.vvs1) {
            return true;
        }
        if (inputObj.i2Gh) {
            return true;
        }
        if (inputObj.si2Ij) {
            return true;
        }
        // if (inputObj.stdUCP) {
        //     return true;
        // }
        else {
            return false;
        }

    };


    function DisplayValidationRunner() {






        setImmediate(() => {
            setDigit();

        });

        // setTimeout(() => {
        setImmediate(() => {
            setDigit(feedShowState.itemCode[6]);

        });


        // }, 1500);







    }

    function stoneOptionsData(inputObj) {

        let stoneOptionList = [];
        if (inputObj.stdUCP) {
            stoneOptionList[1 + stoneOptionList.length] = `stdUCP-${inputObj.stdUCP}`;
        }
        if (inputObj.si2Gh) {
            stoneOptionList[1 + stoneOptionList.length] = `si2Gh-${inputObj.si2Gh}`;
        }
        if (inputObj.vsGh) {
            stoneOptionList[1 + stoneOptionList.length] = `vsGh-${inputObj.vsGh}`;
        }
        if (inputObj.vvs1) {
            stoneOptionList[1 + stoneOptionList.length] = `vvs1-${inputObj.vvs1}`;
        }
        if (inputObj.i2Gh) {
            stoneOptionList[1 + stoneOptionList.length] = `i2Gh-${inputObj.i2Gh}`;
        }
        if (inputObj.si2Ij) {
            stoneOptionList[1 + stoneOptionList.length] = `si2Ij-${inputObj.si2Ij}`;
        }

        // setImmediate(() => { setStoneOption(stoneOptionList) });
        return stoneOptionList;
    }


    function createTegOfItems(inputObj) {
        let tegOfItems = ["Single_Tag", "Separate_Tag"];  //separate_Tag
        if (inputObj.childNodesE || inputObj.childNodesN) {

            if (inputObj.childNodesE) (tegOfItems[1 + tegOfItems.length] = "Only_EAR_RING")
            if (inputObj.childNodesN) (tegOfItems[1 + tegOfItems.length] = "Only_NECKWEAR_OR_PENDANT")
        } else {
            return false;
        }
        return tegOfItems;
    }



    function allDataChangeHandler(allValidationInput) {
        console.log("All Data input  From  ", allValidationInput);

        setImmediate(() => {
            setAllDataFromValidation(allValidationInput)
        });

        console.log("All Data validation From  ", allDataFromValidation);

    }


    function sizeUomQuantityResHandler(sizeUomQuantityData) {

        setImmediate(() => {

            setAllDataFromValidation(
                {
                    sizeUomQuantityRes: sizeUomQuantityData,
                    sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
                    stoneQualityRes: allDataFromValidation.stoneQualityRes,
                    tegQuantityRes: allDataFromValidation.tegQuantityRes,
                    typeSet2Res: allDataFromValidation.typeSet2Res,
                    quantityRes: allDataFromValidation.quantityRes,
                    findingsRes: allDataFromValidation.findingsRes,
                }

            )


        })
        // getAll("sizeUomQuantityRes", sizeUomQuantityData)
    }
    function sizeQuantityResHandler(sizeQuantityData) {
        setImmediate(() => {

            setAllDataFromValidation(
                {
                    sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
                    sizeQuantityRes: sizeQuantityData,
                    stoneQualityRes: allDataFromValidation.stoneQualityRes,
                    tegQuantityRes: allDataFromValidation.tegQuantityRes,
                    typeSet2Res: allDataFromValidation.typeSet2Res,
                    quantityRes: allDataFromValidation.quantityRes,
                    findingsRes: allDataFromValidation.findingsRes,
                }

            )


        })
        // getAll("sizeQuantityRes", sizeQuantityData)
    }
    function stoneQualityResHandler(stoneQualityData) {

        setImmediate(() => {

            setAllDataFromValidation(
                {
                    sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
                    sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
                    stoneQualityRes: stoneQualityData.target.value,
                    tegQuantityRes: allDataFromValidation.tegQuantityRes,
                    typeSet2Res: allDataFromValidation.typeSet2Res,
                    quantityRes: allDataFromValidation.quantityRes,
                    findingsRes: allDataFromValidation.findingsRes,
                }

            )


        })
        // getAll("stoneQualityRes", stoneQualityData.target.value)

    }
    function tegQuantityResHandler(tegQuantityData) {



        setImmediate(() => {

            setAllDataFromValidation(
                {
                    sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
                    sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
                    stoneQualityRes: allDataFromValidation.stoneQualityRes,
                    tegQuantityRes: tegQuantityData,
                    typeSet2Res: allDataFromValidation.typeSet2Res,
                    quantityRes: allDataFromValidation.quantityRes,
                    findingsRes: allDataFromValidation.findingsRes,
                }

            )


        })

        // getAll("tegQuantityRes", tegQuantityData)

    }
    function typeSet2ResHandler(typeSet2Data) {


        setImmediate(() => {

            setAllDataFromValidation(
                {
                    sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
                    sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
                    stoneQualityRes: allDataFromValidation.stoneQualityRes,
                    tegQuantityRes: allDataFromValidation.tegQuantityRes,
                    typeSet2Res: typeSet2Data.target.value,
                    quantityRes: allDataFromValidation.quantityRes,
                    findingsRes: allDataFromValidation.findingsRes,
                }

            )


        })
        // getAll("typeSet2Res", typeSet2Data.target.value)
    }
    function quantityResHandler(quantityData) {

        setImmediate(() => {

            setAllDataFromValidation(
                {
                    sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
                    sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
                    stoneQualityRes: allDataFromValidation.stoneQualityRes,
                    tegQuantityRes: allDataFromValidation.tegQuantityRes,
                    typeSet2Res: allDataFromValidation.typeSet2Res,
                    quantityRes: quantityData.target.value,
                    findingsRes: allDataFromValidation.findingsRes,
                }

            )


        })
        // getAll("quantityRes", quantityData.target.value)

    }
    function findingsResHandler(findingsData) {

        setImmediate(() => {

            setAllDataFromValidation(
                {
                    sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
                    sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
                    stoneQualityRes: allDataFromValidation.stoneQualityRes,
                    tegQuantityRes: allDataFromValidation.tegQuantityRes,
                    typeSet2Res: allDataFromValidation.typeSet2Res,
                    quantityRes: allDataFromValidation.quantityRes,
                    findingsRes: findingsData.target.value,
                }

            )


        })
        // getAll("findingsRes", findingsData.target.value)


    }


    function tegSelectionResHandler(tegSelectionData) {

        if (tegSelectionData.target.value === "Separate") {

            axios.get(`${HostManager.mailHostAdmin}/npim/get/set/category/list/${feedShowState.itemCode}`)

                .then((response) => {

                    if (response.data.code == 1000) {
                        setImmediate(() => { setSetSelectState(response.data.value.map((element) => (element.category))) });

                    } else {
                        console.log(response.data.value);
                        alert(response.data.value);
                    }

                }, (error) => {
                    console.log(error);
                    alert(error);

                });


        } else if (tegSelectionData.target.value === "Set") {

            axios.get(`${HostManager.mailHostAdmin}/npim/item/set/category/code/${feedShowState.itemCode}`)

                .then((response) => {

                    if (response.data.code == 1000) {
                        setImmediate(() => { setSetSelectState(response.data.value) });

                    } else {
                        console.log(response.data.value);
                        alert(response.data.value);
                    }

                }, (error) => {
                    console.log(error);
                    alert(error);

                });

        } else {

        }


    }




    function setSelectResHandler(setSelectData) {



        setImmediate(() => {

            setAllDataFromValidation(
                {
                    sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
                    sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
                    stoneQualityRes: allDataFromValidation.stoneQualityRes,
                    tegQuantityRes: setSelectData,
                    typeSet2Res: allDataFromValidation.typeSet2Res,
                    quantityRes: allDataFromValidation.quantityRes,
                    findingsRes: allDataFromValidation.findingsRes,
                }

            )


        })

        // getAll("tegQuantityRes", tegQuantityData)

    }



    // const getAll = (name, value) => {
    //     allDataFromValidation[name] = value;


    //     console.log("data form the get all method   :", allDataFromValidation);
    //     console.log("name : ", name, "value : ", value);
    // }


    function displayPresentValidation(input) {



        if (digit === "B" || digit === "C" || digit === "F" || digit === "R" ||
            digit === "V" || digit === "W" || digit === "Y") {

            let sizeUomQuantity, sizeQuantity, stoneQuality;

            sizeUomQuantity = allDataFromValidation.sizeUomQuantityRes;
            sizeQuantity = allDataFromValidation.sizeQuantityRes;
            stoneQuality = allDataFromValidation.stoneQualityRes;

            if (digit === "V" && !stoneQualityCheck(feedShowState)) {

                if (sizeUomQuantity.length > 0) {

                    for (const element of sizeUomQuantity) {
                        let condData = (element.size && (element.uom8 || element.uom6 || element.uom4 ||
                            element.uom2 || element.uom1)) ? console.log("fine") : element.size;

                        if (condData) {
                            return {
                                alert: "indent Quantity Required for size: " + condData,
                                status: false
                            }
                        }
                    }

                    let dataRes = {
                        status: true,
                        alert: "sucess",
                        data: 0
                    };

                    return dataRes;

                } else {
                    return {
                        alert: "indent Quantity Required ",
                        status: false
                    }
                }




            } else if ((digit === "V" || digit === "C" || digit === "F"
                || digit === "Y" || digit === "B") && stoneQualityCheck(feedShowState)) {

                if (sizeQuantity.length > 0 && stoneQualityCheck(feedShowState)) {



                    for (const element of sizeQuantity) {
                        let condData = (element.size && element.quantity) ? console.log("fine") : element.size;

                        if (condData) {
                            return {
                                alert: "indent Quantity Required for size: " + condData,
                                status: false
                            }
                        }


                    }


                } else {
                    return {
                        alert: "indent Quantity Require ",
                        status: false
                    }
                }


            } else if (!stoneQuality) {

                let dataRes = {
                    status: true,
                    alert: "sucess",
                    data: input
                };

                return dataRes;


            } else if ((digit === "C" || digit === "F" || digit === "Y" || digit === "B") && !stoneQualityCheck(feedShowState)) {



                if (sizeQuantity.length > 0 && !stoneQualityCheck(feedShowState)) {



                    for (const element of sizeQuantity) {
                        let condData = (element.size && element.quantity) ? console.log("fine") : element.size;

                        if (condData) {
                            return {
                                alert: "indent Quantity Required for size: " + condData,
                                status: false
                            }
                        }


                    }


                } else {
                    return {
                        alert: "indent Quantity Require ",
                        status: false
                    }
                }





            }




        } else if (digit === "E" || digit === "N" || digit === "P" || digit === "2" ||
            digit === "3" || digit === "0" || digit === "1" || digit === "4" || digit === "5" || digit === "6" || digit === "7") {

            let tegQuantity, TypeSet2, Quantity, stoneQuality;

            tegQuantity = allDataFromValidation.tegQuantityRes;
            TypeSet2 = allDataFromValidation.typeSet2Res;
            Quantity = allDataFromValidation.quantityRes;
            stoneQuality = allDataFromValidation.stoneQualityRes;

            if (digit === "0" || digit === "1" || digit === "2" || digit === "3" || digit === "4" || digit === "5" || digit === "6" || digit === "7" ||
                digit === "P" || digit === "E" || digit === "N") {

                //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DTAA IN DROPDOWN 

                // (tegOfItemOption) ? tegQuantity = true : Quantity = true;

                if (tegQuantity.length > 0) {


                    for (const element of tegQuantity) {
                        let condData = (element.tag && element.quantity) ? console.log("fine") : element.tag;

                        if (condData) {
                            return {
                                alert: "indent Quantity Required for teg: " + condData,
                                status: false
                            }
                        }
                    }



                } else if (!Quantity) {
                    return {
                        alert: "indent Quantity Required  ",
                        status: false
                    }
                }
                if (!stoneQuality) {


                    let dataRes = {
                        status: true,
                        alert: "sucess",
                        data: input
                    };


                    return dataRes;
                    // {
                    //     alert: "indent Stone Quality Required  ",
                    //     status: false
                    // }
                }


            }


            if ((digit === "N" || digit === "E" || digit === "2") && !stoneQualityCheck(feedShowState)) {
                if (!TypeSet2) {
                    return {
                        alert: "indent TypeSet2 Required  ",
                        status: false
                    }
                }
            }


        } else {

            let findings, stoneQuality, Quantity;
            findings = allDataFromValidation.findingsRes;
            stoneQuality = allDataFromValidation.stoneQualityRes;
            Quantity = allDataFromValidation.quantityRes;

            if (digit === "S" || digit === "D" || digit === "J") {
                if (!findings) {
                    return {
                        alert: "indent Findings Required  ",
                        status: false
                    }
                }
            }
            if (!Quantity) {
                return {
                    alert: "indent Quantity Required  ",
                    status: false
                }
            }
            if (!stoneQuality) {

                let dataRes = {
                    status: true,
                    alert: "sucess",
                    data: input
                };

                return dataRes;
                // {
                //     alert: "indent Stone Quality Required  ",
                //     status: false
                // }
            }



        }

        return {
            alert: "sucess  ",
            status: true
        }

    }





    return (
        <>
            <CssBaseline />
            <Container maxWidth="xl" className={classes.root}>

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
                <Grid container className={classes.main}>
                    <Grid item xs={12}>
                        <UpperHeader
                            itemCode={feedShowState.itemCode}
                            storeCode={feedShowState.strCode}
                        />
                        <Loading
                            flag={loading} />

                        {(resetDrop) ?
                            <LowerHeader
                                onBar={onBarClick}
                                onSear={onSearchClick}
                                navBarList={navBarList}
                                statusData={statusData}
                            /> : "Loading...!"}
                    </Grid>

                    <Grid item xs={12} sm={5} style={{ paddingTop: "0.4%" }}>
                        <Paper className={classes.heightOuter}>
                            <div className={classes.imgShow} >

                                {feedShowState.itemCode ?
                                    <ImgShow
                                        itemCode={feedShowState.itemCode}
                                        imgLink="https://tanishqdigitalnpim.titan.in/NpimImages/"
                                        videoLink={feedShowState.videoLink}
                                    />
                                    : null
                                }

                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={7} style={{ paddingTop: "0.4%" }} >
                        <Paper className={classes.heightOuter} >
                            <div className={classes.productInfo}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12}>
                                        <Typography className={classes.headingColor} align="center">{feedShowState.itemCode}</Typography>

                                    </Grid>

                                    <Grid item xs={12} sm={6} style={{ borderStyle: "solid", borderColor: "#f5f5f0", minHeight: "51vh" }}>
                                        {/* <Paper className={classes.heightCss}> */}


                                        <Typography className={classes.haddingCss} align="center">Product Specification</Typography>
                                        {feedShowState.adVariant ?
                                            // <Skeleton variant="text"  >AD-Variant</Skeleton>

                                            <BlinkingComponent
                                                color="red"
                                                text="AD-Variant"
                                                fontSize={15}
                                            /> : null
                                        }
                                        <ProductDetailsTabular
                                            information={feedShowState}
                                        />
                                        {/* </Paper> */}
                                    </Grid>

                                    <Grid item xs={12} sm={6} style={{ borderStyle: "solid", borderColor: "#f5f5f0" }} >

                                        {/* <Paper className={classes.heightCss}> */}

                                        <div>
                                            <Typography className={classes.haddingCss} align="center">Indent Details</Typography>

                                            {feedShowState.btqCount ?
                                                <BlinkingComponent
                                                    color="red"
                                                    text={` ${feedShowState.btqCount}  Btqs Indented `}
                                                    fontSize={15}
                                                /> : null
                                            }
                                            <br />

                                            {/* <Container> */}
                                            <Grid container spacing={1}>
                                                {(digit) ?

                                                    < DisplayValidationComponent
                                                        digit={feedShowState.itemCode[6]}
                                                        // digit="4"
                                                        cond={stoneQualityCheck(feedShowState)}
                                                        // cond={false}
                                                        // sizeOptionList={sizeOption}
                                                        itemCode={feedShowState.itemCode}
                                                        stoneOptionList={stoneOptionsData(feedShowState)}
                                                        setType2option={["Need-Chain", "Need-Dori"]}
                                                        findingsOption={["Bombay", "South"]}
                                                        setSelectOptions={setSelectState}
                                                        tegOfItemOption={createTegOfItems(feedShowState)}
                                                        allDataChangeHandler={allDataChangeHandler}
                                                        sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                                                        sizeQuantityResHandler={sizeQuantityResHandler}
                                                        stoneQualityResHandler={stoneQualityResHandler}
                                                        tegQuantityResHandler={tegQuantityResHandler}
                                                        typeSet2ResHandler={typeSet2ResHandler}
                                                        quantityResHandler={quantityResHandler}
                                                        findingsResHandler={findingsResHandler}
                                                        tegSelectionResHandler={tegSelectionResHandler}
                                                        setSelectResHandler={tegQuantityResHandler}

                                                    />

                                                    : null}
                                            </Grid>




                                            {SmallDataTable(feedShowState)}


                                            {/* </Container> */}

                                        </div>
                                        {/* </Paper> */}
                                    </Grid>
                                    <Grid item xs={12} sm={12} style={{ minHeight: "10.5vh" }} >
                                        {(stoneQualityCheck(feedShowState)) ?
                                            // <Container>
                                            <StaticTabularInformation
                                                si2Gh={feedShowState.si2Gh}
                                                vsGh={feedShowState.vsGh}
                                                vvs1={feedShowState.vvs1}
                                                i2Gh={feedShowState.i2Gh}
                                                si2Ij={feedShowState.si2Ij}

                                            />
                                            // </Container>
                                            : ""
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={12} className={classes.buttonSpacing}>
                                        {/* <Paper> */}
                                        <Container >
                                            <Grid container spacing={4}>
                                                <Grid item xs={12} sm={4} >
                                                    <Button className={classes.btn} onClick={() => { onClickNextPreBtnHandler("pre") }} startIcon={<ArrowBackIosIcon />} variant="outlined" fullWidth >
                                                        Previous
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sm={4} >
                                                    <Button className={classes.btnSub} onClick={() => {
                                                        setTimeout(() => {
                                                            onClickSubmitBtnHandler();
                                                        }, 1000);
                                                    }} variant="contained" fullWidth>
                                                        Submit
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sm={4} >
                                                    <Button className={classes.btn} onClick={() => { onClickNextPreBtnHandler("next") }} endIcon={<ArrowForwardIosIcon />} variant="outlined" fullWidth>
                                                        Next
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                        {/* </Paper> */}
                                    </Grid>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        </>
    );
};
export default IndentL3;









