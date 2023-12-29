import Togglable from "./Togglable"

const Blog = ({ blog, blogLikeUpdate, removeBlog }) => {

  const blogStyle={
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleOnLike = () => {
    let updatedLikes = blog.likes + 1
    const {user, ...newBlogToUpdate} = blog
    newBlogToUpdate.likes = updatedLikes
    blogLikeUpdate(newBlogToUpdate)
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      removeBlog(blog.id)
  }

  return (
      <div style={blogStyle}>
        {blog.title}
        <Togglable buttonText=''>
          {blog.author}<br/>
          {blog.url}<br/>
          {blog.likes}<button onClick={handleOnLike}>like</button><br/>
          {blog.user.username}<br/>
          <button onClick={handleRemoveBlog}>remove</button>
        </Togglable>
      </div>
    )
  }

export default Blog