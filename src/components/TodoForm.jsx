import React, { useState } from 'react';
import { useTodo } from '../context';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();

        if (!todo) return;

        // Simple regex pattern to find URLs within the text
        const urlPattern = new RegExp('(https?:\\/\\/[^\\s]+)', 'g');
        const urls = todo.match(urlPattern);
        const url = urls ? urls[0] : ''; // Take the first URL if multiple are found

        let cleanTodo = todo.replace(urlPattern, '').trim();

        // If only URL exists, set the todo title as TLD of the URL
        if (!cleanTodo && url) {
            const urlObj = new URL(url);
            cleanTodo = urlObj.hostname.split('.').slice(-2).join('.');
        }

        addTodo({ todo: cleanTodo, url, completed: false });
        setTodo("");
    };

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo or include a URL..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => {
                    setTodo(e.target.value);
                }}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-[#171717] text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
