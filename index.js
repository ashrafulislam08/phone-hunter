const loadAllPhones = async (status, brandName) => {
  document.getElementById("spinner").style.display = "none";
  // console.log(document.getElementById("spinner"));

  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      brandName ? brandName : "iphone"
    }`
  );

  const data = await response.json();
  if (status) {
    displayAllPhone(data.data);
  } else {
    displayAllPhone(data.data.slice(0, 6));
  }
};

const displayAllPhone = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";
  phones.forEach((phone) => {
    const { brand, image, phone_name } = phone;
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src=${image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    `;

    phonesContainer.append(div);
  });
};

const handleShowAll = () => {
  loadAllPhones(true);
};

// loadAllPhones(true, "samsung");

const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  // console.log(document.getElementById("spinner"));
  const searchText = document.getElementById("search-box").value;

  setTimeout(function () {
    loadAllPhones(false, searchText);
  }, 3000);
};
