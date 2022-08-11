const commentRouter = require('express').Router()
const Blog = require('../models/blog')

commentRouter.post('/:blogId/comment', (req, resp) => {
	const blogId = req.params.blogId
	const comment = req.body.comment
	
	 Blog.updateOne( {_id: blogId},
		{$push: {comments: comment}})
		.then( rsp => resp.send(comment))
})


module.exports = commentRouter
