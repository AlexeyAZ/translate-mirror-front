import gql from 'graphql-tag'

export default {
  GET_ALL_WORDS: gql`
    query GetAllWords {
      getAllWords {
        _id
        text
      }
    }
  `,
  GET_WORD: gql`
    query GetWord($word: String!) {
      getWord(word: $word) {
        _id
        def {
          text
          pos
          ts
          tr {
            _id
            text
            ex {
              _id
              text
              tr {
                text
              }
            }
          }
        }
      }
    }
  `,
}
