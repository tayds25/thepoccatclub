import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData, uploadFile, updateWithFile } from "../utils/api";

export default function AdoptMe() {
    const [form, setForm] = useState({
        name: "",
        age: "",
        trait: "",
        gender: "",
        trained: false,
        neutered: false,
        dewormed: false,
        vaccinated: false,
        image: null,
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if (!id) return;
            setIsNew(false);
            try {
                const record = await fetchData(`/adopt/${id}`);
                if (record) {
                    setForm(record);
                } else {
                    console.warn(`Cat with ID ${id} not found`);
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching cat data:", error);
            }
        }
        fetchData();
    }, [params.id, navigate]);

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        // Append form fields to FormData
        formData.append("name", form.name);
        formData.append("age", form.age);
        formData.append("trait", form.trait);
        formData.append("gender", form.gender);
        formData.append("trained", form.trained);
        formData.append("neutered", form.neutered);
        formData.append("dewormed", form.dewormed);
        formData.append("vaccinated", form.vaccinated);

        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            if (isNew) {
                await uploadFile("/adopt", formData);
            } else {
                await updateWithFile(`/adopt/${params.id}`, formData);
            }

            // Reset form and navigate
            setForm({
                name: "",
                age: "",
                trait: "",
                gender: "",
                trained: false,
                neutered: false,
                dewormed: false,
                vaccinated: false,
                image: null,
            });
            navigate("/");
        } catch (error) {
            console.error("Error adding/updating cat:", error);
        }
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">
                {isNew ? "Add a Cat for Adoption" : "Update Cat Details"}
            </h3>
            <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4" encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 border-b border-gray-300 pb-12">
                    <div className="flex flex-col items-center">
                        <label className="block text-sm font-medium text-gray-900">Upload Cat Image</label>
                        <input type="file" name="image" accept="image/*" className="mt-2" onChange={(e) => updateForm({ image: e.target.files[0] })} />
                    </div>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 md:col-span-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} />

                        <label htmlFor="age">Age (in months)</label>
                        <input type="number" name="age" value={form.age} onChange={(e) => updateForm({ age: e.target.value })} />

                        <label htmlFor="trait">Trait / Personality</label>
                        <input type="text" name="trait" value={form.trait} onChange={(e) => updateForm({ trait: e.target.value })} />

                        <label htmlFor="gender">Gender</label>
                        <select name="gender" value={form.gender} onChange={(e) => updateForm({ gender: e.target.value })}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <fieldset className="mt-4">
                            <legend className="text-sm font-medium text-gray-900">Health & Training</legend>
                            <div className="grid gap-2 grid-cols-2">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={form.trained} onChange={(e) => updateForm({ trained: e.target.checked })} />
                                    <span className="ml-2">Trained</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" checked={form.neutered} onChange={(e) => updateForm({ neutered: e.target.checked })} />
                                    <span className="ml-2">Neutered</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" checked={form.dewormed} onChange={(e) => updateForm({ dewormed: e.target.checked })} />
                                    <span className="ml-2">Dewormed</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" checked={form.vaccinated} onChange={(e) => updateForm({ vaccinated: e.target.checked })} />
                                    <span className="ml-2">Vaccinated</span>
                                </label>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <input type="submit" value={isNew ? "Add Cat for Adoption" : "Update Cat Info"} className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 mt-4 cursor-pointer" />
            </form>
        </>
    );
}
