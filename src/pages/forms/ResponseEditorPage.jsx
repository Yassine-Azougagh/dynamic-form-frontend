"use client"
import { FieldError, FieldGroup } from "@/components/ui/field"
import { getFormById } from "@/services/form.service"
import { submitFormResponse, validateFormResponse } from "@/services/response.service"
import {
    useForm
} from "@tanstack/react-form"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
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


const customValidators = (isRequired, minLength, maxLength, fieldType) => {
    switch (fieldType) {
        case 'text': return {
            onChange: z
                .string(isRequired)
                .min(minLength)
                .max(maxLength)
        }
        case 'number': return {
            onChange: z
                .number(isRequired, "This field should be a number")
        }
        default: return {
            onChange: isRequired ? z.string().min(1,{message: "One item should be selected at least."}) : z.string()
        }
    }
}

const formSchema = z.object({
    formId: z.string(),
    fields: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            value: z.any()
        }
        ))
});

export default function ResponseEditorPage() {
    const { id } = useParams();
    const [formDto, setFormDto] = useState(null)
    const [conditions, setConditions] = useState(new Map())

    const MIN_VALUE_LENGTH = 3
    const MAX_VALUE_LENGTH = 200

    const form = useForm({
        defaultValues: {
            formId: '',
            fields: []
        },
        onSubmit: async ({ value }) => {
            try {
                console.log("============= Submitting =============")
                console.log(value);
                toast(<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                //         <code className="text-white">{JSON.stringify(value, null, 2)}</code>
                //     </pre>)

                const res = await submitFormResponse(value)
                console.log("create submission response : ", res)
            } catch (error) {
                console.error("Form submission error", error);
                toast.error("Failed to submit the form. Please try again.");
            }
        },
        validators: {
            onChange: formSchema
        }
    })

    function buildValidator(rules) {
        console.log("rules are : ", rules)
        console.log("entering build validator")
        console.log(rules)

        if (!rules) return undefined

        if (rules.required && !value) {
            return 'This field is required'
        }

        if (rules.minLength && value.length < rules.minLength) {
            return `Minimum length is ${rules.minLength}`
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return `Maximum length is ${rules.maxLength}`
        }

        return undefined
    }

    const init = async () => {
        const f = await getFormById(id)

        setFormDto(f)
        form.setFieldValue('formId', f.id)
        f.schema.forEach(field => {
            console.log("ids are : ", field)
            form.setFieldValue('fields', old => [...old, {
                id: field.id,
                title: field.title,
                value: field.type === 'number' ? 0 : ''
            }])



            setConditions((old) => old.set(field.id, field.conditions))
        })

    }
    useEffect(() => {
        init()
    }, [])



    const validateResponse = async () => {
        try {
            const res = await validateFormResponse(formDto?.id)
            console.log("validate responee * ****")
            console.log(res)
        } catch (e) {
            console.error("Exception occured")
            console.error(e)
        }
    }
    return (

        <div className="min-h-screen  p-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-center items-center mb-6 text-center">
                    <div>
                        <h1 className="text-4xl font-bold">{formDto?.title}</h1>
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
                                            formDto && field.state.value.map((_, i) => {
                                                const isRequired = conditions.get(formDto.schema[i].id).required
                                                const maxLength = conditions.get(formDto.schema[i].id).maxLength > 0 ?
                                                    conditions.get(formDto.schema[i].id).maxLength :
                                                    MAX_VALUE_LENGTH
                                                const minLength = isRequired ? MIN_VALUE_LENGTH : conditions.get(formDto.schema[i].id).minLength
                                                const fieldType = formDto.schema[i].type
                                                return (
                                                    <>
                                                        <div className="grid grid-cols-3">
                                                            <label className="font-medium">{formDto.schema[i].title}</label>
                                                            <div className="col-span-2">
                                                                <form.Field
                                                                    key={i}
                                                                    name={`fields[${i}].value`}
                                                                    validators={customValidators(isRequired, minLength, maxLength, fieldType)}
                                                                >
                                                                    {(subField) => {
                                                                        const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                                                        switch (formDto.schema[i].type) {
                                                                            case "text":
                                                                            case "number":
                                                                                return (
                                                                                    <>
                                                                                        <Input
                                                                                            key={`${subField.name}-${i}`}
                                                                                            id={subField.name}
                                                                                            name={subField.name}
                                                                                            type={fieldType}
                                                                                            value={subField.state.value}
                                                                                            onBlur={subField.handleBlur}
                                                                                            onChange={(e) => subField.handleChange(
                                                                                                fieldType === 'text' ? e.target.value : e.target.valueAsNumber
                                                                                            )}
                                                                                            aria-invalid={isInvalid}
                                                                                            autoComplete="off"
                                                                                        />
                                                                                        {/* Display errors */}
                                                                                        {isInvalid && (
                                                                                            <FieldError errors={subField.state.meta.errors} />
                                                                                        )}
                                                                                    </>
                                                                                );

                                                                            case 'radio': return (
                                                                                <div className="flex gap-2">
                                                                                    {formDto.schema[i].options.map((option) => (
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
                                                                                            {/* Display errors */}
                                                                                            {isInvalid && (
                                                                                                <FieldError errors={subField.state.meta.errors} />
                                                                                            )}
                                                                                        </div>
                                                                                    ))}

                                                                                </div>
                                                                            )
                                                                            case 'checkbox': {
                                                                                const values = subField.state.value && subField.state.value.split(",") || []
                                                                                const toggleValue = (val) => {
                                                                                    const nextValue = values.includes(val)
                                                                                        ? values.filter((v) => v !== val)
                                                                                        : [...values, val];
                                                                                    subField.handleChange(nextValue.toString());
                                                                                };

                                                                                return (
                                                                                    <div className="flex gap-2">
                                                                                        {
                                                                                            formDto.schema[i].options.map((option) => (
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
                                                                                        {/* Display errors */}
                                                                                        {isInvalid && (
                                                                                            <FieldError errors={subField.state.meta.errors} />
                                                                                        )}
                                                                                    </div>
                                                                                )


                                                                            }
                                                                            case "select":
                                                                                return (
                                                                                    <>
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
                                                                                                {formDto.schema[i].options.map((option) => (
                                                                                                    <SelectItem
                                                                                                        key={option.title}
                                                                                                        value={option.value}
                                                                                                    >
                                                                                                        {option.title}
                                                                                                    </SelectItem>
                                                                                                ))}
                                                                                            </SelectContent>
                                                                                        </Select>
                                                                                        {/* Display errors */}
                                                                                        {isInvalid && (
                                                                                            <FieldError errors={subField.state.meta.errors} />
                                                                                        )}
                                                                                    </>
                                                                                )

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
                            <Button className='bg-white text-black hover:text-white hover:bg-gray-400' type="submit">Save draft</Button>
                            <Button onClick={validateResponse} type="button">Submit</Button>
                        </div>
                    </FieldGroup>
                </form>
            </div>
        </div >
    )
}