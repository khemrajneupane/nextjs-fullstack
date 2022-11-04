import PostForm from "../../components/post-form/post-form";
import { useRouter } from "next/router";

export default function AddPost(){
  const router = useRouter();
    async function insertPosts(entredPostData) {
     
        const response = await fetch('/api/add-new-post', {
          method: 'POST',
          body: JSON.stringify(entredPostData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json();
        console.log("post data", data)
        router.push('/')
        
        
      }
      
    return(<PostForm onAddPost={insertPosts} />)
}