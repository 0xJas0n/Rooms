import {Me} from "@/app/types";
import {API_URL} from "@/app/constants";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.css"

export default async function Navigation() {
    const response = await fetch(`${API_URL}/users/me`);
    const data: Me = await response.json();

    return <nav className={styles.navigation}>
        <ul className={styles.list}>
            <li>
                <Link href={"/rooms"} className={styles.listItem}>Rooms</Link>
            </li>

            <li>
                <Link href={"/create"} className={styles.listItem}>Create</Link>
            </li>
        </ul>

        <div className={styles.profile}>
            <span>{data.firstName + ' ' + data.lastName}</span>
            <Image src={data.portraitUrl} alt="Profile picture" width={40} height={40} />
        </div>
    </nav>;
}