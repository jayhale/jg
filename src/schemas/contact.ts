import z from 'zod'

export const createConsultationRequestSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Please provide your first name')
    .max(100, 'Max length for first name is 100 characters'),
  lastName: z
    .string()
    .min(1, 'Please provide your last name')
    .max(100, 'Max length for last name is 100 characteres'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().max(12).optional(),
  topic: z.enum(
    ['offerNegotiation', 'raisePromotion', 'alternatives', 'other'],
    { invalid_type_error: 'Please select a topic' }
  ),
  comments: z.string().max(300).optional(),
})

export type CreateConsultationRequestInput = z.TypeOf<
  typeof createConsultationRequestSchema
>
