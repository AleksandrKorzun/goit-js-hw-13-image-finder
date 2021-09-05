import {error, defaultModules} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import ApiService from "./apiService";
import { markup } from "./markup";
import { refs } from "./refs";

const newApiService = new ApiService();
refs.loadMoreBtn.disabled = true;

const onSubmitBtn = (e) => {
    e.preventDefault();
    refs.galleryList.innerHTML = "";
    newApiService.query = e.target.elements.query.value.trim();
    if (newApiService.query) {
        newApiService.fetchApi()
        .then(data => {
            if (data.hits.length === 12) {
                markup(data.hits)
                refs.loadMoreBtn.disabled = false;
            } else if (data.hits.length < 12 && data.hits.length)  {
                markup(data.hits);
                refs.loadMoreBtn.disabled = true;
                error({text: 'По вашему запросу больше нет картинок',})
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
    .then(data=> {
        if (data.hits.length) {
            markup(data.hits)
        } else {
            refs.loadMoreBtn.disabled = true;
            error({text: 'По вашему запросу больше нет картинок',})
        }
    })
    
};

refs.searchForm.addEventListener('submit', onSubmitBtn);
refs.loadMoreBtn.addEventListener('click', onSubmitLoadMore);