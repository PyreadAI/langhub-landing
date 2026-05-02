import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/locale";

export default function RootRedirectPage() {
    redirect(`/${DEFAULT_LOCALE}`);
}
