const io = require('socket.io')(5000, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  socket.on('create-post', postData => {
    console.log(postData)
    io.emit('update', postData)
  })
  socket.on('post-action', action => {
    console.log(action)
    io.emit('post-update', action)
  })
})