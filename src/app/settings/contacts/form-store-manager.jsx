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
import { Check, FormTextInputs } from '../_components/form-text-inputs'
import { formStoreManagerSchema } from './form-store-manager-schema'

const fieldsStoreManager = [
  {
    autocomplete: 'name',
    label: 'Contact Name*',
    name: 'managerName',
    type: 'text',
    placeholder: 'John Doe',
    description: 'Enter your name.',
  },
  {
    autocomplete: 'email',
    label: 'Contact Email*',
    name: 'managerEmail',
    type: 'email',
    placeholder: 'contact@email.com',
  },
  {
    description: 'Your phone number will not be exposed to the public.',
    label: 'Mobile Number',
    name: 'managerMobileNumber',
    type: 'tel',
    placeholder: '123 456 7890',
  },
  {
    description: 'Your phone number will not be exposed to the public.',
    label: 'Phone Number',
    name: 'managerPhoneNumber',
    type: 'text',
    placeholder: '123 456 7890',
  },
]

const fieldsCSManager = [
  {
    // description: "This is your public display name.",
    label: 'Manager Name*',
    name: 'CSmanagerName',
    type: 'text',
    placeholder: 'JohnDoe',
  },
  {
    // description: 'Describe your shop in a few words.',
    label: 'Contact Number*',
    name: 'CSmanagerContactNumber',
    type: 'tel',
    placeholder: '123 456 7890',
  },
]

const fieldsFinanceManager = [
  {
    label: 'Finance Manager*',
    name: 'financeManagerName',
    type: 'text',
    placeholder: 'John Doe',
  },
  {
    // description: "This is your public display name.",
    label: 'Manager Email*',
    name: 'financeManagerEmail',
    placeholder: 'contact@email.com',
    type: 'email',
  },
  {
    description: 'Describe your shop in a few words.',
    label: 'Contact Number*',
    name: 'financeManagerNumber',
    type: 'tel',
  },
]
// TODO: contact number
const Header = ({ title, description }) => (
  <CardHeader className="px-0">
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
)

export function FormStoreManager() {
  const form = useForm({
    resolver: zodResolver(formStoreManagerSchema),
    defaultValues: {
      // email: '',
    },
  })
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Card className="mx-auto max-w-screen-xl">
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-6"
          >
            <Header
              title="Store Manager"
              description="Please insert the contact information of the store manager. (phone number will not be exposed to the public)"
            />
            <FormTextInputs fields={fieldsStoreManager} form={form} />

            <br></br>
            <Header
              title="CS Manager"
              description="Please insert the contact information of the store manager. (phone number will not be exposed to the public)"
            />

            <Check
              label="CS Manager"
              name="csManager"
              form={form}
              description="same as store manager"
            />
            <FormTextInputs fields={fieldsCSManager} form={form} />

            <br></br>
            <Header
              title="Finance Manager"
              description="We send the tax information to the respective manager."
            />

            <FormTextInputs fields={fieldsFinanceManager} form={form} />

            <div className="mt-8 flex gap-4">
              <Button type="submit" className="ml-44">
                Save
              </Button>
              <Button type="submit" variant="outline" className="">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
