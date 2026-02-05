import { useState } from "react";
import FieldEditor from "../../components/form-builder/FieldEditor";
import './FormBuilder.css'
export default function FormBuilderPage() {
    const [title, setTitle] = useState("");
    const [fields, setFields] = useState([]);

    const addField = () => {
        setFields([
            ...fields,
            {
                type: "text",
                title: "",
                placeholder: "",
                options: [],
                conditions: {
                    required: false,
                    minLength: null,
                    maxLength: null
                }
            }
        ]);
    };

    const updateField = (index, updatedField) => {
        const copy = [...fields];
        copy[index] = updatedField;
        setFields(copy);
    };

    const removeField = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const saveForm = () => {
        const payload = {
            title,
            schemas: fields
        };
        console.log("FORM PAYLOAD:", payload);
        // call form.service.createForm(payload)
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Form Builder</h1>
                        <p className="text-gray-500">
                            Create dynamic forms with validation rules
                        </p>
                    </div>

                    <button
                        onClick={saveForm}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
                    >
                        Save Form
                    </button>
                </div>

                {/* Form Info Card */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <label className="block text-sm font-medium mb-2">
                        Form Title
                    </label>
                    <input
                        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 input"
                        placeholder="e.g. Job Application Form"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Fields Section */}
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <FieldEditor
                            key={index}
                            index={index}
                            field={field}
                            onChange={(updated) => updateField(index, updated)}
                            onDelete={() => removeField(index)}
                        />
                    ))}
                </div>

                {/* Add Field Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={addField}
                        className="border-2 border-dashed border-blue-400 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
                    >
                        + Add New Field
                    </button>
                </div>
            </div>
        </div>
    );
}
