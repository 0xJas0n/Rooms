import { Metadata } from 'next';
import CreateRoomForm from '@/components/CreateRoomForm/CreateRoomForm';

export const metadata: Metadata = {
    title: 'Create Room',
    description: 'Create a new room',
};

export default function CreatePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Create a New Room</h1>
            <CreateRoomForm />
        </div>
    );
}