import awsURL from '@/assets/common/awsUrl'
import { IMG } from '@/assets/common/urls'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export const DataTableProductImage = ({ productImage, className = '' }) => {
  const img = productImage ? awsURL + productImage : IMG.empty_product

  return (
    <div
      className={cn('h-12 w-12 overflow-hidden rounded-sm border', className)}
    >
      <Image alt="product image" height={48} src={img} width={48} />
    </div>
  )
}
