import _ from 'lodash'

import { sendMailWithTemplate } from '@/emails'
import {
  newConsultationRequestAdmin,
  newConsultationRequestUser,
} from '@/emails/templates'
import { createConsultationRequestSchema } from '@/schemas/contact'
import { createRouter } from '@/server/createRouter'
import { getEnvVar } from '@/utils/env'

export const contactRouter = createRouter().mutation(
  'create-consultation-request',
  {
    input: createConsultationRequestSchema,
    async resolve({ ctx, input }) {
      // Make the topic string pretty
      const locals = {
        ...input,
        formattedTopic: _.startCase(input.topic),
      }

      // Generate an email to be sent to the user from an email template
      const userEmail = sendMailWithTemplate({
        template: newConsultationRequestUser,
        messageOpts: { to: input.email },
        renderContext: locals,
      })

      // Generate an email to be sent to the administrator from an email template
      const adminEmail = sendMailWithTemplate({
        template: newConsultationRequestAdmin,
        messageOpts: {
          to: getEnvVar('EMAIL_ADMIN_ADDR'),
          replyTo: input.email,
        },
        renderContext: locals,
      })

      // Send both emails
      await Promise.all([userEmail, adminEmail])

      return input
    },
  }
)
