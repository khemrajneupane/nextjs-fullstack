import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
//import { getSortedPostsData } from '../lib/posts';
import { MongoClient } from 'mongodb';
import Image from 'next/image';
import ItemDetails from '../components/item-details/item-details';
import { useState } from 'react';
import PostForm from '../components/post-form/post-form';
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
  const[items, setItems]= useState([]);
fetch('/api/add-new-post').then(data=>data.json()).then(items=>setItems(items.data)).catch(e=>console.log("error ", e))


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <PostForm />
      </section>
      
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        
        <div className={utilStyles.list}>
        <h2 className={utilStyles.headingLg}>Below from getStaticProps()</h2>
          {nextblog.map(items=>
          <div key = {items.id}>
            <ItemDetails blogItems={items} />
          </div>
           
          )}
          <h2 className={utilStyles.headingLg}>Below from next api routing</h2>
          {items.map(item=>
          <div key = {item.id}>
            <ItemDetails blogItems={item} />
          </div>
           
          )}
         
        </div>
        
      </section>
    </Layout>
  );
} 