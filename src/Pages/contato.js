/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';

const Contatos = () => {
  const [message, setMessage] =useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  useEffect(async () => {
    const res = await fetch('http://localhost:5000/message');
    const data = await res.json();
    setMessage(data)
  }, [])
  
  return(
    <>
      <Grid container direction="row" xs={12}>
        <TextField id="name" label="Name" value={author} onChange={(event) => {setAuthor(event.target.value)}} fullWidth />
        <TextField id="message" label="Message" value={content} onChange={(event) => {setContent(event.target.value)}} fullWidth />
      </Grid>
      <Button className="mt-4" variant="contained" color="primary">
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
