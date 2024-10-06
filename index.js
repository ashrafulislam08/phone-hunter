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
  if (phones.length === 0) {
    document.getElementById("phones-container").innerHTML = "";
    document.getElementById("phones-container").innerHTML = `
      <h2 class="font-bold text-xl ">Result not found! Search new item</h2>
    `;
    return;
  }
  // document.getElementById("phones-container").innerHTML = "";
  const phonesContainer = document.getElementById("phones-container");
  phones.forEach((phone) => {
    const { brand, image, phone_name, slug } = phone;
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
    <p>${slug}</p>
    <div class="card-actions justify-center">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
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

const phoneDetails = async (slugs) => {
  const response = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${slugs}`
  );
  const data = await response.json();
  const { brand, name, slug, image } = data.data;
  const { chipSet, displaySize, memory } = data.data.mainFeatures;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
      <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <p class="text-gray-400 font-semibold mb-3">#${brand}</p>
    <img src="${image}"/>
    <h3 class="text-lg font-bold">${name}</h3>
    <p class="py-4">${slug}</p>
    <div>
      <h2>Features:</h2>
      <ul>
        <li>Chipset: ${chipSet}</li>
        <li>Display: ${displaySize}</li>
        <li>Memory: ${memory}</li>

      </ul>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
  `;
  my_modal_1.showModal();
};

loadAllPhones(false, "iphone");
