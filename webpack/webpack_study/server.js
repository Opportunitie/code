let express = require('express')

let app = express()

app.get('./api/user', (ret, res)=>{
  res.json({name: 'success'})
})

app.listen(3000)