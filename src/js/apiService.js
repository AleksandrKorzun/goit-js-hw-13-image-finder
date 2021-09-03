
export default class ApiService {
    constructor(){
        this.key = "23179954-204c91e2d20c9745fc8192c94",
        this.page = 1,
        this.query = ""
        
    }
    fetchApi() {
        this.page = 1;
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.key}`
        return fetch(url).then(response=>{
            if (response.ok) return response.json();
            throw new Error('Error fatching data');   
        })
    };
    fetchApiLoadMore() {
        this.page += 1;
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.key}`
        return fetch(url).then(response=>response.json())
    };
}