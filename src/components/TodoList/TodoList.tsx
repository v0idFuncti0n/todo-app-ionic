import React, {useEffect, useState} from "react";
import {IonList} from '@ionic/react';

import TodoItem from "../TodoItem/TodoItem";
import {Todo} from "../../shared/interfaces/Todo";

import TodoService from "../../shared/services/TodoService";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
            const todoService = new TodoService();
            const unsubscribe = todoService.realtimeUpdate(setTodos);

            return () => {
                unsubscribe()
            }
        }, [])

    return (
        <IonList>
            {todos.map(todo => <TodoItem key={todo.key} todo={todo}/>)}
        </IonList>
    );
}

export default TodoList;