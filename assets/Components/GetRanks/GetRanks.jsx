import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';/* 
import "../../css/components/GetRanks.css"; */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper3: {
    height: 160,
    width: 120,
    cursor:"grab",
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
    cursor:"grab",
    overflow:"hidden",
    [theme.breakpoints.down('xs')]: {
      height: 90,
      width: 65, 
    },
    marginLeft:1,
  },
  paper5: {
    height: 160,
    width: 120,
    cursor:"grab",
    overflow:"hidden",
    [theme.breakpoints.down('xs')]: {
      height: 80,
      width: 60,
      marginLeft:1,
    },
    marginLeft:1,
  },
  text:{
    background:"#79A9A6",
    display:"flex",
    justifyContent:"center",
    textAlign:"center",
    padding:3,
    fontSize:11,
    fontWeight:'bold',
    borderRadius: 0,
    height:"19%",
    [theme.breakpoints.down('xs')]: {
      paddingTop:3,
      fontSize:6
    }
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function GetRanks({Ranking,textcolor,nametoggle,ranktoggle,columns,backgroundColor,handleSorting}) {
  const classes = useStyles();
  return (
    
        <Grid className='container-getRanks' container justify="" spacing={1} style={{marginTop:20, marginBottom:20}}>
        {Ranking?
         Ranking.map((value, i) => (
            <Grid className="card-customization" key={i} item  md={columns==5?2.5:(columns==4?3:4)} xs={columns==5?2.5:(columns==4?3:4)} style={{display:"flex",flexDirection:"column",alignItems:"center"}} id={i} onDragStart={(e) => {
              e.dataTransfer.setData('Text/txt', i);
            }} onDrop={(e) => {
              e.preventDefault()
              let pElement;
              
              if(e.target.classList.contains('cards-img') || e.target.classList.contains('card-body')) {
                pElement = e.target.closest('.card-customization');
              }

              var data2 = e.dataTransfer.getData("Text/txt");
              let id1 = parseInt(data2);
              let id2 = parseInt(pElement.id);
              handleSorting(id1, id2)
            }} onDragOver={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}>
            <div className="paper-outer">
              <Paper elevation={9} className={columns===5?classes.paper5:(columns===4?classes.paper4:classes.paper3)} >
              <div style={{height:nametoggle?"82%":"100%"}}>
                <img class="cards-img" src={value.Poster} style={{width:"100%", height:'101%',objectFit:"top"}}></img>
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
