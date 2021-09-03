import {error, defaultModules} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import ApiService from "./apiService";
import { markup } from "./markup";
import { refs } from "./refs";

const newApiService = new ApiService()

const onSubmitBtn = (e) => {
    e.preventDefault();
    refs.galleryList.innerHTML = "";
    newApiService.query = e.target.elements.query.value.trim();
    if (newApiService.query) {
        newApiService.fetchApi()
        .then(data => {
            if (data.hits.length) {
                markup(data.hits)
            } else {
                error({text: 'По вашему запросу ничего не найдено',})
            }
        })
        .catch(err=>error({text: `${err}`,}))
    }
};
const onSubmitLoadMore = (e) => {
    e.preventDefault()
    newApiService.fetchApiLoadMore()
    .then(data=>markup(data.hits))
    
};

refs.searchForm.addEventListener('submit', onSubmitBtn);
refs.loadMoreBtn.addEventListener('click', onSubmitLoadMore);