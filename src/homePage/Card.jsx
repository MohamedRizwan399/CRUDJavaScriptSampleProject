import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({post}) => {
  return (
    <div className='home-card'>
        <Link className='link' to={`/post/${post?.id}`}>
        <span className='title'>{post?.title}</span>
        </Link>
        <Link className='imgLink' to={'/dashboard'}>
        <img src={post?.img} alt="" className="img" />
        <p className='desc'>{post?.desc}</p>
        <button className='cardButton'>Read more</button>
        </Link>

        </div>
  )
}

export default Card