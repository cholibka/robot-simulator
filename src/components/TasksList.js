import './components.css';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import TasksContext from "../tasks-context";
import CloseIcon from '@mui/icons-material/Close';
import raw from '../template.txt';

function TasksList({firstPort, secondPort, circumference, axisWidth, power}) {
    const [open, setOpen] = useState(false);
    const { tasks, setTasks } = useContext(TasksContext);
    const [template, setTemplate] = useState('');


    const handleClickOpen = () => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setOpen(true);
                let regex = "[START]"
                let regex_circumference = "{circumference}"
                let regex_axisWidth = "{axis_width}"
                let regex_power = "{power}"
                let port_left = "{port_left}"
                let port_right = "{port_right}"

                text = text.replace(regex_circumference, circumference)
                    .replace(regex_axisWidth, axisWidth)
                    .replace(regex_power, power)
                    .replaceAll(port_left, firstPort)
                    .replaceAll(port_right, secondPort)

                if (text.match(regex)) {
                    let code = "";
                    tasks.forEach(task => {
                        if(task.movement === "move") {
                            let distance = task.distance
                            if(task.direction === 'backward')
                                distance *= -1
                            code += `\tGoStraight(${distance})\n`
                        }
                        else {
                            let angle = task.distance
                            if(task.direction === "left")
                                code += `\tRotateRobotLeft(${angle})\n`
                            else
                                code += `\tRotateRobotRight(${angle})\n`
                            }
                        })
                    text = text.replace(regex, code);
                }
                setTemplate(text)
            });
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
            <Dialog open={open} onClose={handleClose} maxWidth={"xl"}>
                <DialogTitle style={{fontFamily: "Comic Sans MS"}}>Generated code</DialogTitle>
                <DialogContent>
                    <p style={{fontFamily: "consolas", whiteSpace: "pre"}}>
                        {template}

                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>

    );
}

export default TasksList;
