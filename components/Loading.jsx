import React from 'react'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[70vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-[3px] border-t-orange-500 border-neutral-200"></div>
        </div>
    )
}

export default Loading