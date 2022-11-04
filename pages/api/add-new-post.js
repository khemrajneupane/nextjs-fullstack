import {MongoClient} from 'mongodb';
async function handler(req,res){
    if(req.method==="POST"){
        const data = req.body;
        const {title, image, address, description} = data;
       const MONGODB_URI="mongodb+srv://biansha:m6CwtwkzJfKboKCb@cluster0.jqm4a.mongodb.net/?retryWrites=true&w=majority";//"mongodb+srv://khem:Merogoruko12taka1!@cluster0.xquwwl1.mongodb.net/nextblog?retryWrites=true&w=majority"
        const client = await MongoClient.connect(MONGODB_URI)
        const db = client.db();
        const blogCollection = db.collection('nextblog');
        const result = await blogCollection.insertOne({title, image, address, description})
        console.log("results",result);
        client.close();
        res.status(201).json({message:"values inserted"});
    }
}
export default handler;