import Image from 'next/image';
import Link from 'next/link';
import Card from '../ui/Card';
import classes from './item-details.module.css'
const ItemDetails = ({blogItems}) => {
  return (
    <Card>
      <Link href={`/posts/${blogItems.id}`}>
        <div>
        <Image
          src={blogItems.image}
          height={50}
          width={75}
          className={classes.my_image}
          alt={blogItems.title}
        />
        <p> Title: {blogItems.title}</p>
        <p> Address: {blogItems.address}</p>
        <p> Description: {blogItems.description}</p>
          </div>
      </Link>
      
      </Card>
  );
}

export default ItemDetails;