import Image from 'next/image'

// profile Image
// -------------
export const ImageProfile = ({
  alt = 'profile',
  className = '',
  size,
  src,
}) => (
  <div
    className={`overflow-hidden rounded-full ${className}`}
    style={{ width: size, height: size }}
  >
    <Image
      alt={alt}
      height={size}
      src={src} // Access nested object value
      width={size}
    />
  </div>
)

// document image
// ----------------

export const ImageDocument = ({ size, src, className }) => {
  const sizeClass = size === 144 ? `h-36 w-36` : ''
  return (
    <Image
      alt="document image"
      className={`green object-cover object-center ${sizeClass}`}
      height={size}
      src={src}
      width={size}
    />
  )
}
