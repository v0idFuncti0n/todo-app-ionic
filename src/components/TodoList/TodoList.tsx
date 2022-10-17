import React, {useEffect, useState} from "react";
import {IonList} from '@ionic/react';
import TodoItem from "../TodoItem/TodoItem";
import {Todo} from "../../shared/interfaces/Todo";
import {firebaseApp} from "../../firebase/firebase";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const database = firebaseApp.database();

    useEffect(() => {
        database.ref("/todos").on("value", snapshot => {
            const getTodos: Todo[] = [];
            console.log(snapshot.forEach(t => {
                getTodos.push({text: t.val().text, key: t.key!, isChecked: t.val().isChecked})
            }));
            setTodos(getTodos);
        })
        database.ref("/todos").on("child_removed", snapshot => {
            const todoKey = snapshot.key!;
            const todoIndex = todos.findIndex(todo => {
                return todo.key === todoKey
            });
            console.log(todoIndex)
            todos.slice(todoIndex, 0);
            console.log(todos)
            setTodos(todos);
            console.log(todos)
        });
        database.ref("/todos").on("child_added", snapshot => {
            const newTodo = snapshot.toJSON() as Todo;
            newTodo.key = snapshot.key!;
            setTodos(todos => [...todos, newTodo]);
        });
    }, [database])

    return (
        <IonList>
            {todos.map(todo => <TodoItem key={todo.key} todo={todo}/>)}
        </IonList>
    );
}

export default TodoList;