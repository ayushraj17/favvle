import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
/* import "../../css/components/GetRanks.css"; */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper3: {
    height: 160,
    width: 120,
    cursor:"pointer",
    borderRadius:5,
    overflow:"hidden",
    [theme.breakpoints.down('xs')]: {
      height: 110,
      width: 90, 
    },

  },
  paper4: {
    height: 160,
    width: 120,
    cursor:"pointer",
    overflow:"hidden",
    [theme.breakpoints.down('xs')]: {
      height: 90,
      width: 65, 
    },
  },
  paper5: {
    height: 160,
    width: 120,
    cursor:"pointer",
    overflow:"hidden",
    [theme.breakpoints.down('xs')]: {
      height: 80,
      width: 60,
      marginLeft:1,
    },
    marginLeft:5,
  },
  text:{
    background:"#79A9A6",
    display:"flex",
    justifyContent:"center",
    textAlign:"center",
    padding:3,
    fontSize:11,
    fontWeight:"bold",
    borderRadius: 0,
    height:"19%",
    flexWrap:"no-wrap",
    overflow:"hidden",
    textOverflow:"elipses",
    [theme.breakpoints.down('xs')]: {
      paddingTop:3,
      fontSize:6
    }
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function PostRanks({Ranking,textcolor,nametoggle,ranktoggle,columns,backgroundColor,handleSorting}) {
  const classes = useStyles();
  return (
    
        <Grid className='container-getRanks' container justify="" spacing={1} style={{marginTop:20, marginBottom:20}}>
        {Ranking?
         Ranking.map((value, i) => (
            <Grid className="card-customization" key={i} item  md={columns==5?2.5:(columns==4?3:4)} xs={columns==5?2.5:(columns==4?3:4)} style={{display:"flex",flexDirection:"column",alignItems:"center", cursor:"auto"}} id={i} >
            <div className="paper-outer">
              <Paper elevation={9} className={columns===5?classes.paper5:(columns===4?classes.paper4:classes.paper3)} style={{cursor:"auto"}}>
              <div style={{height:nametoggle?"82%":"100%"}}>
                <img class="cards-img" src={value.Poster} style={{width:"100%", height:'101%',objectFit:"cover"}}></img>
              </div>
              <div className='card-bgc'>
                {nametoggle&&<div style={{color:textcolor===true||textcolor==='true'?"black":"white",background:backgroundColor}} className={classes.text}>{value.Title.length>20?value.Title.substring(0, 30)+"...":value.Title}</div>}
              </div> 
              </Paper>
            </div>
            <div className="txt-identifier2">
              {ranktoggle&&<p style={{color:textcolor===true||textcolor==='true'?"black":"white",marginTop:10,background:backgroundColor}}>{i+1}</p>}
            </div>
            </Grid>
          )):<></>   
        }
        </Grid>
  );
}
