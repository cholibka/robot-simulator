import React from "react";

// set the defaults
const TasksContext = React.createContext({
    tasks: [],
    setTasks: () => {}
});

export default TasksContext;

