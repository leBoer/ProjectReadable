export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
  }
}

function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories.map(category => category.name),
    receivedAt: Date.now()
  }
}

function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories);
    return fetch(`http://localhost:3001/categories`, {
      headers: {
        Authorization: 'something'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
      .catch(json => { console.error(json) })
  };
}

function shouldFetchCategories(categories) {
  if (!categories) {
    return true
  } else if (categories.items.length === 0) {
    return true
  }else if (categories.isFetching) {
    return false
  } else {
    return categories.didInvalidate
  }
}

export function fetchCategoriesIfNeeded(categories) {
  return (dispatch) => {
    if (shouldFetchCategories(categories)) {
      dispatch(fetchCategories(dispatch));
    }
  };
}

