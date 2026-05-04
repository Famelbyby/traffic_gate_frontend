export type Props = {
    selectedItem: string;
    items: string[];
    changeItem: (nextItem: string) => void;
}

export type DropdownItem = {
    title: string;
    isActive?: boolean;
    onClick: () => void;
}