import { NavLinkDetail } from "@/Types/Types";
import {
  LayoutDashboard,
  Users,
  Truck,
  KeySquare,
  NotepadText,
} from "lucide-react";

export const navLinks: NavLinkDetail[] = [
  {
    id: 1,
    label: "لوحة التحكم",
    route: "/dashboard/overview",
    icon: LayoutDashboard,
    visible: ["admin", "user"],
  },
  {
    id: 2,
    label: "المستخدمون",
    route: "/dashboard/users",
    icon: Users,
    visible: ["admin"],
  },
  {
    id: 3,
    label: "السائقين",
    route: "/dashboard/drivers",
    icon: KeySquare,
    visible: ["admin", "user"],
  },
  {
    id: 4,
    label: " شاحنات",
    route: "/dashboard/trucks",
    icon: Truck,
    visible: ["admin", "user"],
  },
  {
    id: 5,
    label: " طابور",
    route: "/dashboard/queuis",
    icon: NotepadText,
    visible: ["admin", "user"],
  },

  // Add more pages as needed
];