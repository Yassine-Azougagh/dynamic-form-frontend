import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getFormById, updateForm } from "../../services/form.service";

export default function FormEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [schema, setSchema] = useState(null);

    useEffect(() => {
        getFormById(id).then(form => {
            setTitle(form.title);
            setSchema(form.schema);
        });
    }, [id]);

    const handleUpdate = async () => {
        await updateForm(id, { title, schema });
        navigate("/admin/forms");
    };

    if (!schema) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Form</h1>

            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <pre>{JSON.stringify(schema, null, 2)}</pre>

            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}
