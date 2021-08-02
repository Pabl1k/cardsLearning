import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import {useStyles} from "./TabsStylesShowPacks"
import s from "./TabsShowPacks.module.scss"

export const TabsShowPacks = () => {

    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    return (
        <div className={s.tabsShowPacks}>
            <h2 className={s.title}>Show packs cards</h2>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="My" className={s.tabMy}/>
                        <Tab label="All" className={s.tabAll}/>
                    </Tabs>
                </AppBar>
            </div>
        </div>
    )
}