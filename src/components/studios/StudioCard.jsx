import Link from "next/link";
const StudioCard = ({studio}) => {
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm">
            {/* Studio Image */}
            <img src={studio.image} alt={studio.title} className="w-full h-52 object-cover" />

            {/* Studio Information */}
            <div className="p-4">
                <h2 className="text-xl font-bold">{studio.title}</h2>

                <p className="text-gray-500">{studio.category}</p>

                <p className="mt-2">📍 {studio.location}</p>

                <p className="mt-2 font-semibold">৳ {studio.hourlyRate} / hour</p>

                <p className="mt-1">⭐ {studio.rating}</p>

                <Link href={`/studios/${studio._id}`} className="btn btn-primary w-full mt-4">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default StudioCard;
