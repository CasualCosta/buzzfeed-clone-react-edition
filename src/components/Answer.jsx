import React from 'react'

const Answer = ({ result }) => {
  const {text, image, alt} = result;
  return (
    <div className='answer-block' id='answer-block'>
      <h2>{text}</h2>
      <img src={image} alt={alt} />
    </div>
  )
}

export default Answer