import * as React from "react"



import { NavMain } from "../sidebar/nav-main"

import { TeamSwitcher } from "../sidebar/team-switcher"

import {
  Sidebar,
  SidebarContent,
 
  SidebarHeader,
  
} from "../sidebar/sidebar"



// This is sample data.
import { data } from "../../lib/navData"; // adjust the path to your structure


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
    
     
        <p className="text-center text-3xl font-bold m-2">abun</p>
 
     

      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      
      </SidebarContent>
  
    </Sidebar>
  )
}
