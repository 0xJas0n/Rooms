import Image from "next/image";
import styles from "./not-found.module.css";

export default function Custom404() {
    return <div className={styles.container}>
        <h1>Error 404</h1>
        <Image src={"/error404.gif"} alt={"404 gif"} width={400} height={400}></Image>
    </div>
}