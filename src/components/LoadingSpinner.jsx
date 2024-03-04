import { cn } from '@/lib/utils'
import React from 'react'
import { ClipLoader } from 'react-spinners'

const override = {
  display: 'block',
  margin: '0 auto',
}

const LoadingSpinner = ({ className }) => (
  <div className={cn('flex h-screen items-center justify-center', className)}>
    <ClipLoader color="#000" loading css={override} size={50} />
  </div>
)

const cssButtonSpinner = {
  display: 'block',
  margin: 'auto',
}

export const LoadingSpinnerButton = ({ className }) => (
  <div className={cn('absolute ', className)}>
    <ClipLoader color="#000" cssOverride={cssButtonSpinner} loading size={24} />
  </div>
)

export default LoadingSpinner
