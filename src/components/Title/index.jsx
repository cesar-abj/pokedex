import React from 'react'
import PropTypes from 'prop-types'
import { TitleContainer } from './style'

Title.propTypes = {
  HtmlSize: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
}

function Title ({ HtmlSize, text, style, className }) {
  return (
    <TitleContainer
      style={style}
      className={className}>
      <HtmlSize>
        {text}
      </HtmlSize>
    </TitleContainer>
  )
}

export default Title
