import { Link } from "react-router-dom";

type SidebarItemProps = {
    label: string;
    path: string;
    icon: React.ElementType;
    isActive: boolean;
};

function SidebarItem({
    label,
    path,
    icon: Icon,
    isActive,
}: SidebarItemProps) {
    return (
        <Link
            to={path}
            className={`
        flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
        ${isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }
      `}
        >
            <Icon size={20} />

            <span className="font-medium">
                {label}
            </span>
        </Link>
    );
}

export default SidebarItem;