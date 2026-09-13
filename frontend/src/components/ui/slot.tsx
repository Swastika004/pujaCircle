import * as React from "react"
import { cn } from "@/lib/utils"

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (React.isValidElement(children)) {
      const child = children as React.ReactElement<any>
      return React.cloneElement(child, {
        ...props,
        ...child.props,
        className: cn(className, child.props.className),
        ref: ref || (child as any).ref,
      } as any)
    }
    return null
  }
)
Slot.displayName = "Slot"
