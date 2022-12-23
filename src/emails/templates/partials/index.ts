import hb from 'handlebars'

import attributesList from './attributesList.hbs'
import attributesListItem from './attributesListItem.hbs'
import baseLayout from './baseLayout.hbs'
import button from './button.hbs'
import buttonFallback from './buttonFallback.hbs'
import header from './header.hbs'
import paragraph from './paragraph.hbs'

export default {
  // Layouts
  baseLayout: hb.compile(baseLayout),

  // Partials
  attributesList: hb.compile(attributesList),
  attributesListItem: hb.compile(attributesListItem),
  button: hb.compile(button),
  buttonFallback: hb.compile(buttonFallback),
  header: hb.compile(header),
  paragraph: hb.compile(paragraph),
}
