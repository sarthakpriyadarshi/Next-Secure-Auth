export default function ProfilePage({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="font-bold text-2xl">Profile</h1>
            <h2 className="text-white-400 bg-blue-900">{params.id}</h2>
            <p className="text-gray-400">Welcome to your profile page!</p>
            <p className="text-gray-400">Here you can view and edit your profile information.</p>
        </div>
    )
}