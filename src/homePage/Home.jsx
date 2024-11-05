import React, { useState } from 'react'
import {posts} from "./data"
import Card from './Card'
import ClipLoader from 'react-spinners/ClipLoader';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const isAllCardLoaded = async (isAllLoaded = false) => {
    if(isAllLoaded) { setIsLoading(false); }
  }
  
  return (
    <div className='home'>
        {posts.map((post, index) => (
          <Card 
            key={post?.id} 
            post={post} 
            itemArrLength={posts.length}
            isAllCardLoaded={isAllCardLoaded}
          />
        ))}

        {/* Loader */}
        {isLoading && <div className="loader">
          <ClipLoader color="#09f" loading={isLoading} size={50} /></div>
        }
    </div>
  )
}

export default Home;