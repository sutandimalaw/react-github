import React from 'react'
import IconStar from './Icon'

interface IRepoDetailProps {
  title: string,
  desc?: string,
  rate?: number,
}

const RepoDetail:React.FC<IRepoDetailProps> = (props) => {
  return (
    <div className="w-full rounded border-2 border-radis px-2 flex flex-row justify-between"> 
        <div className='flex flex-col px-2 py-2 gap-2'>
          <span className='text-gray-900 text-base font-bold'>{props?.title}</span>
          <span className='text-gray-900 text-sm'>{props?.desc}</span>
        </div>
        <div className='flex flex-row px-2 py-2 gap-2'>
          <span className='text-gray-900 text-base'>{props?.rate || 0}</span>
         {props?.rate === 0 ? <IconStar className='text-gray-700' color='#C5C6D0' /> : <IconStar className='text-orange-400' color='#fdba74'/>}
        </div>
    </div>
  )
}
export default RepoDetail
