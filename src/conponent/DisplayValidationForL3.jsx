import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import HostManager from "../HostManager/HostManager";
import { DropDownMaterialUI, DynamicMultiSelectAndInput, InputFieldMaterialUI, MultiSelectAndInput, MultiselectUomAndSize } from "./ComponentForL3";

export default function DisplayValidationComponent(props) {




    const { digit, cond, itemCode, stoneOptionList, setType2option, findingsOption, tegOfItemOption,
        sizeUomQuantityResHandler, sizeQuantityResHandler, stoneQualityResHandler, tegQuantityResHandler,
        typeSet2ResHandler, quantityResHandler, findingsResHandler, tegSelectionResHandler, setSelectResHandler, setSelectOptions } = props;
    const [SizeState, setSizeState] = useState([]);



    useEffect(() => {

        axios.get(`${HostManager.mainHostL3}/npim/size/dropdown/${itemCode}`)

            .then((response) => {

                if (response.data.code === "1001") {
                    setImmediate(() => { setSizeState([]) });
                    // alert(response.data.value);
                } else {
                    setImmediate(() => { setSizeState(response.data.value) });

                }

                console.log("responce of size ", response.data.value);

            }, (error) => {
                console.log(error);
                alert(error);
                setImmediate(() => { setSizeState([]) });



            });


    }, [])




    if (digit === "B" || digit === "C" || digit === "F" || digit === "R" ||
        digit === "V" || digit === "W" || digit === "Y") {

        let sizeUomQuantity, sizeQuantity;

        if (digit === "V" && !cond) {
            sizeUomQuantity = true;

        } else if ((digit === "V" || digit === "C" || digit === "F" || digit === "Y" || digit === "B") && cond) {
            sizeQuantity = true;
        } else if ((digit === "C" || digit === "F" || digit === "Y" || digit === "B") && !cond) {
            sizeQuantity = true;

        }

        return (
            <>

                {(sizeUomQuantity && SizeState[0]) ?
                    <Grid item xs={12} sm={12}  >
                        <MultiselectUomAndSize

                            lableName="Size/UOM/Quantity"
                            optionsList={SizeState}
                            sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                        // getData={ }

                        //put props
                        />
                    </Grid>
                    : null}

                {(sizeQuantity && SizeState[0]) ?


                    <Grid item xs={12} sm={12} >
                        <MultiSelectAndInput
                            lableName="Size/Quantity"
                            optionsList={SizeState}
                            onChangeHandler={sizeQuantityResHandler}
                        //put props 
                        />

                    </Grid>
                    : null}



                {
                    //  && stoneOptionList[0]
                    (cond) ?
                        <Grid item xs={12} sm={12}   >
                            <DropDownMaterialUI

                                lableName="Stone Quality"
                                onChangeHandler={stoneQualityResHandler}
                                optionsList={stoneOptionList}
                            // optionsList={[1, 2, 3, 4, 5, 6]}

                            // valueData=""

                            />

                        </Grid>
                        : null
                }
            </>
        );


    } else if (digit === "E" || digit === "N" || digit === "P" || digit === "2" ||
        digit === "3" || digit === "0" || digit === "1" || digit === "3" ||
        digit === "4" || digit === "5" || digit === "6" || digit === "7") {

        let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect;

        if (digit === "0" || digit === "1" || digit === "2" ||
            digit === "P" || digit === "E" || digit === "N") {

            //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DTAA IN DROPDOWN 

            (tegOfItemOption) ? tegQuantity = true : Quantity = true;

        }


        if ((digit === "N" || digit === "E" || digit === "2") && !cond) {
            TypeSet2 = true;
        }

        if ((digit === "3" || digit === "4" || digit === "5" || digit === "6" || digit === "7")) {
            tegSelect = true;
            setSelect = true;
            Quantity = false;
            // stoneQuality = false;
        }




        return (
            <>

                {(tegSelect) ?
                    <Grid item xs={12} sm={12}   >
                        <DropDownMaterialUI

                            lableName="Tag Selection"
                            onChangeHandler={tegSelectionResHandler}
                            optionsList={["Separate", "Set"]}
                        // valueData=""

                        />

                    </Grid>
                    : null}
                {(setSelect && setSelectOptions[0]) ?
                    <Grid item xs={12} sm={12}   >
                        <DynamicMultiSelectAndInput
                            lableName="Set Select"
                            optionsList={setSelectOptions}
                            onChangeHandler={setSelectResHandler}
                        //put props 
                        />


                    </Grid>
                    : null}

                {(Quantity) ?
                    <Grid item xs={12} sm={12}  >
                        <InputFieldMaterialUI

                            lableName="Quantity"
                            typeName="number"
                            onChangeHandler={quantityResHandler}
                        // valueName={ }
                        />

                    </Grid>
                    : null}
                {(tegQuantity) ?
                    <Grid item xs={12} sm={12}   >
                        <MultiSelectAndInput
                            lableName="Tags/Quantity"
                            optionsList={tegOfItemOption}
                            onChangeHandler={tegQuantityResHandler}
                        //put props 
                        />

                    </Grid>
                    : null}

                {(TypeSet2) ?
                    <Grid item xs={12} sm={12}   >
                        <DropDownMaterialUI

                            lableName="Type Set-2"
                            onChangeHandler={typeSet2ResHandler}
                            optionsList={setType2option}
                        // valueData=""
                        />

                    </Grid>
                    : null}
                {(cond) ?
                    <Grid item xs={12} sm={12}   >
                        <DropDownMaterialUI

                            lableName="Stone Quality"
                            onChangeHandler={stoneQualityResHandler}
                            optionsList={stoneOptionList}
                        // valueData=""

                        />

                    </Grid>
                    : null}
            </>
        );




    } else {

        let findings, stoneQuality, Quantity;

        if (digit === "S" || digit === "D" || digit === "J") {
            findings = true;
        }
        if (cond) {
            stoneQuality = true;
        }

        Quantity = true;
        return (<>



            {(Quantity) ?
                <Grid item xs={12} sm={12}  >
                    <InputFieldMaterialUI

                        lableName="Quantity"
                        typeName="number"
                        onChangeHandler={quantityResHandler}
                    // valueName={ }
                    />

                </Grid>


                : null}


            {(findings) ?
                <Grid item xs={12} sm={12}   >
                    <DropDownMaterialUI

                        lableName="Findings"
                        onChangeHandler={findingsResHandler}
                        optionsList={findingsOption}
                    // valueData=""
                    />

                </Grid>
                : null}

            {(cond) ?
                <Grid item xs={12} sm={12}   >
                    <DropDownMaterialUI

                        lableName="Stone Quality"
                        onChangeHandler={stoneQualityResHandler}
                        optionsList={stoneOptionList}
                    // valueData=""

                    />

                </Grid>
                : null}





        </>);
    }




}
