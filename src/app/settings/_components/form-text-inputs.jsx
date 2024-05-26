import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as React from 'react'

export const Check = ({ label, name, description = '', form }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="grid grid-cols-[160px_auto] gap-4">
        <FormLabel className="mt-3">{label}</FormLabel>
        <div className="flex gap-2">
          <FormControl>
            <Checkbox {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
)

const TextInputField = ({
  description,
  disabled,
  form,
  label,
  name,
  placeholder,
  type,
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className=" grid grid-cols-[160px_auto] gap-4">
        <FormLabel className="mt-5">{label}</FormLabel>
        <div>
          <FormControl>
            <Input
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              type={type}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </div>
      </FormItem>
    )}
  />
)

export const FormTextInputs = ({ fields, form, disabled }) => (
  <>
    {fields.map((field) => (
      <TextInputField
        // {...{ ...(field?.type ? { type: field.type } : []) }}
        description={field.description || ''}
        form={form}
        key={field.name}
        label={field.label}
        name={field.name}
        placeholder={field.placeholder}
        type={field?.type}
        disabled={disabled}
      />
    ))}
  </>
)
