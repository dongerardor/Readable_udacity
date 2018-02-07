const headers = {
  'Authorization': 'local_user'
}

export const fetchCategories = () => fetch('/categories', { headers });
export const fetchPosts = () => fetch('/posts', { headers });

/*
 return fetch('/trendings', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': Config.token
            },
            credentials: 'same-origin', // you need to add this line
            body: JSON.stringify(data),
        })



export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.book)



export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)
*/