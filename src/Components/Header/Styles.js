import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    title: {
        fontWeight: 600,
        fontSize: "1.3rem",
        [theme.breakpoints.down("sm")]: {
            display: "block",
        },
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: "100%",
        [theme.breakpoints.up("sm")]: { width: "auto", marginLeft : theme.spacing(3), }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.common.white,
        transition: theme.transitions.create("color"),
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        width: "100%",
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

