"use client"
import { FieldGroup } from "@/components/ui/field"
import {
    useForm
} from "@tanstack/react-form"
import { useEffect } from "react"
import {
    toast
} from "sonner"
import {
    z
} from "zod"
import {
    Button
} from "/src/components/ui/button"
import {
    Input
} from "/src/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "/src/components/ui/select"

const mockFormData = {
    title: "User Registration Form",
    fields: [
        {
            id: "field-username",
            inputType: "text",
            inputTitle: "Username",
            inputPlaceholder: "Enter your username",
            required: true,
            minLength: 3,
            maxLength: 20
        },
        {
            id: "field-country",
            inputType: "select",
            inputTitle: "Country",
            required: false,
            minLength: 0,
            maxLength: 0,
            options: [
                { title: "Senegal", value: "SN" },
                { title: "France", value: "FR" },
                { title: "United States", value: "US" }
            ]
        },
        {
            id: "field-color",
            inputType: "radio",
            inputTitle: "favourite color",
            required: true,
            minLength: 0,
            maxLength: 0,
            options: [
                { title: "Blue", value: "blue" },
                { title: "Red", value: "red" },
                { title: "Yellow", value: "yellow" }
            ]
        },
        {
            id: "field-animal",
            inputType: "checkbox",
            inputTitle: "favourite animal",
            required: true,
            minLength: 0,
            maxLength: 0,
            options: [
                { title: "Tiger", value: "tiger" },
                { title: "Rhino", value: "rhino" },
                { title: "Falcon", value: "falcon" }
            ]
        }
    ]
};



const formSchema = z.object({
    fields: z.array(
        z.object({
            id: z.string(),
            value: z.string()
        }
        ))
});

export default function ResponseEditorPage() {


    const form = useForm({
        defaultValues: {
            fields: []
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

    useEffect(() => {
        mockFormData.fields.forEach(field => {
            console.log("ids are : ", field)
            form.setFieldValue('fields', old => [...old, {
                id: field.id,
                value: ''
            }])
        })
    }, [])



    return (

        <div className="min-h-screen  p-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-center items-center mb-6 text-center">
                    <div>
                        <h1 className="text-4xl font-bold">{mockFormData.title}</h1>
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
                        <form.Field name="fields" mode="array">
                            {(field) => {
                                return (
                                    <>
                                        {field.state.value.length > 0 ?
                                            field.state.value.map((_, i) => {
                                                return (
                                                    <>
                                                        <div className="grid grid-cols-3">
                                                            <label className="font-medium">{mockFormData.fields[i].inputTitle}</label>
                                                            <div className="col-span-2">
                                                                <form.Field key={i} name={`fields[${i}].value`}>
                                                                    {(subField) => {
                                                                        const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                                                        switch (mockFormData.fields[i].inputType) {
                                                                            case "text":
                                                                            case "number":
                                                                                return (
                                                                                    <Input
                                                                                        key={`${subField.name}-${i}`}
                                                                                        id={subField.name}
                                                                                        name={subField.name}
                                                                                        type='text'
                                                                                        value={subField.state.value}
                                                                                        onBlur={subField.handleBlur}
                                                                                        onChange={(e) => subField.handleChange(mockFormData.fields[i].inputType === 'text' ?
                                                                                            e.target.value : valueAsNumber)}
                                                                                        aria-invalid={isInvalid}
                                                                                        autoComplete="off"
                                                                                    />
                                                                                );

                                                                            case 'radio': return (
                                                                                <div className="flex gap-2">
                                                                                    {mockFormData.fields[i].options.map((option) => (
                                                                                        <div key={option.title} className="flex gap-2">
                                                                                            <input
                                                                                                key={subField.name}
                                                                                                type="radio"
                                                                                                name={subField.name}
                                                                                                value={option.value}
                                                                                                checked={subField.state.value === option.value}
                                                                                                onChange={(e) => subField.handleChange(e.target.value)}
                                                                                            />
                                                                                            <label>{option.title}</label>
                                                                                        </div>
                                                                                    ))}

                                                                                </div>
                                                                            )
                                                                            case 'checkbox': {
                                                                                const values = subField.state.value.split(",") || []
                                                                                const toggleValue = (val) => {
                                                                                    const nextValue = values.includes(val)
                                                                                        ? values.filter((v) => v !== val)
                                                                                        : [...values, val];
                                                                                    subField.handleChange(nextValue.toString());
                                                                                };

                                                                                return (
                                                                                    <div className="flex gap-2">
                                                                                        {
                                                                                            mockFormData.fields[i].options.map((option) => (
                                                                                                <div key={option.title} className="flex gap-0.5">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id={option.title}
                                                                                                        checked={values.includes(option.value)}
                                                                                                        onChange={() => toggleValue(option.value)}
                                                                                                    />
                                                                                                    <label htmlFor={option.title}>{option.title}</label>
                                                                                                </div>
                                                                                            ))
                                                                                        }
                                                                                    </div>
                                                                                )


                                                                            }
                                                                            case "select":
                                                                                return (
                                                                                    <Select
                                                                                        name={subField.name}
                                                                                        value={subField.state.value}
                                                                                        onValueChange={(e) => subField.handleChange(e)}
                                                                                    >
                                                                                        <SelectTrigger
                                                                                            id="form-tanstack-select-language"
                                                                                            aria-invalid={isInvalid}
                                                                                            className="w-full"
                                                                                        >
                                                                                            <SelectValue />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent position="item-aligned">
                                                                                            <SelectSeparator />
                                                                                            {mockFormData.fields[i].options.map((option) => (
                                                                                                <SelectItem
                                                                                                    key={option.title}
                                                                                                    value={option.value}
                                                                                                >
                                                                                                    {option.title}
                                                                                                </SelectItem>
                                                                                            ))}
                                                                                        </SelectContent>
                                                                                    </Select>)

                                                                            default:
                                                                                return null;
                                                                        }
                                                                    }
                                                                    }
                                                                </form.Field>
                                                            </div>
                                                        </div >
                                                    </>
                                                )
                                            }) :
                                            (
                                                <div>Form is empty !</div>
                                            )
                                        }
                                    </>
                                )
                            }}
                        </form.Field>
                        <div className="grid grid-cols-2 gap-2">
                            <Button type="submit">Submit</Button>
                            <Button className='bg-white text-black hover:text-white hover:bg-gray-400'>Save draft</Button>
                        </div>
                    </FieldGroup>
                </form>
            </div>
        </div >
    )
}