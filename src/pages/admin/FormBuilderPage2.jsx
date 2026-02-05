"use client"
import {
    useForm
} from "@tanstack/react-form"
import {
    zodValidator
} from "@tanstack/zod-form-adapter"
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
    Checkbox
} from "/src/components/ui/checkbox"
import {
    Field,
    FieldError,
    FieldLabel
} from "/src/components/ui/field"
import {
    Input
} from "/src/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "/src/components/ui/select"
const formSchema = z.object({
    title: z.string().min(1),
    type: z.string(),
    inputTitle: z.string().min(1),
    inputPlaceholder: z.string().min(1),
    required: z.unknown(),
    name_7897233564: z.number().min(0),
    name_1451246251: z.number().min(0)
});

export default function MyForm() {
    const form = useForm({
        defaultValues: {
            title: "",
            type: "",
            inputTitle: "",
            inputPlaceholder: "",
            required: false,
            name_7897233564: "",
            name_1451246251: "",
        },
        onSubmit: async ({
                             value
                         }) => {
            try {
                console.log(value);
                toast(
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(value, null, 2)}</code>
          </pre>
                );
            } catch (error) {
                console.error("Form submission error", error);
                toast.error("Failed to submit the form. Please try again.");
            }
        },
        validatorAdapter: zodValidator(),
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

                </div>
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
            className="space-y-6 max-w-3xl mx-auto p-5  bg-white rounded-lg border border-gray-200"
        >
            <Field>
                <FieldLabel htmlFor="title">Form Title</FieldLabel>
                <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Job Application Form"

                    value={form.getFieldValue("title")}
                    onChange={(e) => form.setFieldValue("title", e.target.value)}
                />

                <FieldError />
            </Field>
            <Field>
                <FieldLabel htmlFor="type">Type</FieldLabel>
                <Select
                    name="type"

                    value={form.getFieldValue("type")}
                    onValueChange={(value) => form.setFieldValue("type", value)}
                >
                    <SelectTrigger id="type">
                        <SelectValue placeholder="Select a form type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                </Select>

                <FieldError />
            </Field>
            <Field>
                <FieldLabel htmlFor="inputTitle">Input title</FieldLabel>
                <Input
                    id="inputTitle"
                    name="inputTitle"
                    placeholder=""
                    value={form.getFieldValue("inputTitle")}
                    onChange={(e) => form.setFieldValue("inputTitle", e.target.value)}
                />

                <FieldError />
            </Field>
            <Field>
                <FieldLabel htmlFor="inputPlaceholder">Placeholder</FieldLabel>
                <Input
                    id="inputPlaceholder"
                    name="inputPlaceholder"
                    placeholder=""

                    value={form.getFieldValue("inputPlaceholder")}
                    onChange={(e) => form.setFieldValue("inputPlaceholder", e.target.value)}
                />

                <FieldError />
            </Field>
            <Field className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 w-0">
                <Checkbox
                    id="required"
                    name="required"
                    className="w-0"
                    checked={form.getFieldValue("required")}
                    onCheckedChange={(checked) => form.setFieldValue("required", checked)}
                />
                <div className="space-y-1 leading-none">
                    <FieldLabel htmlFor="required">Required</FieldLabel>

                    <FieldError />
                </div>
            </Field>

            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-6">
                    <Field>
                        <FieldLabel htmlFor="name_7897233564">Minimum Length</FieldLabel>
                        <Input
                            id="name_7897233564"
                            name="name_7897233564"
                            placeholder="enter input minimum length"

                            value={form.getFieldValue("name_7897233564")}
                            onChange={(e) => form.setFieldValue("name_7897233564", e.target.value)}
                        />

                        <FieldError />
                    </Field>
                </div>

                <div className="col-span-6">
                    <Field>
                        <FieldLabel htmlFor="name_1451246251">Maximum Length</FieldLabel>
                        <Input
                            id="name_1451246251"
                            name="name_1451246251"
                            placeholder="enter input maximum length"

                            value={form.getFieldValue("name_1451246251")}
                            onChange={(e) => form.setFieldValue("name_1451246251", e.target.value)}
                        />

                        <FieldError />
                    </Field>
                </div>

            </div>
            <Button type="submit">Submit</Button>
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