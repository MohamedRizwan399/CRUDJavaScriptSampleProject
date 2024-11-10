import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
let counter = 0;

const Card = ({post, itemArrLength, isAllCardLoaded}) => {
  const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/favicon1.ico`);

  useEffect(() => {
    counter = counter + 1;
    const timer = setTimeout(() => {
      if (itemArrLength === counter) {  
        isAllCardLoaded(true);
      }
    }, 1000);
    return () => { 
      clearTimeout(timer);
      counter = 0;
    };
  }, [itemArrLength, isAllCardLoaded]);

  const handleImageLoad = () => {
    if (post?.img && post?.img !== "") {
      setImageSrc(post?.img);
    } else {
      setImageSrc(`${process.env.PUBLIC_URL}/logo512.png`);
    }
  }

  const handleImageError = () => {
    console.error("Error loading image.");
    setImageSrc(`${process.env.PUBLIC_URL}/logo512.png`);
  };

  return (
      <div className='home-card'>
        <Link className='link' to={`/post/${post?.id}`}>
          <span className='title'>{post?.title}</span>
        </Link>
        <Link className='imgLink' to={'/dashboard'}>
          <img src={imageSrc} alt="" className="img" onLoad={handleImageLoad} onError={handleImageError}/>
          <p className='desc'>{post?.desc}</p>
          <button className='cardButton'>Read more</button>
        </Link>
      </div>
  )
}

export default Card;