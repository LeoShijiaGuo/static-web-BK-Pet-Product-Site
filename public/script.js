
// lets change the slides 
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel .slide');
  console.log('slides');
  let currentSlide = 0;

  // a function to go to the next slide
  function nextSlide() {
    // hide the current image
    slides[currentSlide].style.display = 'none';
    //// next
    currentSlide = (currentSlide + 1) % slides.length;

    /// next slide show
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'block';
  }

  /// interval 
  setInterval(nextSlide, 3500);

  //// hide all show the first
  slides.forEach(slide => slide.style.display = 'none');
  slides[0].style.display = 'block';
});





// the payment section /////////////

let productsData = []; // 
let currentProductSlideIndex = 0; // current product slide index

async function fetchProductsData() {
  productsData = await fetch("./data/products.json").then((response) => response.json());
  showProductSlide(0);
  updateProductInfo(0);
}

function updateProductInfo(index) {
  const product = productsData[index];
  if (!product) return; // if no product data is available, exits
  
  document.getElementById("product-title").textContent = product.title;
  document.getElementById("product-description").textContent = product.description;
  // document.getElementById("product-price").textContent = `$${product.price}`; // no more price for this 
  document.getElementById("product-link").href = product.paymentLink;

  const featuresList = document.getElementById("product-features");
  featuresList.innerHTML = ''; 
  product.highlighted_features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    featuresList.appendChild(li);
  });
}

function showProductSlide(index) {
  const carousel = document.getElementById("carousel");
  carousel.innerHTML = ''; 
  
  const product = productsData[index];
  if (!product) return; // exits if no product data is available
  
  //// new slide
  const img = document.createElement('img');
  img.src = product.imageUrl
  img.style = "border: 50px solid #ffffff; background-color: #ffffff;  width: 700px; height: 700px; object-fit: contain; ";
  carousel.appendChild(img);
}

window.nextImage = () => {
  currentProductSlideIndex = (currentProductSlideIndex + 1) % productsData.length;
  showProductSlide(currentProductSlideIndex);
  updateProductInfo(currentProductSlideIndex);
};

window.previousImage = () => {
  currentProductSlideIndex = (currentProductSlideIndex - 1 + productsData.length) % productsData.length;
  showProductSlide(currentProductSlideIndex);
  updateProductInfo(currentProductSlideIndex);
};

fetchProductsData();



