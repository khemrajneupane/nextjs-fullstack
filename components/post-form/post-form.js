import { useRef, useState } from 'react';

import Card from '../ui/Card';
import classes from './post-form.module.css';
const PostForm = () =>{
  const [titleInputRef,setTitleInputRef] = useState("");
  const [imageInputRef,setImageInputRef] = useState("");
  const [addressInputRef,setAddressInputRef] = useState("");
  const [descriptionInputRef,setDescriptionInputRef] = useState("");

  const handleTitleChange =(e)=>setTitleInputRef(e.target.value)
  const handleImageChange =(e)=>setImageInputRef(e.target.value)
  const handleAddressChange =(e)=>setAddressInputRef(e.target.value)
  const handleDescriptionChange =(e)=>setDescriptionInputRef(e.target.value)

  const submitHandler= async(event)=> {
    event.preventDefault();
      await fetch("/api/add-new-post",{
        method:"POST",
        body:JSON.stringify({
          title: titleInputRef,
          image: imageInputRef,
          address: addressInputRef,
          description: descriptionInputRef,
        }),
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res=> res.json()).then(data=> console.log("data from post-form", data)).catch(e=>console.log(e))

  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'> Title</label>
          <input type='text' required id='title' onChange={(e)=> handleTitleChange(e)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'> Image</label>
          <input type='text' required id='image' onChange={(e)=> handleImageChange(e)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' onChange={(e)=> handleAddressChange(e)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            onChange={(e)=> handleDescriptionChange(e)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Next Blog</button>
        </div>
      </form>
    </Card>
  );
}

export default PostForm;