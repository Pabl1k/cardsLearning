import {makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,

        '& .MuiSlider-rail': {
            backgroundColor: "#21268F;",
            opacity: ".5",
            height: "5px",
            borderRadius: "10px",
        },

    }

}));


