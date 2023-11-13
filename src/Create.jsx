import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc} from "firebase/firestore";
import {db} from "./Home"

const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('admin')
    const [isPending, setIsPending] = useState(false)
    const history = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const blog = {title, body, author}

        setIsPending(true)
        addDoc(collection(db, "posts"), {
            title: title,
            body: body,
            author : author
          });
         setIsPending(false)
        history('/')
        
    }
    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title (max 100 characters):</label>
                <input 
                type="text"
                required
                maxLength={100}
                onChange={ e => setTitle(e.target.value) }
                />
                <label>Blog body (max 600 characters):</label>
                <textarea 
                type="text"
                required
                maxLength={600}
                onChange={ e => setBody(e.target.value)} 
                />
                <label>Blog author:</label>
                <select
                value={author}
                onChange={ e => setAuthor(e.target.value)}>
                    <option value="admin">Admin</option>
                </select>
               { !isPending && <button>Add blog</button>}
               { isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;