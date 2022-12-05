import './App.css';
import Canvas from "./components/Canvas";
import TasksList from "./components/TasksList";
import Tasks from "./components/Tasks";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import {useState} from "react";
import TasksContext from "./tasks-context";
import * as React from "react";
import {SelectChangeEvent} from "@mui/material/Select";

function App() {
    const [tasks, setTasks] = useState([]);
    const value = { tasks, setTasks };
    const [open, setOpen] = useState(false);
    const [firstPort, setFirstPort] = React.useState('A');
    const [secondPort, setSecondPort] = React.useState('C');
    const [power, setPower] = React.useState(60);
    const [circumference, setCircumference] = React.useState(17.25);
    const [axisWidth, setAxisWidth] = React.useState(20);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeFirstPort = (event: SelectChangeEvent) => {
        let port = event.target.value
        setFirstPort(setPorts(port,"A", 0));
    };

    const handleChangeSecondPort = (event: SelectChangeEvent) => {
        let port = event.target.value
        setSecondPort(setPorts(port, "C", 1));
    };

    const setPorts = (port, default_port, port_number) => {
        const ports = ["A", "B", "C", "D"]
        if(port.length > 1)
        {
            port = port[0]
        }
        if(port.length === 1) {
            if (!ports.includes(port))
            {
                console.log(port)
                port = default_port
            }
        }

        const pins = [secondPort, firstPort]

        console.log(pins[port_number])
        while(port === pins[port_number])
            port = ports[Math.floor(Math.random() * ports.length)];

        return port
    }

    const handleChangePower = (event: SelectChangeEvent) => {
        if(event.target.value > 100)
            setPower(100)
        else if(event.target.value < 0)
            setPower(0)
        else setPower(event.target.value);
    };

    const handleChangeCircumference = (event: SelectChangeEvent) => {
        if(event.target.value > 100)
            setCircumference(100)
        else if(event.target.value < 0)
            setCircumference(0)
        else setCircumference(event.target.value);
    };

    const handleChangeAxisWidth = (event: SelectChangeEvent) => {
        if(event.target.value > 100)
            setAxisWidth(100)
        else if(event.target.value < 0)
            setAxisWidth(0)
        else setAxisWidth(event.target.value);
    };

    return (
        <TasksContext.Provider value={value}>
            <div className={'centered'}>
                <IconButton aria-label="settings" style={{float: 'right'}} onClick={handleClickOpen}>
                    <SettingsIcon/>
                </IconButton>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle style={{fontFamily: "Comic Sans MS"}}>Robot settings</DialogTitle>
                    <DialogContent>
                        <p>Engine ports</p>
                        <TextField
                            inputProps={{ pattern: "[A-D]" }}
                            margin="dense"
                            id="first_pin"
                            value={firstPort}
                            onChange={handleChangeFirstPort}
                            label="First pin"
                            variant="outlined"
                            size="small"
                            style={{width: '30%', marginRight: '4%'}}
                        />
                        <TextField
                            margin="dense"
                            id="second_pin"
                            label="Second pin"
                            inputProps={{ pattern: "[A-D]" }}
                            value={secondPort}
                            onChange={handleChangeSecondPort}
                            variant="outlined"
                            size="small"
                            style={{width: '30%'}}
                        />
                        <p>Power</p>
                        <TextField
                            margin="dense"
                            id="power"
                            value={power}
                            type={"number"}
                            onChange={handleChangePower}
                            label="Power"
                            variant="outlined"
                            size="small"
                            style={{width: '30%', marginRight: '4%'}}
                        />
                        <p>Circumference</p>
                        <TextField
                            margin="dense"
                            id="circumference"
                            value={circumference}
                            type={"number"}
                            onChange={handleChangeCircumference}
                            label="Circumference"
                            variant="outlined"
                            size="small"
                            style={{width: '30%', marginRight: '4%'}}
                        />
                        <p>Axis width</p>
                        <TextField
                            margin="dense"
                            id="axis_width"
                            type={"number"}
                            value={axisWidth}
                            onChange={handleChangeAxisWidth}
                            label="Axis Width"
                            variant="outlined"
                            size="small"
                            style={{width: '30%', marginRight: '4%'}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
                <p>Simulation of robot movements</p>
                <div className={'main-border'}>
                    <Canvas/>
                    <div className={'right-div'}>
                        <Tasks movement={"move"}/>
                        <Tasks movement={"rotate"}/>
                        <TasksList firstPort={firstPort} secondPort={secondPort} circumference={circumference} axisWidth={axisWidth} power={power}/>
                    </div>
                </div>
            </div>
        </TasksContext.Provider>
    );
}

export default App;
