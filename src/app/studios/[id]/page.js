import React from 'react'

 async function StudioDetails({params}) {
  const { id } =await params;
  return (
    <div>
      <h1>Studio Details: {id}</h1>
    </div>
  )
}

export default StudioDetails
