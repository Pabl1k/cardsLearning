import React from "react"
import {useStyles} from "./TabsStylesShowPacks"
import s from "./TabsShowPacks.module.scss"

type TabsShowPacksPropsType = {
    userId: string
    showPacksStatus: boolean
    changeShowMyPacks: (isShowMyPacks: boolean, userId: string) => void
}

export const TabsShowPacks = React.memo((props: TabsShowPacksPropsType) => {

    const classes = useStyles()

    const onAllButtonClick = () => {
        props.changeShowMyPacks(false, "")
    }

    const onMyButtonClick = () => {
        props.changeShowMyPacks(true, props.userId)
    }

    return (
        <div className={s.tabsShowPacks}>
            <h2 className={s.title}>Show packs cards:</h2>
            <div className={classes.root}>
                {!props.showPacksStatus
                    ? <div className={s.tabItemsContainer}>
                        <button onClick={onAllButtonClick} className={`${s.tabItem} ${s.activeTabItem}`}>All</button>
                        <button onClick={onMyButtonClick} className={s.tabItem}>My</button>
                    </div>
                    : <div className={s.tabItemsContainer}>
                        <button onClick={onAllButtonClick} className={s.tabItem}>All</button>
                        <button onClick={onMyButtonClick} className={`${s.tabItem} ${s.activeTabItem}`}>My</button>
                    </div>
                }
            </div>
        </div>
    )
})