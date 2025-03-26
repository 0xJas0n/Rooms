"use client";

import {useState, useEffect} from "react";
import {useSelectedLayoutSegment} from "next/navigation";
import {Me} from "@/app/types";
import {API_URL} from "@/app/constants";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.css";

export default function Navigation() {
    const [data, setData] = useState<Me | null>(null);
    const selectedSegment = useSelectedLayoutSegment();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${API_URL}/users/me`);
            const result: Me = await response.json();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                <li>
                    <Link
                        href="/rooms"
                        className={`${styles.listItem} ${selectedSegment === 'rooms' ? styles.active : ''}`}
                    >
                        Rooms
                    </Link>
                </li>

                <li>
                    <Link
                        href="/create"
                        className={`${styles.listItem} ${selectedSegment === 'create' ? styles.active : ''}`}
                    >
                        Create
                    </Link>
                </li>
            </ul>

            {data && (
                <div className={styles.profile}>
                    <span>{data.firstName + ' ' + data.lastName}</span>
                    <Image src={data.portraitUrl} alt="Profile picture" width={40} height={40}/>
                </div>
            )}
        </nav>
    );
}
