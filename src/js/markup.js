import listGallery from "../templates/galleryList"
import { refs } from "./refs"
export function markup (arr) {
    if (arr) {
        refs.galleryList.insertAdjacentHTML('beforeend', listGallery(arr));
    }
    refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      autoScroll()
}
function autoScroll () {
    setTimeout(() => {
        refs.loadMoreBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
    }, 1000);
}