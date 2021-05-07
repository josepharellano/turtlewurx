import {css} from 'styled-components'

const button = css`
  color: var(--green);
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-family: var(--font);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.25rem 1.75rem;
  &:hover,
  &:focus,
  &:active {
    background-color: var(--green-tint);
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
    
    flexBetween: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        `,
    
    button,

};

export default mixins