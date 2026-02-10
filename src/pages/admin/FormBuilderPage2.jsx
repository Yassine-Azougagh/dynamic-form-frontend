"use client"
import FieldEditor from "@/components/form-builder/FieldEditor"
import { FieldGroup } from "@/components/ui/field"
import {
    useForm
} from "@tanstack/react-form"
import { useState } from "react"
import {
    toast
} from "sonner"
import {
    z
} from "zod"
import './FormBuilder.css'
import {
    Button
} from "/src/components/ui/button"
import {
    Field,
    FieldError,
    FieldLabel
} from "/src/components/ui/field"
import {
    Input
} from "/src/components/ui/input"

const formSchema = z.object({
    title: z.string().min(2),
    type: z.string().nonempty("Invalid : must select a type from the list above."),
    inputTitle: z.string().min(2),
    inputPlaceholder: z.string().min(2).optional(),
    required: z.boolean().optional(),
    minLength: z.number().min(0).optional(),
    maxLength: z.number().min(0).optional(),
    options: z.array(z.object({title: z.string(), value: z.string()})).optional()
});

export default function MyForm() {
    const form = useForm({
        defaultValues: {
            title: "",
            type: "",
            inputTitle: "",
            inputPlaceholder: "",
            required: false,
            minLength: 0,
            maxLength: 0,
            options: [{title: '', value: ''}]
        },
        onSubmit: async ({ value }) => {
            try {
                console.log("============= Submitting =============")
                console.log(value);
                toast(<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                //         <code className="text-white">{JSON.stringify(value, null, 2)}</code>
                //     </pre>)
            } catch (error) {
                console.error("Form submission error", error);
                toast.error("Failed to submit the form. Please try again.");
            }
        },
        validators: {
            onChange: formSchema
        }
    })

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
                    minLength: 0,
                    maxLength: 0
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

    return (

        <div className="min-h-screen  p-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-center items-center mb-6 text-center">
                    <div>
                        <h1 className="text-6xl font-bold">Form Builder</h1>
                        <p className="text-gray-500">
                            Create dynamic forms with validation rules
                        </p>
                    </div>

                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-6 max-w-3xl mx-auto p-5  bg-white/40 backdrop-blur-md border border-white/20 shadow-xl rounded-lg"
                >
                    <FieldGroup>
                        <form.Field
                            name="title"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Form Title</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="e.g. Job Application Form"
                                            autoComplete="off"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
                        {/* Fields Section */}
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <FieldEditor
                                    form={form}
                                    key={index}
                                    index={index}
                                    field={field}
                                    onChange={(updated) => updateField(index, updated)}
                                    onDelete={() => removeField(index)}
                                />
                            ))}
                        </div>
                        <Button type="submit">Submit</Button>
                    </FieldGroup>
                </form>
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
    )
}