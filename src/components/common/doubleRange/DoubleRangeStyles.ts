import {makeStyles, Theme} from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,

        '& .MuiSlider-rail': {
            backgroundColor: "#21268F",
            opacity: ".5",
            height: "5px",
            borderRadius: "10px",
        },

        '& .MuiSlider-track': {
            backgroundColor: "#21268F",
            height: "5px",
            borderRadius: "10px",
        },

        '& .MuiSlider-thumb ': {
            backgroundColor: "#ffffff",
            height: "16px",
            width: "16px",
            border: "4px solid #21268F",
        },

        // '& .PrivateValueLabel-offset-10': {
        //     backgroundColor: "#21268F",
        //     height: "24px",
        //     width: "32px",
        //     borderRadius: 3px,
        // },
    }
}))


