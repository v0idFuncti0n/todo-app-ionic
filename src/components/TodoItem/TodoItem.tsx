import React, {useRef, useState} from "react";
import {IonCheckbox, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from "@ionic/react";
import {Todo} from "../../shared/interfaces/Todo";
import TodoService from "../../shared/services/TodoService";

import './TodoItem.css'

interface TodoItemProps {
    todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = (props) => {

    const todoService = new TodoService();
    const [isChecked, setIsChecked] = useState(props.todo.isChecked);

    const ionItemSlidingElement = useRef<HTMLIonItemSlidingElement>(null)


    const deleteOnIonSwipeEventHandler = () => {
        ionItemSlidingElement.current!.closeOpened().then(_ => {
            todoService.deleteTodo(props.todo).catch(error => console.log(error));
        });
    }

    const checkOnIonSwipeEventHandler = () => {
        ionItemSlidingElement.current!.closeOpened().then(_ => {
            todoService.changeCheckState(props.todo).then(_ => {
                setIsChecked(props.todo.isChecked);
            });
        });
    }

    return (
        <IonItemSliding ref={ionItemSlidingElement}>

            <IonItemOptions onIonSwipe={checkOnIonSwipeEventHandler} onClick={checkOnIonSwipeEventHandler} side="start">
                <IonItemOption color="success" expandable>Complete</IonItemOption>
            </IonItemOptions>

            <IonItem lines={"none"}>
                <IonCheckbox className="disabled" slot="start" color="success" checked={isChecked}></IonCheckbox>
                <IonLabel>{props.todo.text}</IonLabel>
            </IonItem>

            <IonItemOptions onIonSwipe={deleteOnIonSwipeEventHandler} side="end">
                <IonItemOption color="danger" expandable>Delete</IonItemOption>
            </IonItemOptions>

        </IonItemSliding>
    );
}

export default TodoItem;