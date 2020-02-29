import css from 'styled-jsx/css'

export default css`
  h1 {
    color: #2e5689;
    font-family: 'Caesar Dressing', Arial, sans-serif;
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: 0.5rem;
    margin: 2rem 0 1rem 0;
  }

  #location-search {
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgb(216, 216, 216);
    display: inline-flex;
    font-size: 0.875rem;
    height: 2.25rem;
    outline: currentcolor none 0px;
    padding: 0;
    transition: border 0.2s ease 0s;
    width: 320px;
    background-color: #fff;
  }

  #location-search > input {
    background-color: transparent;
    font-size: 1rem;
    display: flex;
    height: 100%;
    width: 100%;
    border: medium none;
    outline: currentcolor none 0px;
    padding: 0 0.5rem 0 0.5rem;
    text-align: center;
  }

  #search-button {
    padding: 0.3em 1em;
    font-size: 1em;
    border-radius: 4px;
    margin: 0.5em;
  }

  .icon {
    font-size: 3rem;
  }

  .icon.reversed {
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1);
  }
`
