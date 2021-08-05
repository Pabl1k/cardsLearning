import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {fetchPacksStateAfterTabsShowTC, TabsShowPacksStatusType} from "../../../redux/reducers/packsList-reducer"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import {useStyles} from "./TabsStylesShowPacks"
import s from "./TabsShowPacks.module.scss"

type TabsShowPacksPropsType = {
    userId: string
    showPacksStatus: TabsShowPacksStatusType
}

export const TabsShowPacks = React.memo((props: TabsShowPacksPropsType) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const [value, setValue] = useState<TabsShowPacksStatusType>(props.showPacksStatus)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: TabsShowPacksStatusType) => {
        setValue(newValue)
    }

    useEffect(() => {
        if (value === 1) {
            dispatch(fetchPacksStateAfterTabsShowTC(value))
        } else {
            dispatch(fetchPacksStateAfterTabsShowTC(value, props.userId))
        }
    }, [dispatch, value, props.userId])

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
})