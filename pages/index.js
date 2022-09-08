import { useState, useEffect } from "react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Swal from 'sweetalert2'


export default function Home() {

  const [listPoke, setListPoke] = useState([])

  useEffect(() => {
    getListPoke()
  }, [])

  const getPokeItem = async (id) => {
    const res = await fetch(id)

    return await res.json()
  }

  const getListPoke = async () => {

    const res = await fetch("https://pokeapi.co/api/v2/pokemon")


    const { results } = await res.json()

    const completeListPoke = await Promise.all(results.map(({ url }) => getPokeItem(url)))

    setListPoke(completeListPoke)

  }

  const getModal = (name, weight, height, sprites, moves) => {
    Swal.fire({
      title: name,
      html:
        `
        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <div>
          <img 
            class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
            alt="team" 
            src="${sprites.front_default}"
          >
          <img 
            class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
            alt="team" 
            src="${sprites.back_default}"
          >
          </div>
          <div class="flex-grow sm:pl-8">
              <h2 class="title-font font-medium text-lg text-gray-900">Peso: ${weight} Altura: ${height}</h2>
              <h3 class="text-gray-500 mb-3">Movimientos:</h3>
              ${ moves.map( ({move}) => `<p class="mb-4">${move.name}</p>` ).join('')

              }
         
          </div>
        </div>
        `
    })
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pokeapi</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              ..
            </p>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">ID</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Nombre</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Peso</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Altura</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Frontal</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Trasera</th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br" />
                </tr>
              </thead>
              <tbody>
                {
                  listPoke.map(({ id, name, weight, height, sprites, moves }, pokeIndex) => (
                    <tr key={pokeIndex}>
                      <td className="border-t-2 border-gray-200 px-4 py-3" onClick={() => getModal(name, weight, height, sprites, moves)}>{id}</td>
                      <td className="border-t-2 border-gray-200 px-4 py-3" onClick={() => getModal(name, weight, height, sprites, moves)}>{name}</td>
                      <td className="border-t-2 border-gray-200 px-4 py-3" onClick={() => getModal(name, weight, height, sprites, moves)}>{weight}</td>
                      <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900" onClick={() => getModal(name, weight, height, sprites, moves)}>{height}</td>
                      <td className="border-t-2 border-gray-200 w-10 text-center">
                        <img
                          src={sprites.front_default}
                          alt={sprites.front_default}
                          width={500}
                          height={500}
                        />
                      </td>
                      <td className="border-t-2 border-gray-200 w-10 text-center" onClick={() => getModal(name, weight, height, sprites, moves)}>
                        <img
                          src={sprites.back_default}
                          alt={sprites.back_default}
                          width={500}
                          height={500}
                        />
                      </td>
                      <td className="border-t-2 border-gray-200 w-10 pl-3 text-center pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 64 64" width="30px" height="30px"><path d="M 28 6 C 25.791 6 24 7.791 24 10 L 24 12 L 23.599609 12 L 10 14 L 10 17 L 54 17 L 54 14 L 40.400391 12 L 40 12 L 40 10 C 40 7.791 38.209 6 36 6 L 28 6 z M 28 10 L 36 10 L 36 12 L 28 12 L 28 10 z M 12 19 L 14.701172 52.322266 C 14.869172 54.399266 16.605453 56 18.689453 56 L 45.3125 56 C 47.3965 56 49.129828 54.401219 49.298828 52.324219 L 51.923828 20 L 12 19 z M 20 26 C 21.105 26 22 26.895 22 28 L 22 51 L 19 51 L 18 28 C 18 26.895 18.895 26 20 26 z M 32 26 C 33.657 26 35 27.343 35 29 L 35 51 L 29 51 L 29 29 C 29 27.343 30.343 26 32 26 z M 44 26 C 45.105 26 46 26.895 46 28 L 45 51 L 42 51 L 42 28 C 42 26.895 42.895 26 44 26 z" /></svg>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          {/* <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
          </div> */}
        </div>
      </section>
    </div>
  )
}
