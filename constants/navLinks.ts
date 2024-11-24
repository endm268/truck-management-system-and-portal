import {
  LayoutDashboard,
  Users,
  Truck,
  KeySquare,
  NotepadText,
  LucideIcon,
} from "lucide-react";

interface NavLinkDetail {
  id: number;
  label: string;
  route: string;
  icon: LucideIcon;
  visible: string[];
}

export const navLinks: NavLinkDetail[] = [
  {
    id: 1,
    label: "لوحة التحكم",
    route: "/dashboard/overview",
    icon: LayoutDashboard,
    visible: ["admin", "financial", "bitah", "jiraar", "matarish"],
  },
  // {
  //   id: 2,
  //   label: "المستخدمون",
  //   route: "/dashboard/users",
  //   icon: Users,
  //   visible: ["admin"],
  // },
  {
    id: 3,
    label: "السائقين",
    route: "/dashboard/drivers",
    icon: KeySquare,
    visible: ["admin", "bitah", "jiraar", "matarish"],
  },
  {
    id: 4,
    label: " شاحنات",
    route: "/dashboard/trucks",
    icon: Truck,
    visible: ["admin", "bitah", "jiraar", "matarish"],
  },
  {
    id: 5,
    label: " طابور",
    route: "/dashboard/queuis",
    icon: NotepadText,
    visible: ["admin", "financial"],
  },

  // Add more pages as needed
];