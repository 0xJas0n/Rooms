"use client";

import {useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import {API_URL} from "@/app/constants";
import {Room} from "@/app/types";
import styles from "./Rooms.module.css";

const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

const getCurrencySymbol = (currencyCode: string) => {
    return (0).toLocaleString("en", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).replace(/\d/g, "").trim();
};

export default function Rooms() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [rooms, setRooms] = useState<Room[] | null>(null);
    const [loading, setLoading] = useState(true);
    const initialPage = Math.max(Number(searchParams.get("page") || "1"), 1) - 1;
    const [page, setPage] = useState(initialPage);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/rooms?page=${page}&size=9`);
                const data = await response.json();
                setRooms(data.nodes);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [page]); // Add `page` to dependency array to prevent infinite re-fetching

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.push(`?page=${newPage + 1}`, {scroll: false});
    };


    if (loading) {
        return <span className={styles.loader}></span>;
    }

    return (
        <div>
            {rooms && rooms.length > 0 ? (
                <div className={styles.roomsGrid}>
                    {rooms.map((room, index) => (
                        <a href={"/" + room.id} className={styles.card} key={index}>
                            <div className={styles.imageContainer}>
                                <img src={room.heroUrl} alt="Room image"/>
                            </div>

                            <div className={styles.cardContent}>
                                <h2>{room.title}</h2>
                                <p>{room.description}</p>
                                <span className={styles.cardInfo}>
                                    {formatDate(room.createdAt)}
                                </span>
                                <span className={styles.cardInfo}>
                                    {getCurrencySymbol(room.pricePerNight.currency) + room.pricePerNight.amount}
                                </span>
                                <span className={styles.cardInfo}>
                                    {room.owner.firstName + " " + room.owner.lastName}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <p>No rooms available</p>
            )}

            <div className={styles.buttonContainer}>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.5 0 26 26">
                        <path fill="#ededed" fillRule="evenodd"
                              d="m5.115 13 9.256-8.4c.831-.83.831-2.17 0-3a2.11 2.11 0 0 0-3.008 0L.596 11.36c-.45.45-.648 1.05-.611 1.64-.037.59.161 1.19.611 1.64l10.767 9.76a2.11 2.11 0 0 0 3.008 0c.831-.83.831-2.17 0-3L5.115 13"/>
                    </svg>
                </button>

                <button onClick={() => handlePageChange(page + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.5 0 26 26">
                        <path fill="#ededed" fillRule="evenodd"
                              d="M14.404 11.36 3.637 1.6a2.11 2.11 0 0 0-3.008 0 2.117 2.117 0 0 0 0 3L9.885 13 .629 21.4a2.117 2.117 0 0 0 0 3c.83.84 2.177.84 3.008 0l10.767-9.76c.45-.45.648-1.05.611-1.64a2.115 2.115 0 0 0-.611-1.64"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
