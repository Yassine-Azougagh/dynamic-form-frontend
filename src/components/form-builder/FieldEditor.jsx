import ConditionsEditor from "./ConditionsEditor";
import {
    Field,
    FieldError,
    FieldLabel
} from "/src/components/ui/field";
import {
    Input
} from "/src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "/src/components/ui/select";

const FIELD_TYPES = [
    {label: "text", value: "text"}, 
    {label: "number", value: "number"}, 
    {label: "select", value: "select"}, 
    {label: "radio", value: "radio"}, 
    {label: "checkbox", value: "checkbox"}];

export default function FieldEditor({ form, field, onChange, onDelete, index }) {
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
                <form.Field
              name="type"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Input Type</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id="form-tanstack-select-language"
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectSeparator />
                        {FIELD_TYPES.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />            
            <form.Field
                            name="inputTitle"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Input Title</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder=""
                                            autoComplete="off"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
            <form.Field
                            name="inputPlaceholder"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Input Placeholder</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder=""
                                            autoComplete="off"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
            </div>

            <ConditionsEditor
                form={form}
                conditions={field.conditions}
                onChange={(conds) => update("conditions", conds)}
            />
        </div>
    );
}
