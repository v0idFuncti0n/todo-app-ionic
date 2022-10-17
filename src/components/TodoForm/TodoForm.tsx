import React, {createRef, useState} from "react";
import {IonButton, IonItem, IonInput} from '@ionic/react';
import TodoService from "../../shared/services/TodoService";

interface InputChangeEventDetail {
    value: string | undefined | null;
}

interface InputCustomEvent extends CustomEvent {
    detail: InputChangeEventDetail;
    target: HTMLIonInputElement;
}

const TodoForm: React.FC = () => {

    const [text, setText] = useState("");

    const ionInputRef = createRef<HTMLIonInputElement>();

    const todoService = new TodoService();

    const inputChangeEventHandler = (event: InputCustomEvent) => {
        setText(event.target.value!.toString());
    }

    const addTodo = () => {
        todoService.addTodo({
            text: text,
            isChecked: false,
            timestamp: new Date()
        }).then( _ => {
            clearInput();
        });
    }

    const clearInput = () => {
        setText("");
        ionInputRef.current!.value = "";
    }

    return (
        <>
            <IonItem lines="none">
                <IonInput ref={ionInputRef} onIonChange={inputChangeEventHandler} clearInput={true}
                          placeholder="Add Todo"></IonInput>
            </IonItem>
            <IonButton expand="full" onClick={addTodo}>Add</IonButton>
        </>
    );
}

export default TodoForm;