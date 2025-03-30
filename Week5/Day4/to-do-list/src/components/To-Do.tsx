// import { useState, useEffect } from "react";

// const TodoApp = () => {
//     const [inputText, setInputText] = useState("");
//     const [todos, setTodos] = useState<string[]>([]);
//     const [editIndex, setEditIndex] = useState<number | null>(null);

//     // Load todos from localStorage when the component mounts
//     useEffect(() => {
//         const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
//         if (Array.isArray(savedTodos)) {
//             setTodos(savedTodos);
//         }
//     }, []);

//     // Update localStorage whenever todos change
//     useEffect(() => {
//         if (todos.length > 0) {
//             localStorage.setItem("todos", JSON.stringify(todos));
//         }
//     }, [todos]);

//     const addTodo = () => {
//         if (inputText.trim().length < 3) {
//             alert("Add at least 3 characters");
//             return;
//         }

//         setTodos((prevTodos) => {
//             const updatedTodos = editIndex !== null
//                 ? prevTodos.map((todo, index) => (index === editIndex ? inputText : todo))
//                 : [...prevTodos, inputText];

//             localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save immediately
//             return updatedTodos;
//         });

//         setInputText("");
//         setEditIndex(null);
//     };

//     const deleteTodo = (index: number) => {
//         setTodos((prevTodos) => {
//             const updatedTodos = prevTodos.filter((_, i) => i !== index);
//             localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save immediately
//             return updatedTodos;
//         });
//     };

//     const editTodo = (index: number) => {
//         setInputText(todos[index]);
//         setEditIndex(index);
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//             />
//             <button onClick={addTodo}>{editIndex !== null ? "Edit" : "Add"}</button>
//             <ul>
//                 {todos.map((todo, index) => (
//                     <li key={index}>
//                         <p>{todo}</p>
//                         <button onClick={() => editTodo(index)}>Edit</button>
//                         <button onClick={() => deleteTodo(index)}>Remove</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TodoApp;



import { useState, useEffect } from "react";

const TodoApp = () => {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        if (Array.isArray(savedTodos)) {
            setTodos(savedTodos);
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = () => {
        if (inputText.trim().length < 3) {
            alert("Add at least 3 characters");
            return;
        }

        setTodos((prevTodos) => {
            const updatedTodos = editIndex !== null
                ? prevTodos.map((todo, index) =>
                    index === editIndex ? { ...todo, text: inputText } : todo
                )
                : [...prevTodos, { text: inputText, completed: false }];

            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });

        setInputText("");
        setEditIndex(null);
    };

    const deleteTodo = (index: number) => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.filter((_, i) => i !== index);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    const editTodo = (index: number) => {
        setInputText(todos[index].text);
        setEditIndex(index);
    };

    const toggleComplete = (index: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ width: "300px", height: "40px", fontSize: "18px", padding: "5px" }}
            />
            <button onClick={addTodo}>{editIndex !== null ? "Edit" : "Add"}</button>
            <ul>
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        onClick={(e) => {
                            if (!(e.target as HTMLElement).closest("button")) { 
                                toggleComplete(index);
                            }
                        }}
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "5px",
                            border: "1px solid #ddd",
                            marginBottom: "5px",
                        }}
                    >
                        <span>{todo.text}</span>
                        <div>
                            <button onClick={() => editTodo(index)}>Edit</button>
                            <button onClick={() => deleteTodo(index)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
