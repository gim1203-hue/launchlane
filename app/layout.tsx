import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const sans=Geist({variable:"--sans",subsets:["latin"]}); const mono=Geist_Mono({variable:"--mono",subsets:["latin"]});
export const metadata:Metadata={title:"LaunchLane | Turn ideas into momentum",description:"A practical four-week project launch planner."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>}
