import './components.css';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import TasksContext from "../tasks-context";
import CloseIcon from '@mui/icons-material/Close';

function TasksList({firstPort, secondPort}) {
    const [open, setOpen] = useState(false);
    const { tasks, setTasks } = useContext(TasksContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const removeTask = (task_to_remove) => {
        setTasks((current) =>
            current.filter((task) => task !== task_to_remove)
        );
    };

    const simulate = () => {
        let objImage = document.getElementById("image");
        let sleep = 450;
        console.log(objImage)
        tasks.forEach(task => {
            setTimeout(()=> {
                    if(task.movement === "move") {
                    let distance = task.distance

                    if(task.direction === 'forward')
                        distance *= -1

                    translate(distance)
                }
                    else {
                    let angle = task.distance
                    if(task.direction === "left")
                        angle *= -1

                    rotate(angle)
                }
            }, sleep)
            sleep += 1000
        })
    }

    function rotate(angle) {
        const regex = /rotate\(-?[0-9]*deg\)/g;

        document.getElementById('image').style.transition='1s';
        if (document.getElementById('image').style.transform.match(regex)) {
            console.log("regex passed")

            document.getElementById('image').style.transform.replace(regex, '');
        }
        document.getElementById('image').style.transform += `rotate(${angle}deg) `;
    }

    function translate(distance) {
        const regex = /translateY\(-?[0-9]*px\)/g;

        document.getElementById('image').style.transition='1s';
        if (document.getElementById('image').style.transform.match(regex)) {
            console.log("regex passed")
            document.getElementById('image').style.transform.replace(regex, '');
        }
        document.getElementById('image').style.transform += `translateY(${distance}px) `;
    }

    return (
        <div style={{height: '100%'}}>
            <div className={"tasks-list"}>
                {tasks.map((task, idx) =>
                    <div key={idx} style={{textAlign: "left"}}>
                        <div style={{marginRight: "2%", paddingBottom: "5%"}}>
                            <IconButton style={{float: 'right'}} onClick={() => removeTask(task)}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        <p style={{fontSize: "small", marginLeft: "2%"}}>
                            {task.movement} {task.distance} {task.direction}
                        </p>
                        <hr/>
                    </div>)}

            </div>
            <div style={{margin: '2%', marginLeft: '3%'}}>
                <Button variant="outlined" size="medium" color="secondary" style={{float: 'left', borderRadius: 50}} onClick={simulate}>
                    Simulate
                </Button>
                <Button variant="outlined" size="medium" color="secondary" style={{float: 'right', borderRadius: 50}} onClick={handleClickOpen}>
                    Generate code
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{fontFamily: "Comic Sans MS"}}>Robot settings</DialogTitle>
                <DialogContent>
                    {firstPort} {secondPort}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>

    );
}

export default TasksList;
