import { useState } from "react"

const CreateBlog = ({addNewBlog}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = (event) => {
        event.preventDefault()
        addNewBlog({title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={handleCreateBlog}>
            <h2>Create New</h2>
            <div>
                title:
                <input
                type='text'
                value={title}
                name='Title'
                onChange={({target}) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                type='text'
                value={author}
                name='Author'
                onChange={({target}) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                type='text'
                value={url}
                name='Url'
                onChange={({target}) => setUrl(target.value)}
                />
            </div>
            <button type='submit'>create</button>
            </form>
    )

}

export default CreateBlog