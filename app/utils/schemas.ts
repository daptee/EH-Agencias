import * as yup from 'yup'

export const BuyProcessStepOneSchema = yup.object({
  firstName: yup.string().required('El nombre es obligatorio'),
  lastName: yup.string().required('El apellido es obligatorio'),
  birthdayDate: yup.string().required('La fecha de nacimiento es obligatoria'),
  phone: yup.string().required('El teléfono es obligatorio'),
  dniType: yup.string().required('El tipo de DNI es obligatorio'),
  dni: yup.string().required('El DNI es obligatorio'),
  email: yup
    .string()
    .email('El email no es válido')
    .required('El email es obligatorio'),
})

export const BuyProcessStepTwoSchema = yup.object({
  guests: yup.array().of(
    yup.object({
      country: yup.string().required('El país es obligatorio'),
      name: yup.string().required('Nombre requerido'),
      lastName: yup.string().required('Apellido requerido'),
      birthDate: yup.string().required('Fecha requerida'),
      dni: yup.string().required('DNI requerido'),
    }),
  ),
})

export const BuyProcessStepThreeSchema = yup.object({
  country: yup.string().required('El país es obligatorio'),
  postalCode: yup.string().required('El código postal es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),
  locality: yup.string().required('La localidad es obligatoria'),
  estimatedArrival: yup.string().optional(),
  specialComments: yup.string().optional(),
})
