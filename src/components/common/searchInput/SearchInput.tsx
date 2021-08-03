import React from "react"
import SearchIcon from "@material-ui/icons/Search"
import {InputBase} from "@material-ui/core"
import {useStyles} from "./SearchInputStyles"
import s from "./SearchInput.module.scss"

type SearchInputPropsType = {}

export const SearchInput = React.memo((props: SearchInputPropsType) => {

    const classes = useStyles()

    return (
        <div className={classes.grow}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        // root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{'aria-label': "search"}}
                    className={classes.input}
                />
            </div>
        </div>
    )
})