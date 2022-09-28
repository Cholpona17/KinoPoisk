const getFilms = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
const Search_by_keyword = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
const KEY = '1f994ddd-fafd-4cba-9dde-901d4e9917d2'
const output = document.querySelector('.output')
const input = document.querySelector('#inp')
const btn = document.querySelector('#btn')

const getAllFilms = async () => {
    await fetch(getFilms, {
        method: 'GET',
        headers: {
            'X-API-KEY': KEY,
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => renderFilms(data.items))
        .catch(err => console.log(err))
}

const search = async () => {
    const request = await fetch(Search_by_keyword + input.value, {
        method: 'GET',
        headers: {
            'X-API-KEY': KEY,
            'Content-Type': 'application/json',
        },

    })
    const response = await request.json()
    renderFilms(response.films);
}

const renderFilms = (films) => {
    output.innerHTML = ''
    films.map(el => {
        const card = document.createElement('div')
        card.classList.add('card')
        const img = document.createElement('img')
        img.src = el.posterUrl
        const title = document.createElement('h2')
        title.textContent = el.nameRu
        card.addEventListener('click', () => getFilmById(el?.kinopoiskId || el?.filmId))

        output.append(card)
        card.append(img, title)
    })

}

const getFilmById = async (id) => {
    await fetch(getFilms + id, {
        method: 'GET',
        headers: {
            'X-API-KEY': KEY,
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => renderDetail(data))
        .catch(err => console.log(err))
}

const renderDetail = (film) => {
    // console.log(film);
    output.innerHTML = ''
    const card = document.createElement('div')
    card.classList.add('card')
    const img = document.createElement('img')
    img.src = film.posterUrl
    const title = document.createElement('h2')
    title.textContent = film.nameRu
    const description = document.createElement('details')
    const summary = document.createElement('summary')
    summary.classList.add('style_summary')
    const p = document.createElement('p')
    summary.textContent = 'Описание'
    p.textContent = film.description
    p.classList.add('style_p')
    description.append(summary, p)

    const genres = document.createElement('h2')
    genres.textContent = film.genres.map(el => {
        return `${el.genre}`
    })

    card.append(img, title, description, genres)
    output.append(card)


}


// getFilmById()
btn.addEventListener('click', search)

getAllFilms()













