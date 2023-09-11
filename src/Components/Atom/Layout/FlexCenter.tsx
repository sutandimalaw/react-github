import React from 'react'

interface IFlexCenterProps {
    children: React.ReactNode
}   

const FlexCenter:React.FC<IFlexCenterProps>=(props) => {
  return (
    <div className="w-full m-auto flex justify-center items-center">
       {props?.children}
    </div>
  )
}

export default FlexCenter
