const dummy = (blogs) => {
    if(Array.isArray(blogs)){
        return 1
    }
    
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

export default {
    dummy,
    totalLikes
}