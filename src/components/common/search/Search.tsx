import React from "react"
import SearchIcon from '@material-ui/icons/Search';

import {InputBase} from "@material-ui/core";
import {useStyles} from "./SearchStyles";

export const Search = () => {
    const classes = useStyles();

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
                    className={classes.input}
                    inputProps={{'aria-label': 'search'}}
                />
            </div>

        </div>
    )
}

// export default Search