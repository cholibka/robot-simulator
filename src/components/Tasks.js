import './components.css';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {IconButton, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TasksContext from "../tasks-context";
import {useContext} from "react";

function Tasks({movement}) {
    const {tasks, setTasks} = useContext(TasksContext);
    const [move, setMove] = React.useState('');
    const [rotate, setRotate] = React.useState('');
    const [distance, setDistance] = React.useState('');
    const [angle, setAngle] = React.useState('');

    const handleChangeMove = (event: SelectChangeEvent) => {
        setMove(event.target.value);
    };

    const handleChangeRotate = (event: SelectChangeEvent) => {
        setRotate(event.target.value);
    };

    const handleChangeDistance = (event: SelectChangeEvent) => {
        setDistance(event.target.value);
    };

    const handleChangeAngle = (event: SelectChangeEvent) => {
        setAngle(event.target.value);
    };

    const addTask = () => {
        if(movement === 'move') {
            let obj = {movement: movement, distance: distance, direction: move};
            setTasks([...tasks, obj]);
        }
        else {
            let obj = {movement: movement, distance: angle, direction: rotate}
            setTasks([...tasks, obj]);
        }
    };


    return (
        <div className={'tasks'}>
            <p>{movement}</p>
            <div>
                {movement === 'move' &&
                    <div>
                        <FormControl fullWidth size="small" style={{width: '50%', marginRight: '2%'}}>
                            <InputLabel id="move-label">Move</InputLabel>
                            <Select
                                labelId="move-label"
                                id="move-select"
                                value={move}
                                label="Direction"
                                onChange={handleChangeMove}>
                                <MenuItem value={'forward'}>forward</MenuItem>
                                <MenuItem value={'backward'}>backward</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="distance"
                            label="Distance (cm)"
                            variant="outlined"
                            size="small"
                            style={{width: '40%'}}
                            value={distance}
                            onChange={handleChangeDistance}/>
                        <div>
                            <IconButton aria-label="add" style={{float: 'right'}} color="secondary" onClick={addTask}>
                                <AddCircleIcon/>
                            </IconButton>
                        </div>
                    </div>
                }
                {movement === 'rotate' &&
                    <div>
                        <FormControl fullWidth size="small" style={{width: '50%', marginRight: '2%'}}>
                            <InputLabel id="rotate-label">Rotate</InputLabel>
                            <Select
                                labelId="rotate-label"
                                id="rotate-select"
                                value={rotate}
                                label="Direction"
                                onChange={handleChangeRotate}>
                                <MenuItem value={'left'}>left</MenuItem>
                                <MenuItem value={'right'}>right</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="angle"
                            label="Angle"
                            variant="outlined"
                            size="small"
                            style={{width: '40%'}}
                            value={angle}
                            onChange={handleChangeAngle}/>
                        <div>
                            <IconButton aria-label="add" style={{float: 'right'}} color="secondary" onClick={addTask}>
                                <AddCircleIcon/>
                            </IconButton>
                        </div>
                    </div>
                }
            </div>

        </div>
    );
}

export default Tasks;
