import { convert } from 'html-to-text'
import _ from 'lodash'
import { SendMailOptions, createTransport } from 'nodemailer'
import previewEmail from 'preview-email'

import { baseUrl, getEnvVar, isDevelopment } from '@/utils/env'

import { partials } from './templates'

const emailTransport = createTransport({
  host: getEnvVar('SMTP_HOST'),
  port: +(process.env.SMTP_PORT ?? 587),
  auth: {
    user: getEnvVar('SMTP_USER'),
    pass: getEnvVar('SMTP_PASS'),
  },
})

const messageDefaults = {
  from: getEnvVar('EMAIL_FROM_ADDR'),
}

const contextDefaults = {
  baseUrl: baseUrl,
}

type SendMailWithTemplateOptions = {
  template: {
    subject: HandlebarsTemplateDelegate
    html: HandlebarsTemplateDelegate
    text?: HandlebarsTemplateDelegate
  }
  messageOpts: Omit<SendMailOptions, 'subject' | 'html' | 'text'>
  renderContext: object
}

export function sendMailWithTemplate({
  template,
  messageOpts,
  renderContext,
}: SendMailWithTemplateOptions) {
  const message = _.merge(messageDefaults, messageOpts) as SendMailOptions
  const context = _.merge(contextDefaults, renderContext)

  message.subject = template.subject(context, { partials: partials })
  message.html = template.html(context, { partials: partials })

  if (template.text) {
    message.text = template.text(context, { partials: partials })
  } else {
    message.text = convert(message.html)
  }

  // In development, just preview the message
  if (isDevelopment) {
    return previewEmail(message)
  }

  return emailTransport.sendMail(message)
}
