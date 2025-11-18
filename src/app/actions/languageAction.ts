"use server";
import { cookies } from "next/headers";
export async function setLocale(lang:string) {
    (await cookies()).set("NEXT_LOCALE",lang,{path:"/",maxAge:60*60*24*365});
}
