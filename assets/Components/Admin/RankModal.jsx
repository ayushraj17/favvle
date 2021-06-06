import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import GetRanks from "../GetRanks/GetRanks";
import axios from "axios";
import { BASE_URL } from "../../../Constants";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 850,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [Ranking,setRanking] = React.useState("");
  const [category, setcategory] = React.useState("");
  const [name, setname] = React.useState("");
  const [backgroundColor, setbackgroundColor] = React.useState("");
  const [textcolor, settextcolor] = React.useState("");
  const [nametoggle, setnametoggle] = React.useState("");
  const [ranktoggle, setranktoggle] = React.useState("");
  const [columns, setcolumns] = React.useState("");

  const handleOpen = () => {
      console.log(props.id)
        axios
          .post(BASE_URL + "/users/getrankingbyid", {
            id: props.id, 
          })
          .then((res) => {
            console.log(res)
           
            setRanking(res.data.rank[0].ranking)
            setcategory(res.data.rank[0].category)
            setname(res.data.rank[0].category)
            setbackgroundColor(res.data.rank[0].backgroundcolor)
            settextcolor(res.data.rank[0].textcolor)
            setnametoggle(res.data.rank[0].nametoggle)
            setranktoggle(res.data.rank[0].ranktoggle)
            setcolumns(res.data.rank[0].columns)
            setOpen(true);
          })
          .catch((e) => {
            console.log(e);
          });
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="btn bg-primary" onClick={handleOpen}>
        Open Rank
      </Button>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={{background:backgroundColor}} className={classes.paper}>
          <GetRanks
            Ranking={Ranking}
            category={category}
            name={name}
            backgroundColor={backgroundColor}
            textcolor={textcolor}
            nametoggle={nametoggle}
            ranktoggle={ranktoggle}
            columns={columns} 
          />
        </div>
      </Modal>
    </div>
  );
}
