import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
//import { getSortedPostsData } from '../lib/posts';
import { MongoClient } from 'mongodb';
import Image from 'next/image';
import ItemDetails from '../components/item-details/item-details';
//import Date from '../components/date';
//import Date from '../components/date';

export async function getStaticProps() {
  const MONGODB_URI="mongodb+srv://biansha:m6CwtwkzJfKboKCb@cluster0.jqm4a.mongodb.net/?retryWrites=true&w=majority";//"mongodb+srv://khem:Merogoruko12taka1!@cluster0.xquwwl1.mongodb.net/nextblog?retryWrites=true&w=majority"
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db();
  const blogCollection = db.collection('nextblog');
  const nextblog = await blogCollection.find({}).toArray();

  client.close();
  //const allPostsData = getSortedPostsData();
 
  return {
    props:{
      nextblog: nextblog.map(item =>({
        title:item.title,
        address:item.address,
        description:item.description,
        image:item.image,
        id: item._id.toString()
      }))
    },
    revalidate:1
  }
}
/*
export async function getServerSideProps(context) {
  const MONGODB_URI="mongodb+srv://biansha:m6CwtwkzJfKboKCb@cluster0.jqm4a.mongodb.net/?retryWrites=true&w=majority";//"mongodb+srv://khem:Merogoruko12taka1!@cluster0.xquwwl1.mongodb.net/nextblog?retryWrites=true&w=majority"
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db();
  const blogCollection = db.collection('nextblog');
  const nextblog = await blogCollection.find({}).toArray();

  console.log("nextblog",nextblog)
  client.close();

  return {
    props:{
      nextblog: nextblog.map(item =>({
        title:item.title,
        address:item.address,
        description:item.description,
        id: item._id.toString()
      }))
    }
  }
}
*/
export default function Home({nextblog}) {
  var today = new Date();
  const utcDay = today.getUTCDate()        // 24
  const utcMonth = today.getUTCMonth()     // 10 (UTC Month is also 0-based)
  const utcYear = today.getUTCFullYear()
  const myDate = `${utcMonth}-${utcDay}-${utcYear}`;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>My name is Khem Raj Neupane</p>

      </section>
      
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <div className={utilStyles.list}>
          {nextblog.map(items=>
          <div key = {items.id}>
            <ItemDetails blogItems={items} />
            <ItemDetails blogItems={items} />
          </div>
           
          )}
         
        </div>
        
      </section>
    </Layout>
  );
} 