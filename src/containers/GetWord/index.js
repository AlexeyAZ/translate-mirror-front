import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, withApollo } from 'react-apollo'
import get from 'lodash/get'

import { Input, Button } from '../../components'

import * as queries from '../../gql/queries'

class GetWord extends Component {
  state = {
    word: '',
    data: [],
  }

  handleInputChange = word => {
    this.setState({ word })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { word } = this.state
    const { client } = this.props
    client
      .query({
        query: queries.dictionary.GET_WORD,
        fetchPolicy: 'network-only',
        variables: {
          word,
        },
      })
      .then(res => {
        console.log(res)
        const data = get(res, 'data.getWord.def', [])
        this.setState({ data })
      })
  }

  renderTable = () => {
    const { data } = this.state
    const optimizeData = data
      .map(entry => {
        const translates = get(entry, 'tr', [])
        const optimizeTranslates = translates.map(translate => {
          const examples = get(translate, 'ex', [])
          if (examples.length > 0) {
            return examples.map((example, index) => {
              const secondRow = index === 0 ? translate.text : null
              return [null, secondRow, example.text]
            })
          }
          return [[null, translate.text, null]]
        })
        return optimizeTranslates.flat().map((item, index) => {
          if (index === 0) item.splice(0, 1, entry.pos)
          return item
        })
      })
      .flat()

    return (
      <table>
        <thead>
          <tr>
            <th>
              <span>Часть речи</span>
            </th>
            <th>
              <span>Перевод</span>
            </th>
            <th>
              <span>Примеры</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {optimizeData.map((row, rowIndex) => (
            <tr key={`row_${rowIndex}`}>
              {row.map((col, colIndex) => (
                <td key={`col_${colIndex}`}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    const { word } = this.state
    return (
      <form onSubmit={this.handleFormSubmit}>
        <Input label="Input word" id="getWord" value={word} onChange={this.handleInputChange} />
        <Button>Get word</Button>
        {this.renderTable()}
      </form>
    )
  }
}

GetWord.propTypes = {
  client: PropTypes.object.isRequired,
}

export default compose(withApollo)(GetWord)
