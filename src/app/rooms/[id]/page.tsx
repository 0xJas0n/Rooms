import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Room',
    description: 'Explore different rooms',
};

export default async function RoomDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <div>
            <h1>Room Detail Page</h1>
            <p>Room ID: {id}</p>
        </div>
    );
}
