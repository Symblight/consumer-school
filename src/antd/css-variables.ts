import kebabCase from 'lodash/kebabCase'

export const CssColors = {
  primaryColor: '#2469F5',
  linkColor: '#2469F5',
  linkHoverColor: '#2469F5',

  // non antd
  defaultBg: '#f0f0f0',
}

export const CssSizes = {
  fontSizeSmall: '12px',
  fontSizeBase: '15px',

  // non antd
  basicHeight: '40px',
}

export const CssOtherVars = {
  linkDecoration: 'none',
  linkHoverDecoration: 'underline',

  // non antd
  disabledOpacity: '0.75',
}

export const CssVariables = {
  ...CssColors,
  ...CssSizes,
  ...CssOtherVars,
}

function getKebabVariables(variables: Record<string, string>) {
  const entriesKebab = Object.entries(variables).map(([key, value]) => {
    return [kebabCase(key), value]
  })
  return Object.fromEntries(entriesKebab)
}

export const CssVariablesKebabCase = getKebabVariables(CssVariables)
