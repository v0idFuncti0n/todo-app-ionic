import {Todo} from "../interfaces/Todo";
import {HTTPMethod} from "workbox-routing/utils/constants";
import {firebaseApp} from "../../firebase/firebase";
import TodoWithoutKey from "../interfaces/TodoWithoutKey";

const headers = {
    "Accept": "application/json",
    "Content-type": "application/json"
};

class TodoService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "https://todo-app-7eb4b-default-rtdb.firebaseio.com";
    }

    public request(url: string, method: HTTPMethod = "POST", data?: Todo) {
        url = this.fullUrl(url);
        let options: RequestInit = {
            headers,
            method,
        }
        if(data) {
            options.body = JSON.stringify({...data});
        }
        return fetch(url, options);
    }


    public addTodo(todo: Todo | TodoWithoutKey) {
        return firebaseApp.database().ref("/todos").push(todo);
    }

    public deleteTodo(todo: Todo) {
        return firebaseApp.database().ref("/todos").child(todo.key).remove();
    }

    public changeCheckState(todo: Todo) {
        return firebaseApp.database().ref("/todos").child(todo.key).child("isChecked").set(todo.isChecked);
    }

    private fullUrl = (url: string) => {
        return `${this.baseUrl}/${url}`;
    }
}

export default TodoService;