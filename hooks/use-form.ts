import { useState, ChangeEvent, FormEvent } from 'react'

type FormValues = Record<string, string>

export function useForm<T extends FormValues>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = (onSubmit: (values: T) => void) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(values)
  }

  const setError = (field: keyof T, message: string) => {
    setErrors(prevErrors => ({ ...prevErrors, [field]: message }))
  }

  const clearErrors = () => {
    setErrors({})
  }

  return { values, handleChange, handleSubmit, errors, setError, clearErrors }
}

