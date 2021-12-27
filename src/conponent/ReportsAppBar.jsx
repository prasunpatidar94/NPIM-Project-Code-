import { AppBar, Toolbar, IconButton, FormGroup, FormControlLabel, Switch, makeStyles } from "@material-ui/core";
import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import DropdownField from "./DropdownField";




const useStyles = makeStyles({

    reportDrop: {
        width: "50%",
        marginTop: "1%",
    },
    appBar: {
        flexGrow: 1,
        backgroundColor: "#f2feff",
    },
    menuButton: {
        marginRight: 2,
        flexGrow: 1,

    },
    title: {
        flexGrow: 1,
    },

    hidden: {
        display: "none"
    },
    show: {
        display: "block"
    },

});



function ReportsAppBar(props) {
    const classes = useStyles();
    const { barHandler, reporOptions, reportLable, reportDropHandler, showInformationHandler, showinfo, switchEnable } = props;

    return (
        <>
            <div className={classes.appBar}>
                <AppBar position="static" color="#f2feff">
                    <Toolbar>
                        <div className={classes.menuButton}>
                            <IconButton
                                onClick={barHandler}
                                edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                        </div>

                        {reporOptions ?
                            <div className={classes.title}>
                                <div className={classes.reportDrop}>
                                    <DropdownField name="Report"
                                        // value={selectReport}
                                        lableName="Report"
                                        bigSmall={false}
                                        dropList={reporOptions}
                                        myChangeHandler={(event) => { reportDropHandler(event.target.value) }}
                                    />
                                </div>
                            </div>

                            :
                            null
                        }

                        {(showInformationHandler) ?
                            <FormGroup row className={classes.feedbackSwitch}>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={showinfo}
                                            onChange={showInformationHandler}
                                            name="feedbackSwitch"
                                            color="secondary"
                                            disabled={switchEnable}
                                        />
                                    }
                                    label="Product Description"
                                />

                            </FormGroup>
                            : ""}
                    </Toolbar>
                </AppBar>
            </div>

        </>
    )
}


export default ReportsAppBar;