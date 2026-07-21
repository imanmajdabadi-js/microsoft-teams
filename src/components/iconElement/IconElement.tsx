import { ElementType, SVGProps } from 'react'

type IconElementProps = SVGProps<SVGSVGElement> & {
  icon: ElementType
}

const IconElement = ({ icon: IconComponent, ...props }: IconElementProps) => {
  return <IconComponent {...props} />
}

export default IconElement
