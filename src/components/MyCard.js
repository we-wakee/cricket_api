// import React, { useState } from "react";

// import { makeStyles } from "@material-ui/core/styles";

// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Grid,
//   Typography,
// } from "@material-ui/core";
// import { getMatchDetail } from "../api/api";

// const MyCard = ({ match }) => {
//   const [detail, setDetail] = useState({});
//   const [open, setOpen] = useState(false);
//   const getMatchCard = () => (
//     <div>
//       <Card
//         style={{
//           background: match.matchStarted ? "#e2e2e2" : "",
//           marginTop: 15,
//         }}
//       >
//         <CardContent>
//           <Grid container justify="center" alignItems="center" spacing={4}>
//             <Grid item>
//               <Typography variant="h5">{match.teams[0]}</Typography>
//             </Grid>
//             <Grid item>
//               <img
//                 style={{ width: 85 }}
//                 src={require("../img/vs.png")}
//                 alt=""
//               />
//             </Grid>
//             <Grid item>
//               <Typography variant="h5">{match.teams[1]}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>

//         <CardActions>
//           <Grid container justify="center">
//             <Button
//               onClick={() => {
//                 showDetailBtnClicked(match.id);
//               }}
//               variant="outlined"
//               color="secondary"
//             >
//               Show Detail
//             </Button>
//             <Button
//               style={{ marginLeft: 5 }}
//               variant="outlined"
//               color="primary"
//             >
//               Starting time {new Date(match.dateTimeGMT).toLocaleString()}
//             </Button>
//           </Grid>
//         </CardActions>
//       </Card>
//     </div>
//   );

//   const showDetailBtnClicked = (id) => {
//     getMatchDetail(id)
//       .then((data) => {
//         console.log(data);
//         setDetail(data.data);
//         handleClickOpen();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       {match.matchType === "t20" ? getMatchCard() : ""}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Match Detail..."}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             <Typography>{detail.status}</Typography>
//             <Typography>
//               Match
//               <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
//                 {detail.matchStarted ? "Started" : "Still not started"}
//               </span>
//             </Typography>
//             <Typography>
//               Score
//               <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
//                 {" "}
//                 {detail.score}
//               </span>
//             </Typography>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary" autoFocus>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default MyCard;



import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { getMatchDetail } from "../api/api";

const useStyles = makeStyles({
  card: {
    marginTop: 15,
    background: (match) => (match.matchStarted ? "#e2e2e2" : ""),
  },
  vsImage: {
    width: 85,
  },
  boldItalic: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

const MyCard = ({ match }) => {
  const classes = useStyles(match);
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);

  const showDetailBtnClicked = (id) => {
    getMatchDetail(id)
      .then((data) => {
        console.log(data);
        setDetail(data.data);
        handleClickOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMatchCard = () => (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item>
              <Typography variant="h5">{match.teams[0]}</Typography>
            </Grid>
            <Grid item>
              <img
                className={classes.vsImage}
                src={require("../img/vs.png")}
                alt=""
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">{match.teams[1]}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify="center">
            <Button
              onClick={() => {
                showDetailBtnClicked(match.id);
              }}
              variant="outlined"
              color="secondary"
            >
              Show Detail
            </Button>
            <Button style={{ marginLeft: 5 }} variant="outlined" color="primary">
              Starting time {new Date(match.dateTimeGMT).toLocaleString()}
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );

  return (
    <>
      {match.matchType === "t20" && getMatchCard()}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Match Detail..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>{detail.status}</Typography>
            <Typography>
              Match{" "}
              <span className={classes.boldItalic}>
                {detail.matchStarted ? "Started" : "Still not started"}
              </span>
            </Typography>
            <Typography>
              Score{" "}
              <span className={classes.boldItalic}>
                {typeof detail.score === 'object' ? JSON.stringify(detail.score) : detail.score}
              </span>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus> 
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyCard;
