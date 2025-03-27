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
    const isNextDisabled = !rooms || rooms.length < 9;
    const initialSort = searchParams.get("sort") || "createdAt";
    const [sort, setSort] = useState(initialSort);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/rooms?page=${page}&size=9&sort=${sort}`);
                const data = await response.json();
                setRooms(data.nodes);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [page, sort]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.push(`?page=${newPage + 1}&sort=${sort}`, {scroll: false});
    };

    if (loading) {
        return <span className={styles.loader}></span>;
    }

    return (
        <div>
            <div className={styles.filterContainer}>
                <div className={styles.filterWrapper}>
                    <select
                        className={styles.filter}
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            setPage(0);
                            router.push(`?page=1&sort=${e.target.value}`, {scroll: false});
                        }}
                    >
                        <option value="createdAt">Newest First</option>
                        <option value="pricePerNight">Price (Low to High)</option>
                    </select>
                </div>
            </div>

            {rooms && rooms.length > 0 ? (
                <div className={styles.roomsGrid}>
                    {rooms.map((room, index) => (
                        <a href={"rooms/" + room.id} className={styles.card} key={index}>
                            <div className={styles.imageContainer}>
                                <img src={room.heroUrl} alt="Room image"/>
                            </div>

                            <div className={styles.cardContent}>
                                <h2>{room.title}</h2>

                                <p>{room.description}</p>

                                <span className={styles.cardInfo}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path
                                        stroke="#ededed" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 7v5l2.5-1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                                    {formatDate(room.createdAt)}
                                </span>

                                <span className={styles.cardInfo}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path
                                        fill="#ededed"
                                        d="M11.726 17.102a.693.693 0 0 0-.553-.404 3.04 3.04 0 0 1-.611-.134 2.634 2.634 0 0 1-.246-.097l.126-.345c.09.04.182.077.276.11l.004.001.004.001c.303.1.6.151.885.151.286 0 .493-.038.652-.12l.01-.005.009-.006a.735.735 0 0 0 .379-.652.755.755 0 0 0-.454-.699 3.432 3.432 0 0 0-.648-.211 5.428 5.428 0 0 1-.759-.243.996.996 0 0 1-.384-.32c-.098-.133-.147-.334-.147-.597 0-.317.09-.58.273-.8.164-.194.396-.326.708-.4a.699.699 0 0 0 .493-.433.692.692 0 0 0 .53.415c.202.033.388.084.556.154l-.117.338a2.489 2.489 0 0 0-.928-.191c-1 0-1.05.69-1.05.828 0 .3.162.55.444.689l.008.004.008.003c.142.064.345.125.636.193.302.068.554.146.752.233l.004.002.004.002a.925.925 0 0 1 .385.311l.001.003.002.002c.098.127.148.323.148.583 0 .3-.087.554-.266.777-.155.193-.371.326-.662.408a.706.706 0 0 0-.473.449Z"/><path
                                        fill="#ededed"
                                        d="M11.979 18h-.482a.198.198 0 0 1-.195-.2v-.402a.206.206 0 0 0-.182-.204 3.493 3.493 0 0 1-.708-.155 2.673 2.673 0 0 1-.575-.265.19.19 0 0 1-.071-.227l.33-.9a.207.207 0 0 1 .299-.105c.149.084.31.156.48.216.256.085.501.127.736.127.202 0 .346-.022.433-.067a.236.236 0 0 0 .13-.216c0-.11-.058-.191-.174-.246a3.064 3.064 0 0 0-.556-.178 5.852 5.852 0 0 1-.834-.268 1.486 1.486 0 0 1-.581-.477c-.165-.223-.247-.524-.247-.901 0-.437.13-.812.389-1.125.234-.277.557-.465.97-.562a.21.21 0 0 0 .161-.203V11.2c0-.11.087-.2.195-.2h.482c.107 0 .195.09.195.2v.417c0 .102.075.188.173.203.361.058.678.167.952.327a.191.191 0 0 1 .079.229l-.31.897a.203.203 0 0 1-.287.112c-.348-.18-.68-.27-.997-.27-.375 0-.562.11-.562.328 0 .104.055.183.167.238.11.05.294.104.55.164.33.074.607.161.834.26.227.095.422.251.587.47.17.218.254.516.254.893 0 .417-.126.782-.378 1.095-.218.272-.522.463-.909.572a.21.21 0 0 0-.153.2v.465c0 .11-.088.2-.195.2Z"/><path
                                        stroke="#ededed" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M9.592 5h4.222c1.081 0 .488 1.664.05 2.679l-.498 1.164-.068.157c.472-.023.939.11 1.33.382a15.603 15.603 0 0 1 3.498 4.869c.329.68.46 1.445.376 2.2-.1 1.925-1.606 3.459-3.484 3.549h-6.63c-1.878-.087-3.386-1.62-3.488-3.545a4.033 4.033 0 0 1 .376-2.2 15.602 15.602 0 0 1 3.502-4.873A2.145 2.145 0 0 1 10.108 9l-.078-.181-.487-1.14C9.107 6.664 8.51 5 9.593 5Z"
                                        clipRule="evenodd"/><path fill="#ededed"
                                                                  d="M13.298 9.75a.75.75 0 0 0 0-1.5v1.5Zm-3.19-1.5a.75.75 0 0 0 0 1.5v-1.5Zm5.87.4a.75.75 0 0 0-.75-1.3l.75 1.3Zm-2.612.193.144.736h.002l-.146-.736Zm-3.336-.024.155-.734-.006-.001-.149.735ZM8.166 7.344a.75.75 0 0 0-.726 1.312l.726-1.312Zm5.132.906h-3.19v1.5h3.19v-1.5Zm1.93-.9a6.626 6.626 0 0 1-2.01.758l.294 1.47a8.126 8.126 0 0 0 2.466-.928l-.75-1.3Zm-2.007.757a7.585 7.585 0 0 1-3.036-.022l-.31 1.468a9.085 9.085 0 0 0 3.635.026l-.29-1.472Zm-3.042-.023a7.04 7.04 0 0 1-2.013-.74L7.44 8.656a8.542 8.542 0 0 0 2.442.898l.297-1.47Z"/></svg>
                                    {getCurrencySymbol(room.pricePerNight.currency) + " " + room.pricePerNight.amount}
                                </span>

                                <span className={styles.cardInfo}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g
                                        stroke="#ededed" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"><path
                                        d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"/></g></svg>
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

                <button onClick={() => handlePageChange(page + 1)} disabled={isNextDisabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.5 0 26 26">
                        <path fill="#ededed" fillRule="evenodd"
                              d="M14.404 11.36 3.637 1.6a2.11 2.11 0 0 0-3.008 0 2.117 2.117 0 0 0 0 3L9.885 13 .629 21.4a2.117 2.117 0 0 0 0 3c.83.84 2.177.84 3.008 0l10.767-9.76c.45-.45.648-1.05.611-1.64a2.115 2.115 0 0 0-.611-1.64"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
