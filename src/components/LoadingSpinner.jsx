import { cn } from '@/lib/utils'
import React from 'react'
import { ClipLoader } from 'react-spinners'
import { Button } from './ui/button'

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

export const LoadingSpinnerButton = ({ className, color = '#000' }) => (
  <div className={cn('absolute ', className)}>
    <ClipLoader
      color={color}
      cssOverride={cssButtonSpinner}
      loading
      size={24}
    />
  </div>
)

export const ButtonLoader = ({
  children,
  className,
  isLoading,
  onClick,
  variant = 'default',
  disabled = false,
}) => (
  <Button
    className={cn(className, 'relative')}
    variant={isLoading ? 'outline' : variant}
    onClick={onClick}
    disabled={isLoading || disabled}
  >
    {children}
    {isLoading ?
      <LoadingSpinnerButton />
    : ''}
  </Button>
)

export default LoadingSpinner
