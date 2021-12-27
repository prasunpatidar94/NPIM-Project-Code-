import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Multiselect } from "multiselect-react-dropdown";
import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles({



    optionContainer: {
        textAlign: "left"
    },
    option: { // To change css for dropdown options
        color: "red"
    },

});

const MuliSelectDropdownField = (props) => {

    const classes = useStyles();
    const multiselectRef = useRef();


    // useEffect(() => {

    //     multiselectRef.current.resetSelectedValues();
    // }, [props]);



    const resetSelectField = () => {
        multiselectRef.current.resetSelectedValues();
    };


    // const [multiSelectDrop, setMultiSelectDrop] = useState([]);
    const data = [
        {
            valueData: "Not Relevant To Market", lableValue: "Not Relevant To Market"
        },
        {
            valueData: "Price is High", lableValue: "Price is High"
        },
        {
            valueData: "Wearibility Issue", lableValue: "Wearibility Issue"
        },
        {
            valueData: "Similar design exists", lableValue: "Similar design exists"
        },
        {
            valueData: "Design Not Applicable", lableValue: "Design Not Applicable"
        },


    ];

    const onInternalSelectChange = (selectedList, selectedItem) => {



        let selectedData = selectedList.map(
            (data) => {

                return data.valueData;



            });



        return props.onMultiSelect(selectedData);


    };

    const onInternalRemoveChange = (selectedList, removedItem) => {

        let selectedData = selectedList.map(
            (data) => {

                return data.valueData;



            });



        return props.onMultiSelect(selectedData);

    };

    const cssdata = {

        searchBox: {
            // border: "none",
            // fontSize: "10px",
            // minHeight: "50px",
            // width: "50%"
        },

    };

    return (<>
        <div >

            <label >Choose reasons for No</label>

            <div className="drop_multi">
                <Multiselect
                    options={data}
                    displayValue="lableValue"
                    onSelect={onInternalSelectChange}
                    onRemove={onInternalRemoveChange}
                    showCheckbox={true}
                    // selectedValues={[]}
                    closeOnSelect={false}
                    selectionLimit={3}
                    placeholder="Choose reasons for no"
                    disablePreSelectedValues={true}
               
                />
            </div>
        </div>

    </>)
}; export default MuliSelectDropdownField;