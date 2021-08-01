import React from "react"
import s from "./HeaderMenu.module.scss"
import {MainTitle} from "../mainTitle/MainTitle";
import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, Theme} from '@material-ui/core/styles';

// import avatar from "../../../assets/images/avatar.png"

// type ProfileAvatarPropsType = {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,

        '& .MuiAppBar-colorPrimary': {
            backgroundColor: "#EBE0E9",
            color: "#2D2E46"
        },

        '& .MuiPaper-elevation4': {
            boxShadow: "none",
        },

        '& .PrivateTabIndicator-colorSecondary-4': {
            backgroundColor: "#21268F",
            width: "175px",
            height: "3px",
        },

        '& .MuiTab-textColorInherit.Mui-selected': {
            backgroundColor: "#DCCCDB",
        },

        '& .MuiButtonBase-root': {
            height: "60px",
            width: "175px",
        },

        '& .MuiTab-wrapper': {
            paddingLeft: "40px",
            textTransform: "none",
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1.05",
            letterSpacing: ".4px",
        },

    }


}));

export const HeaderMenu = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div className={s.headerMenu}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.titleWrap}>
                        <MainTitle/>
                    </div>

                    <div className={classes.root}>
                        <AppBar position="static">
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Packs list" className={s.tabPack}/>
                                <Tab label="Profile" className={s.tabProfile}/>
                            </Tabs>
                        </AppBar>
                    </div>
                </div>

            </div>
        </div>
    )
}