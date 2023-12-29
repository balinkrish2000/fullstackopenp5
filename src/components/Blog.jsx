import Togglable from "./Togglable"

const Blog = ({ blog }) => {

  const blogStyle={
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
      <div style={blogStyle}>
        {blog.title}
        <Togglable buttonText=''>
          {blog.author}<br/>
          {blog.url}<br/>
          {blog.likes}<button>like</button><br/>
          {blog.user.username}
        </Togglable>
      </div>
    )
  }

export default Blog