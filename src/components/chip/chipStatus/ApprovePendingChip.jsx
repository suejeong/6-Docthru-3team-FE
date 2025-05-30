import React from 'react'

function ApprovePendingChip() {
  return (
    <div className='flex items-center justify-center w-16 h-6.5 bg-[#FFFDE7] rounded py-1'>
      <div className='text-[#F2BC00] font-semibold text-[13px] flex items-center'>
        <div>승인 대기</div>
      </div>
    </div>
  )
}

export default ApprovePendingChip