export default function ConditionsEditor({ conditions, onChange }) {
    const update = (key, value) => {
        onChange({ ...conditions, [key]: value });
    };

    return (
        <div className="mt-3 border-t pt-3">
            <label className="flex items-center gap-2 mb-2">
                <input
                    type="checkbox input"
                    checked={conditions.required}
                    onChange={(e) => update("required", e.target.checked)}
                />
                Required
            </label>

            <div className="flex gap-2">
                <input
                    type="number input"
                    className="border p-2 w-full"
                    placeholder="Min length"
                    value={conditions.minLength ?? ""}
                    onChange={(e) => update("minLength", Number(e.target.value))}
                />

                <input
                    type="number input"
                    className="border p-2 w-full"
                    placeholder="Max length"
                    value={conditions.maxLength ?? ""}
                    onChange={(e) => update("maxLength", Number(e.target.value))}
                />
            </div>
        </div>
    );
}
