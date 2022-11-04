import Link from "next/link";
import { MongoClient } from 'mongodb';
import Card from "../../components/ui/Card";
import Image from "next/image";
export const getStaticPaths = async ()=>{
  const MONGODB_URI="mongodb+srv://biansha:m6CwtwkzJfKboKCb@cluster0.jqm4a.mongodb.net/?retryWrites=true&w=majority";//"mongodb+srv://khem:Merogoruko12taka1!@cluster0.xquwwl1.mongodb.net/nextblog?retryWrites=true&w=majority"
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db();
  const blogCollection = db.collection('nextblog');
  const nextblog = await blogCollection.find({}).toArray();
  
  const paths = nextblog.map(item=> {
    return{
      params:{id:item._id.toString()}
    }
  })
  return{
    paths,
    fallback:false
  }
}

export const getStaticProps = async (context) =>{
  const id = context.params.id;
  
  const MONGODB_URI="mongodb+srv://biansha:m6CwtwkzJfKboKCb@cluster0.jqm4a.mongodb.net/?retryWrites=true&w=majority";//"mongodb+srv://khem:Merogoruko12taka1!@cluster0.xquwwl1.mongodb.net/nextblog?retryWrites=true&w=majority"
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db();
  const blogCollection = db.collection('nextblog');
  const nextblog = await blogCollection.find({}).toArray();
  const findByParamsId= nextblog.find(item=> item._id.toString() === id)
  console.log("findById",findByParamsId)
  return{
    props:{
      blogItems: {
        title:findByParamsId.title,
        address:findByParamsId.address,
        description:findByParamsId.description,
        image:findByParamsId.image,
        id: findByParamsId._id.toString()
      }
    }
  }
}
const Details = ({blogItems})=>{
  return(
    <div style={{marginTop:"1rem"}}>
    <Card>
        <Image
          src={blogItems.image}
          height={50}
          width={75}
          alt={blogItems.title}
        />
        <p> Title: {blogItems.title}</p>
        <p> Address: {blogItems.address}</p>
        <p> Description: {blogItems.description}</p>
        <Link href="/">Back Home</Link>
      </Card>
      </div>
  )
}
export default Details;