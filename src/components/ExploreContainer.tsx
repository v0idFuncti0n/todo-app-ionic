import './ExploreContainer.css';
import TodoList from "./TodoList/TodoList";
import React from "react";

interface ContainerProps {
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    return (
        <>
            <TodoList/>
        </>
    );
};

export default ExploreContainer;
