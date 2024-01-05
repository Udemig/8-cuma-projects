import Search from './scripts/search.js';
import Recipe from './scripts/recipe.js';
import {
  ele,
  notify,
  renderLoader,
  renderResults,
} from './scripts/ui.js';
import { categories } from './scripts/constant.js';

// class'ın örneğini oluşturma
const search = new Search();
const recipe = new Recipe();

//! Olay İzleyicileri

// Sayfa yüklenme olayını izler
document.addEventListener('DOMContentLoaded', () => {
  // rastgele kategori seç
  const index = Math.floor(Math.random() * categories.length);

  //   kategorni verilerini al ve erkana bas
  getResults(categories[index]);
});

// Formun gönderilme olayını izler
ele.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  getResults(query);
});

// Sayfa yüklenme olayını izle
window.addEventListener('DOMContentLoaded', controlUrl);

// Url'deki id'nin değişme olayını izle
window.addEventListener('hashchange', controlUrl);

//! Fonksiyonlar
// Arama Sonuçlarını alıp ekrana basar
async function getResults(query) {
  // arama terimi var mı kontrol et
  if (!query.trim()) {
    return notify('Arama terimi giriniz!');
  }

  // loader bas
  renderLoader(ele.result_list);

  try {
    // api'dan veirleri al
    await search.fetchResults(query.trim());

    if (search.results.error) {
      // veri hatalı geldiyse ekrana uyarı bas
      notify('Aradığınız kriterler uygun ürün bulunamadı');

      // loader'ı kaldır
      ele.result_list.innerHTML = '';
    } else {
      // sonuçları ekrana bas
      renderResults(search.results.recipes);
    }
  } catch (err) {
    // hata olursa bildirim ver
    notify('Bir sorun oluştu');
    // loader'ı kaldır
    ele.result_list.innerHTML = '';
  }
}

// Detay veilerini alıp ekrana basar
async function controlUrl() {
  // detayı gösteriilcek ürünün id'sine eriş
  const id = location.hash.slice(1);

  if (id) {
    // yükleniyor bas
    renderLoader(ele.recipe_area);

    // tarif bilgilerini al
    await recipe.getRecipe(id);

    // tarif bilgilerini ekrana bas
    console.log(recipe.info);
  }
}
