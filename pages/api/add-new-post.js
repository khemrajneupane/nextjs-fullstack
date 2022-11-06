import { MongoClient } from 'mongodb';
async function handler(req, res) {
    const MONGODB_URI = "mongodb+srv://biansha:m6CwtwkzJfKboKCb@cluster0.jqm4a.mongodb.net/?retryWrites=true&w=majority";//"mongodb+srv://khem:Merogoruko12taka1!@cluster0.xquwwl1.mongodb.net/nextblog?retryWrites=true&w=majority"
    const client = await MongoClient.connect(MONGODB_URI)
    const db = client.db();
    const blogCollection = db.collection('nextblog');
    
    if (req.method === "GET") {
        const result = await blogCollection.find({}).sort().toArray();

        if (!result) {
            return res.status(500).json({ message: "internal server error" })
        }
        res.status(200).json({ data: result });

    } else if (req.method === "POST") {

        const { title, address, description, image} = req.body
        const newNextBlog = {
            title,
            image,
            address,
            description
        }
        await db.collection("nextblog").insertOne(newNextBlog);
        res.status(201).json({ message: "values inserted", data: newNextBlog });
    }
    client.close();
}
export default handler;