import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Anchor, Coins, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const meta = {
  component: SidebarProvider,
  parameters: { layout: "fullscreen" },
  args: { defaultOpen: true },
  render: (args) => (
    <SidebarProvider {...args}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <p className="font-serif">Lost Seas</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Captain&apos;s menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { title: "Fleet", icon: Anchor },
                  { title: "Crew", icon: Users },
                  { title: "Finances", icon: Coins },
                ].map(({ title, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton tooltip={title}>
                      <Icon />
                      <span>{title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-4 p-4">
          <SidebarTrigger />
          <h2 className="font-serif text-xl">Captain&apos;s dashboard</h2>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
} satisfies Meta<typeof SidebarProvider>
export default meta
type Story = StoryObj<typeof meta>
export const Expanded: Story = {}
export const Collapsed: Story = { args: { defaultOpen: false } }
