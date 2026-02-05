import ConditionsEditor from "./ConditionsEditor";
const FIELD_TYPES = ["text", "number", "select", "radio", "checkbox"];

export default function FieldEditor({ field, onChange, onDelete, index  }) {
    const update = (key, value) => {
        onChange({ ...field, [key]: value });
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">
                    Field #{index + 1}
                </h3>
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700"
                >
                    Remove
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Type</label>
                    <select
                        value={field.type}
                        onChange={(e) => update("type", e.target.value)}
                        className="border rounded-lg p-2 w-full"
                    >
                        {FIELD_TYPES.map((t) => (
                            <option key={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-sm font-medium">Title</label>
                    <input
                        className="border rounded-lg p-2 w-full input"
                        value={field.title}
                        onChange={(e) => update("title", e.target.value)}
                    />
                </div>

                <div className="col-span-2">
                    <label className="text-sm font-medium">Placeholder</label>
                    <input
                        className="border rounded-lg p-2 w-full input"
                        value={field.placeholder}
                        onChange={(e) => update("placeholder", e.target.value)}
                    />
                </div>

                {(field.type !== "text" || field.type !== "number") && (
                    <div className="col-span-2 mt-4">
                        <label className="text-sm font-medium mb-2 block">
                            Options
                        </label>

                        <div className="space-y-2">
                            {field.options.map((opt, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input
                                        className="border rounded-lg p-2 w-full input"
                                        placeholder={`Option ${i + 1}`}
                                        value={opt}
                                        onChange={(e) => {
                                            const newOptions = [...field.options];
                                            newOptions[i] = e.target.value;
                                            onChange({ ...field, options: newOptions });
                                        }}
                                    />

                                    <button
                                        onClick={() => {
                                            const newOptions = field.options.filter((_, idx) => idx !== i);
                                            onChange({ ...field, options: newOptions });
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() =>
                                onChange({
                                    ...field,
                                    options: [...field.options, ""]
                                })
                            }
                            className="mt-3 text-blue-600 hover:text-blue-800 text-sm"
                        >
                            + Add option
                        </button>
                    </div>
                )}

            </div>

            <ConditionsEditor
                conditions={field.conditions}
                onChange={(conds) => update("conditions", conds)}
            />
        </div>
    );
}
