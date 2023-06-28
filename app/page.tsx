import Image from "next/image";
import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";
import App from "./components/App";

const prisma = new PrismaClient();

export default function Home() {
  return <App />;
}
