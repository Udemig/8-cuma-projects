export default class Recipe {
  constructor() {
    // tarif hakkındaki bilgiler
    this.info = {};
  }

  // api'dan tarif bilgilerini alan method
  async getRecipe(id) {
    // id'sine göre tarif detayını al
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );

    // verileri işle
    const data = await res.json();

    // bilgileri class'a tanımlama
    this.info = data.recipe;
  }
}
