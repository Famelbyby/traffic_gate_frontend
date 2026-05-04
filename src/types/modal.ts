import type { Snippet } from "./general";

export type Props = {
    header?: Snippet;
    footerButtons?: Snippet;
    content?: Snippet;
    closeModal: () => void;
}