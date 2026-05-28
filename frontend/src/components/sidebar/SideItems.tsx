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
        flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200
        ${isActive
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
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