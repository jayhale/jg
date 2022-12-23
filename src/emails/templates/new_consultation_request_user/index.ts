import hb from 'handlebars'

import html from './html.hbs'
import subject from './subject.hbs'

export default {
  html: hb.compile(html),
  subject: hb.compile(subject),
}
