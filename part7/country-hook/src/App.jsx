import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const searchName = name.trim().toLowerCase()

    if (!searchName) {
      setCountry(null)
      return
    }

    let cancelled = false

    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${encodeURIComponent(searchName)}`)
        if (!cancelled) {
          setCountry({ data: response.data, found: true })
        }
      } catch (error) {
        if (!cancelled) {
          setCountry({ found: false })
        }
      }
    }

    fetchCountry()

    return () => {
      cancelled = true
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const { data } = country
  const name = data?.name?.common ?? data?.name
  const capital = Array.isArray(data?.capital) ? data.capital.join(', ') : data?.capital
  const flagSrc = data?.flags?.svg ?? data?.flags?.png ?? data?.flag

  return (
    <div>
      <h3>{name}</h3>
      <div>capital {capital}</div>
      <div>population {data?.population}</div>
      {flagSrc && (
        <img src={flagSrc} height='100' alt={`flag of ${name}`}/>
      )}
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
