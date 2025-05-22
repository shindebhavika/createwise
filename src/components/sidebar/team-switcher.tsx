import * as React from "react"
import { ChevronsDown,ChevronDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
     
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent   data-[state=open]:text-sidebar-accent-foreground rounded-full border-1 border-blue-900 text-popover-foreground "
            >
             
            
<button
  className="group relative inline-flex items-center justify-center w-[30px] h-[30px] bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full shadow-lg transform scale-100 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
>
  
</button>

              <div className="grid flex-1 text-left text-sm leading-tight">
             
                <span className="truncate text-md font-semibold">{activeTeam.plan}</span>
              </div>
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
           
            
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
