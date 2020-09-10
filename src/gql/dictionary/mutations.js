import gql from 'graphql-tag'

export default {
  ADD_WORD: gql`
    mutation AddWord($word: String!) {
      addWord(word: $word) {
        _id
        text
      }
    }
  `,
}
