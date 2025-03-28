import { Metadata } from 'next';
import CreateRoomForm from '@/components/CreateRoomForm/CreateRoomForm';
import styles from './page.module.css'

export const metadata: Metadata = {
    title: 'Create Room',
    description: 'Create a new room',
};

export default function CreatePage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create a New Room</h1>
            <CreateRoomForm />
        </div>
    );
}