import React from "react"
import s from "./HeaderMenu.module.scss"
import {MainTitle} from "../mainTitle/MainTitle";
import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useStyles} from "./TabsStyles";

// import avatar from "../../../assets/images/avatar.png"

// type ProfileAvatarPropsType = {}

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