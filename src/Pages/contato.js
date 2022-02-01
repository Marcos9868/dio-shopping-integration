/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';

const Contatos = () => {
  const Url = 'http://localhost:5000/message'
  const [message, setMessage] =useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [validator, setValidator] = useState(false)

  useEffect(async () => {
    const res = await fetch('http://localhost:5000/message');
    const data = await res.json();
    setMessage(data)
  }, [])
  
  const sendMessage = () => {
    setValidator(false)
    if(author.length <= 0 || content.length <= 0) {
      return setValidator(!validator)
    }

    const bodyForm = {
      email: author,
      message: content
    }
    fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyForm)
    })
    console.log(content)
  }
  return(
    <>
      <Grid container direction="row" xs={12}>
        <TextField id="name" label="Name" value={author} onChange={(event) => {setAuthor(event.target.value)}} fullWidth />
        <TextField id="message" label="Message" value={content} onChange={(event) => {setContent(event.target.value)}} fullWidth />
      </Grid>
      {validator && <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Please, Fill in all the fields</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> }
      
      <Button onClick={sendMessage} className="mt-4" variant="contained" color="primary">
        Sent
      </Button>
      {message.map((content) => {
        return(
          <div className="card mt-4" key={content.id}>
            <div className="card-body">
              <h5 className="card-title">{content.email}</h5>
              <p className="card-text">{content.message}</p>
              <p className="card-text"><small className="text-muted">{content.created_at}</small></p>
            </div>
          </div>
        )
      })}  
    </> 
  )
}

export default Contatos;
