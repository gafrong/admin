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
      <FormItem className=" grid grid-cols-[160px_auto] gap-4">
        <FormLabel className="mt-5">{label}</FormLabel>
        <div>
          <FormControl>
            <Checkbox {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </div>
      </FormItem>
    )}
  />
)

const TextInputField = ({
  description,
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
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </div>
      </FormItem>
    )}
  />
)

export const FormTextInputs = ({ fields, form }) => (
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
      />
    ))}
  </>
)
