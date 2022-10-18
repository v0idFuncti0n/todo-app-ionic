import {firebaseDatabase} from "../../firebase/firebase";
import {collection, doc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy} from "firebase/firestore"
import {Todo} from "../interfaces/Todo";
import TodoWithoutKey from "../interfaces/TodoWithoutKey";
import React from "react";

class TodoService {

    private readonly todoCollectionRef;

    constructor() {
        this.todoCollectionRef = collection(firebaseDatabase, 'todos');
    }

    public async getAllTodos() {
        return getDocs(this.todoCollectionRef).then( response => {
            return response.docs.map<Todo>(doc => ({
                key: doc.id,
                text: doc.get('text'),
                isChecked: doc.get('isChecked'),
                timestamp: new Date()
            }));
        })
    }

    public async addTodo(todo: TodoWithoutKey) {
        return addDoc(this.todoCollectionRef, todo).then( response => {
            const newTodo: Todo = {
                key: response.id,
                text: todo.text,
                isChecked: todo.isChecked,
                timestamp: todo.timestamp
            };
            return newTodo;
        });
    }

    public deleteTodo(todo: Todo) {
        const docRef = doc(this.todoCollectionRef, '/', todo.key);
        return deleteDoc(docRef);
    }

    public async changeCheckState(todo: Todo) {
        todo.isChecked = !todo.isChecked;
        const docRef = doc(this.todoCollectionRef, '/', todo.key);
        return updateDoc(docRef, {text: todo.text, isChecked: todo.isChecked, timestamp: todo.timestamp});
    }

    public realtimeUpdate(setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) {
        const todosInDescendingOrder = query(collection(this.todoCollectionRef, '/'), orderBy('timestamp'));
        return onSnapshot(todosInDescendingOrder, snapshot => {
            const updatedTodos = snapshot.docs.map(doc => ({
                key: doc.id,
                text: doc.data().text,
                isChecked: doc.data().isChecked,
                timestamp: new Date(doc.data().timestamp.seconds * 1000)
            }));
            setTodos(updatedTodos);
        })
    }

}

export default TodoService;