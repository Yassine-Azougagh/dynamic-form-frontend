"use client"

import {
  Form,
  Frame,
  ListTodo,
  Map,
  PieChart
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import CUSTOM_LOGO from '/icon.png'

// This is sample data.
const data = {
  user: {
    name: "USER",
    email: "m@example.com",
    userAvatar: "/images/user_avatar.png",
    adminAvatar: "/images/admin_avatar.png",
  },
  teams: [
    {
      name: "Dynamic Form",
      logo: CUSTOM_LOGO,
      plan: "Plateform",
    }
  ],
  navMain: [
    {
      title: "Form",
      url: "/admin/forms/list",
      icon: Form,
      isActive: true,
      role: 'ADMIN',
      items: [
        {
          title: "Create",
          url: "/admin/forms/new",
        },
        {
          title: "Liste",
          url: "/admin/forms/list",
        },
      ],
    },
    {
      title: "Submission",
      url: "/admin/responses/list",
      icon: ListTodo,
      role: 'ADMIN',
      items: [
        {
          title: "Liste",
          url: "/admin/responses/list",
        }
      ],
    },
    {
      title: "Form",
      url: "/user/forms/list",
      icon: Form,
      role: 'USER',
      items: [
        {
          title: "Liste",
          url: "/user/forms/list",
        }
      ],
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  setBreadcrumb, user, ...props
}) {
  return (
    < Sidebar collapsible = "icon" {...props }>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} role={user?.role} setBreadcrumb={setBreadcrumb}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} userConnected={user}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar >
  );
}
