import React from "react"

import s from "./PacksList.module.scss"
import {TabsShowPacks} from "../common/tabsShowPacks/TabsShowPacks";
import {DoubleRange} from "../common/doubleRange/DoubleRange";
import {TableTitle} from "../common/tableTitle/TableTitle";
import {Search} from "../common/search/Search";
import {Button} from "../common/button/Button";
import {TableMUI} from "../common/tableMUI/TableMUI";
import {ButtonSmall} from "../common/buttonSmall/ButtonSmall";
import {PaginationTable} from "../common/paginationTable/PaginationTable";


type NataPacksListPropsType = {}

export const NataPacksList = React.memo((props: NataPacksListPropsType) => {


    return (

        <div className={s.packsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.aside}>
                        <TabsShowPacks/>
                        <DoubleRange minValue={1} maxValue={200}/>

                        {/*убрать!!! (для отрисовки использовала)*/}
                        <ButtonSmall text={"delete"} style={{backgroundColor: "#F1453D", color: "#ffffff"}}/>
                        <br/>
                        <ButtonSmall text={"edit"} style={{backgroundColor: "#D7D8EF", color: "#21268F"}}/>
                        <br/>
                        <ButtonSmall text={"learn"} style={{backgroundColor: "#D7D8EF", color: "#21268F"}}/>

                    </div>

                    <div className={s.content}>
                        <TableTitle title={"Packs list"}/>
                        <div className={s.topWrap}>
                            <Search/>
                            <Button className={s.button}>Add new pack</Button>
                        </div>

                        <TableMUI/>
                        <PaginationTable/>


                    </div>


                </div>
            </div>
        </div>

    )
})