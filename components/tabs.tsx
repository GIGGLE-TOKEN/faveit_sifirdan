"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import "./tabs.css"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    isProfileOwner?: boolean;
  }
>(({ className, isProfileOwner, ...props }, ref) => {
  // Remove isProfileOwner from props being passed to the primitive
  const { isProfileOwner: _, ...restProps } = props;
  
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "tabs-list-reset flex justify-center space-x-8 border-b border-white/20 bg-transparent px-4 py-1 -mt-4",
        className
      )}
      {...restProps}
    />
  );
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "tabs-trigger-reset px-0 text-white/70 dark:text-[#71767B] data-[state=active]:text-white dark:data-[state=active]:text-white relative",
      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full",
      "after:data-[state=active]:bg-[#7F95EB] dark:data-[state=active]:after:bg-[#1DA1F2]",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "tabs-reset",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
}

