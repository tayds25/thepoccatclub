import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Individual Cat Component
const AdoptMe = (props) => (
    <tr className="border-b transition-colors hover:bg-muted/50">
        {/* Cat Image */}
        <td className="p-4 align-middle">
            {props.adopt.image && (
                <img 
                    src={`http://localhost:5050/images/${props.adopt.image}`} 
                    alt={props.adopt.name} 
                    className="h-20 w-20 object-cover rounded"
                />
            )}
        </td>
        {/* Cat Name */}
        <td className="p-4 align-middle">{props.adopt.name}</td>
        {/* Cat Age */}
        <td className="p-4 align-middle">{props.adopt.age} months</td>
        {/* Cat Gender */}
        <td className="p-4 align-middle">{props.adopt.gender}</td>
        {/* Cat Trait */}
        <td className="p-4 align-middle">{props.adopt.trait}</td>
        {/* Cat Health Details */}
        <td className="p-4 align-middle">
            <div className="flex gap-2">
                {props.adopt.trained && <span className="bg-green-500 text-white px-2 py-1 rounded">Trained</span>}
                {props.adopt.neutered && <span className="bg-green-500 text-white px-2 py-1 rounded">Neutered</span>}
                {props.adopt.dewormed && <span className="bg-green-500 text-white px-2 py-1 rounded">Dewormed</span>}
                {props.adopt.vaccinated && <span className="bg-green-500 text-white px-2 py-1 rounded">Vaccinated</span>}
            </div>
        </td>
        {/* Edit & Delete Actions */}
        <td className="p-4 align-middle">
            <div className="flex gap-2">
                <Link
                    className="inline-flex items-center justify-center text-sm font-medium border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                    to={`/edit/${props.adopt._id}`}
                >
                    Edit
                </Link>
                <button
                    className="inline-flex items-center justify-center text-sm font-medium border border-input bg-red-500 text-white hover:bg-red-600 h-9 rounded-md px-3"
                    type="button"
                    onClick={() => props.deleteRecord(props.adopt._id)}
                >
                    Delete
                </button>
            </div>
        </td>
    </tr>
);

// Main Record List Component
export default function AdoptMeList() {
    const [adopt, setAdopt] = useState([]);

    // Fetch records from the database
    useEffect(() => {
        async function getAdopt() {
            const response = await fetch(`http://localhost:5050/adopt/`);
            if (!response.ok) {
                console.error(`Error fetching cats: ${response.statusText}`);
                return;
            }
            const records = await response.json();
            setAdopt(records);
        }
        getAdopt();
    }, []);

    // Delete a cat record
    async function deleteRecord(id) {
        const response = await fetch(`http://localhost:5050/adopt/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error(`Error deleting cat: ${response.statusText}`);
            return;
        }

        setAdopt(adopt.filter((cat) => cat._id !== id));
    }

    // Map records into table rows
    function AdoptMeRows() {
        return adopt.map((adopt) => (
            <AdoptMe adopt={adopt} deleteRecord={deleteRecord} key={adopt._id} />
        ));
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">Available Cats for Adoption</h3>
            <div className="border rounded-lg overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Image</th>
                                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Age</th>
                                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Gender</th>
                                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Trait</th>
                                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Health Details</th>
                                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AdoptMeRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
