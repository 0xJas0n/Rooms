import {Metadata} from 'next';
import Rooms from "@/components/Rooms/Rooms";
import styles from "./page.module.css"
import {Suspense} from "react";

export const metadata: Metadata = {
    title: 'Rooms',
    description: 'Explore different rooms',
};

export default function RoomsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Rooms</h1>
            <Suspense>
                <Rooms/>
            </Suspense>
        </div>
    );
}
