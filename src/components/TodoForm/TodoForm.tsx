import React, {createRef, useState} from "react";
import { IonButton, IonItem, IonInput } from '@ionic/react';
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
    const [addMode, setAddMode] = useState(false);

    const ionInputRef = createRef<HTMLIonInputElement>();

    const todoService = new TodoService();

    const inputChangeEventHandler = (event: InputCustomEvent) => {
        setText(event.target.value!.toString());
    }

    const addTodo = () => {
        if (addMode) {
            todoService.addTodo({
                text: text,
                isChecked: false,
                timestamp: new Date()
            }).then( _ => {
                clearInput();
                setAddMode(false);
            });
        } else {
            setAddMode(true);
        }
    }

    const clearInput = () => {
        setText("");
        ionInputRef.current!.value = "";
    }

    return (
        <>
            <IonItem>
                <IonInput hidden={!addMode} ref={ionInputRef} onIonChange={inputChangeEventHandler} clearInput={true} placeholder="Add Todo"></IonInput>
            </IonItem>
            <IonButton expand="full" onClick={addTodo}>{addMode ? "Save" : "Add"} </IonButton>
        </>
    );
}

export default TodoForm;