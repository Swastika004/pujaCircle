import * as React from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"

const Popover = BasePopover.Root

const PopoverTrigger = BasePopover.Trigger

const PopoverAnchor = BasePopover.Positioner

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Popup> & {
    align?: "start" | "center" | "end"
    sideOffset?: number
    side?: "top" | "bottom" | "left" | "right"
  }
>(({ className, align = "center", side = "bottom", sideOffset = 4, ...props }, ref) => (
  <BasePopover.Portal>
    <BasePopover.Positioner align={align} side={side} sideOffset={sideOffset}>
      <BasePopover.Popup
        ref={ref}
        className={cn(
          "z-50 w-72 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95",
          className
        )}
        {...props}
      />
    </BasePopover.Positioner>
  </BasePopover.Portal>
))
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
