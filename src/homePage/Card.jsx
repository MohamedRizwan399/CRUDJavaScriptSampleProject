import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
let counter = 0;

const Card = ({post, itemArrLength, isAllCardLoaded}) => {
  const [imageSrc, setImageSrc] = useState("favicon1.ico");
  const handleImageLoad = () => {
    setImageSrc(post?.img || "logo512.png");
  }

  useEffect(() => {
    counter = counter + 1;
    const timer = setTimeout(() => {
      if (itemArrLength === counter) {  
        isAllCardLoaded(true) 
      }
    }, 1000);
    return () => { 
      clearTimeout(timer);
      counter = 0;
    };
  }, [itemArrLength, isAllCardLoaded]);

  return (
      <div className='home-card'>
        <Link className='link' to={`/post/${post?.id}`}>
          <span className='title'>{post?.title}</span>
        </Link>
        <Link className='imgLink' to={'/dashboard'}>
          <img src={imageSrc} alt="" className="img" onLoad={handleImageLoad}/>
          <p className='desc'>{post?.desc}</p>
          <button className='cardButton'>Read more</button>
        </Link>
      </div>
  )
}

export default Card;