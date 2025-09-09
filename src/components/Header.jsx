import PropTypes from "prop-types"

function Header(props) {
  return <header className="header">{props.children}</header>
}

Header.propType = {
  childre: PropTypes.node.isRequired,
}

export default Header
