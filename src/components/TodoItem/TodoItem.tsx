import React, {useState} from "react";
import {IonCheckbox, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from "@ionic/react";
import {Todo} from "../../shared/interfaces/Todo";
import TodoService from "../../shared/services/TodoService";

import './TodoItem.css'

interface TodoItemProps {
    todo: Todo
}

interface ItemSlidingCustomEvent extends CustomEvent {
    target: HTMLIonItemSlidingElement;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {

    const todoService = new TodoService();
    const [isChecked, setIsChecked] = useState(props.todo.isChecked);

    const ionDragEventHandler = (event: ItemSlidingCustomEvent) => {
        const ionItemSlidingElement = event.target;
        ionItemSlidingElement.getSlidingRatio()
            .then(ratio => {
                if (ratio < -3 || ratio > 3) {
                    ionItemSlidingElement.closeOpened();
                }
            })
    }

    const deleteOnIonSwipeEventHandler = () => {
        todoService.deleteTodo(props.todo);
    }

    const checkOnIonSwipeEventHandler = () => {
        props.todo.isChecked = !props.todo.isChecked;
        setIsChecked(props.todo.isChecked);
        todoService.changeCheckState(props.todo);
    }

    return (
        <IonItemSliding onIonDrag={ionDragEventHandler}>

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