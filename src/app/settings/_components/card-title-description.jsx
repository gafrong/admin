import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const CardTitleDescription = ({ title, description }) => (
  <CardHeader className="pt-12">
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
)
