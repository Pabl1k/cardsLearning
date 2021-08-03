import React from "react"


// import {useStyles} from "./PaginationTable";
import {Pagination, PaginationItem} from "@material-ui/lab";
import {Link, MemoryRouter, Route} from "react-router-dom";
// import { useStyles } from "./PaginationTable";

export const PaginationTable = () => {
    // const classes = useStyles();
    const query = new URLSearchParams;
    const page = parseInt(query.get('page') || '1', 10);

    return (
        <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
            <Route>
                {({ location }) => {
                    const query = new URLSearchParams(location.search);
                    const page = parseInt(query.get('page') || '1', 10);
                    return (
                        <Pagination
                            page={page}
                            count={10}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
                                    {...item}
                                />
                            )}
                        />
                    );
                }}
            </Route>
        </MemoryRouter>
    )
}

