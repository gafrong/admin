'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { FormTextInputs } from '../_components/form-text-inputs'
import { formGeneralSchema } from './form-general-schema'

const fields = [
  {
    autocomplete: 'name',
    label: 'First name*',
    name: 'name',
    type: 'text',
    placeholder: 'John Doe',
    description: 'Enter your first name.',
  },
  {
    // description: "This is your public display name.",
    autocomplete: 'username',
    label: 'Username',
    name: 'username',
    type: 'text',
    placeholder: 'JohnDoe',
  },
  {
    description: 'Describe your shop in a few words.',
    label: 'Shop Description',
    name: 'shopDescription',
    type: 'text',
  },
  {
    label: 'Link',
    name: 'link',
    type: 'text',
  },
  {
    label: 'Brand',
    name: 'brand',
    type: 'text',
  },
]

export function FormGeneral() {
  const form = useForm({
    resolver: zodResolver(formGeneralSchema),
    defaultValues: {
      // name: '',
    },
  })
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Card className="mx-auto max-w-screen-xl">
      <CardHeader>
        <CardTitle>General Info</CardTitle>
        <CardDescription>Start the journey with us today.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-6"
          >
            <FormTextInputs fields={fields} form={form} />

            <div className="flex">
              <Button type="submit" className="ml-44">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
