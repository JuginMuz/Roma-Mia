$(document).ready(() => {
  console.log("DOM fully loaded. Starting initialization...");

  // Initializing all features
  initHamburgerMenu();
  initLanguageDropdown();
  initScrollEffect();
  initSignupTicker();
  initSignupForm();

  initHeroBackground();
  initScrollArrowWithDots();
  initHomePageImageAnimations();

  initDishesData();

  initReservationScrollArrow();
  initReservationPage();
  initMap();
  initWeatherAPI();

  initSplitTypeAnimation();
  initAboutScrollArrow();
  initAboutPageImageAnimations();

  //Confirming functions are is working
  console.log("All features initialized.");
});


//Functions

//Hamburger Menu interactions: appear, dissappear
function initHamburgerMenu() {
  const $menuIcon = $("#hamburger-menu-icon");
  const $sidebar = $("#sidebar");
  const $closeBtn = $("#close-btn");

    //Bypassing if not needed
  if (!$menuIcon.length || !$sidebar.length || !$closeBtn.length) {
      console.warn("Hamburger menu elements not found. Skipping initialization.");
      return;
  }

  const toggleMenu = () => $sidebar.toggleClass("active");
  const closeMenu = () => $sidebar.removeClass("active");

  $menuIcon.on("click", toggleMenu);
  $closeBtn.on("click", closeMenu);
}

//Language Menu dropdown interactions
function initLanguageDropdown() {
  const $dropdownOptions = $(".dropdown-options li");
  const $selectedLanguage = $("#selected-language");

  //Bypassing if not needed
  if (!$dropdownOptions.length || !$selectedLanguage.length) {
      console.warn("Language dropdown elements not found. Skipping initialization.");
      return;
  }

  $dropdownOptions.on("click", function () {
      const selectedLanguage = $(this).text();
      $selectedLanguage.text(selectedLanguage);
  });
}

//Header intereaction: changing the background colour when scrolling after hero section
function initScrollEffect() {
  const $header = $(".header");
  const $hero = $(".hero, .hero-reservation");

  //Bypassing if not needed
  if (!$header.length || !$hero.length) {
      console.warn("Header or hero element not found. Skipping scroll effect initialization.");
      return;
  }

  const heroHeight = $hero.outerHeight();

  $(window).on("scroll", () => {
      $(window).scrollTop() > heroHeight
          ? $header.addClass("scrolled")
          : $header.removeClass("scrolled");
  });
}

//Multipling the content to make it always appear and create an "infinite loop" look
function initSignupTicker() {
  const $signupTicker = $("#signupTicker");
  const $signupContent = $("#signup-content");

  if (!$signupTicker.length || !$signupContent.length) {
      console.warn("Signup ticker or content not found. Skipping signup ticker initialization.");
      return;
  }

  const tickerWidth = $signupTicker.width();
  const contentWidth = $signupContent.width();
  const repeatCount = Math.ceil(tickerWidth / contentWidth) + 1;

  for (let i = 0; i < repeatCount; i++) {
      $signupContent.append($signupContent.html());
  }

  $signupTicker.on("click", () => $("#signupFormOverlay").fadeIn());
}

//Sign up form interactions: appearing, dissapearing and thank you message
function initSignupForm() {
  const $form = $("#signupForm");
  const $overlay = $("#signupFormOverlay");
  const $thankYou = $("#thankYouMessage");

    //Bypassing if not needed
  if (!$form.length || !$overlay.length || !$thankYou.length) {
      console.warn("Signup form elements not found. Skipping signup form initialization.");
      return;
  }

  $form.on("submit", (e) => {
      e.preventDefault();
      $overlay.fadeOut();
      $thankYou.fadeIn().delay(5000).fadeOut();
  });

  $overlay.on("click", (e) => {
      if ($(e.target).is($overlay)) $overlay.fadeOut();
  });
}

//Background home page always changing
function initHeroBackground() {
  const $hero = $(".hero");

    //Bypassing if not needed
  if (!$hero.length) {
      console.warn("Hero element not found. Skipping hero background initialization.");
      return;
  }

  const images = ["media/Back-groundImage.webp", "media/BI-bar.webp", "media/BI-dishes.webp"];
  let currentIndex = 0;

  function changeBackground() {
      currentIndex = (currentIndex + 1) % images.length;
      $hero.css("background-image", `url(${images[currentIndex]})`);
  }

  setInterval(changeBackground, 5000);
  $hero.css("background-image", `url(${images[0]})`);
}

//Interactive visual feature to signal the user to scroll down the page in the home page
function initScrollArrowWithDots() {
  const $scrollArrow = $("#scrollArrow");
  const $nextSection = $(".introduction");

  //Bypassing if not needed
  if (!$scrollArrow.length || !$nextSection.length) {
      console.warn("Scroll arrow or introduction section not found.");
      return;
  }

  gsap.fromTo(
      ".scroll-arrow .dot",
      { y: -20, opacity: 0 }, 
      {
          y: 0, 
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.2, 
          repeat: -1, 
          repeatDelay: 0.5, 
      }
  );

  gsap.fromTo(
      ".scroll-arrow .arrow-down",
      { y: -20, opacity: 0 }, 
      {
          y: 0, 
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          repeat: -1, 
          repeatDelay: 0.5, 
      }
  );

  $scrollArrow.on("click", () => {
      $("html, body").animate(
          {
              scrollTop: $nextSection.offset().top,
          },
          800
      );
  });
}

//Home page images animations with GSAP
function initHomePageImageAnimations() {

//Bypassing if not needed
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP or ScrollTrigger is not loaded.");
      return;
  }

  gsap.registerPlugin(ScrollTrigger);

  $(".featured-images img").each(function () {
      const imgElement = $(this).get(0); 

      gsap.fromTo(
          imgElement,
          { y: 100, opacity: 0 }, 
          {
              y: 0, 
              opacity: 1,
              duration: 2, 
              ease: "power1.out", 
              scrollTrigger: {
                  trigger: imgElement, 
                  start: "top 90%", 
                  end: "top 20%", 
                  scrub: true, 
              },
          }
      );
  });
}

//Menu page interactions: whole menu imported to the html file with JS object, opening and closing of courses
function initDishesData() {
  const menuData = {
    starters: [
      { name: "Moretum", desc: "Creamy herb and cheese spread served with bread. (V)", price: "£6", photo: "media/Starters - Moretum.png"},
      { name: "Ova Spongia ex Lacte", desc: "Sweet and savory, baked custard made with eggs, milk, honey and spices. (V)", price: "£7", photo: "media/Starters - Ova Spongia ex Lacte.png"},
      { name: "Isicia Omentata", desc: "Savory meatballs of beef, pine nuts, peppercorn and herbs, then wrapped in caul fat and baked.", price: "£8", photo: "media/Starters - Isicia Omentata.png"},
    ],
    mains: [
      { name: "Spaghetti cacio e pepe", desc: "Pasta made with a creamy sauce of Pecorino Romano cheese and black pepper. (V)", price: "£13", photo: "media/Mains - Spaghetti cacio e pepe.png"},
      { name: "Spaghetti carbonara", desc: "Rich pasta dish made with guanciale, eggs, Pecorino Romano cheese and black pepper.", price: "£14" , photo: "media/Mains - Spaghetti carbonara.png"},
      { name: "Carciofi alla Romana", desc: "Artichokes braised in olive oil, garlic, mint cooked in a rich tomato sauce until tender. (V)", price: "£20", photo: "media/Mains - Carciofi alla Romana.png"},
      { name: "Saltimbocca alla Romana", desc: "Veal scallop topped with prosciutto and sage, pan-fried in butter and white wine.", price: "£24", photo: "media/Mains - Saltimbocca alla Romana.png"},
    ],
    pizzas: [
      { name: "Margherita", desc: "Tomato sauce, fresh tomato, mozzarella cheese, olive oil, fresh basil. (V)", price: "£11", photo: "media/Pizzas - Margherita.png"},
      { name: "Bufala", desc: "Tomato sauce, mozzarella cheese, bufala cheese, olive oil, fresh basil. (V)", price: "£13", photo: "media/Pizzas - Bufala.png"},
      { name: "Quattro Formaggi", desc: "Tomato sauce, mozzarella cheese, gorgonzola cheese, parmiggiano reggiano cheese, fontina cheese, olive oil. (V)", price: "£16", photo: "media/Pizzas - Formaggi.png"},
      { name: "Diavola", desc: "Tomato sauce, mozzarella cheese, salami, olive oil.", price: "£16", photo: "media/Pizzas - Diavola.png"},
    ],
    desserts: [
      { name: "Gelato", desc: "Fresh made ice cream. Chocolate, strawberry or lemon. (V)", price: "£6", photo: "media/Desserts - Gelato.png"},
      { name: "Maritozzo Romano", desc: "Sweet bread roll, split open and filled with whipped cream flavored with vanilla. (V)", price: "£7", photo: "media/Desserts - Maritozzo.png"},
      { name: "Tiramisù", desc: "Layered treat made with ladyfingers soaked in coffee, mascarpone cream, and cocoa powder. (V)", price: "£8", photo: "media/Desserts - Tiramisu.png"},
    ],
    cocktails: [
      { name: "Bellini", desc: "Classic cocktail made with Prosecco and peach puree, creating a light and fruity concoction.", price: "£9", photo: "media/Cocktails - Bellini.jpeg"},
      { name: "Aperol Spritz", desc: "Refreshing cocktail made with Aperol, Prosecco, soda water and garnished with an orange slice.", price: "£10", photo: "media/Cocktails - Aperol.jpeg" },
      { name: "Negroni Sbagliato", desc: "Variation of the classic Negroni, substituting gin with sparkling wine, brings a bubbly and bittersweet taste.", price: "£10", photo: "media/Cocktails - Negroni.jpeg" },
    ],
    wines: [
      { name: "Cesanese del Piglio DOCG", desc: "Lazio's only DOCG red wine, made from the Cesanese grape. It's known for its intense ruby color, complex aromas of red fruit and spice, and firm tannins.", price: "£10" },
      { name: "Velletri DOC", desc: "This DOC red wine is a blend of Sangiovese, Cesanese, Montepulciano, Merlot, and Ciliegiolo. It's a medium-bodied wine with aromas of red fruit and a touch of spice.", price: "£18" },
      { name: "Frascati Superiore DOCG", desc: "Lazio's most famous white wine, made primarily from Malvasia di Candia and Trebbiano grapes. It's a dry, crisp wine with aromas of citrus and white flowers.", price: "£11" },
      { name: "Est! Est!! Est!!! di Montefiascone DOC", desc: "White wine made from a blend of Trebbiano, Malvasia, and Grechetto grapes. It's a light and refreshing wine with aromas of citrus and white flowers.", price: "£17" },
      { name: "Roma DOC Rosato", desc: "Rosé wine made from a blend of Montepulciano and other local grapes. It's a light and refreshing wine with aromas of red fruit and a touch of spice.", price: "£11" },
    ],
    softDrinks: [
      { name: "San Pellegrino", desc: " ", price: "£3" },
      { name: "Aranciata", desc: " ", price: "£4" },
      { name: "Limonata", desc: " ", price: "£4" },
      { name: "Chinotto", desc: " ", price: "£5" },
    ],
  };

  $(".menu-course").each(function () {
    const courseKey = $(this).data("course");
    const $dishesContainer = $(this).find(".dishes-container");

    if (!menuData[courseKey]) return;

    menuData[courseKey].forEach((dish) => {
        $dishesContainer.append(`
            <div class="dish-item">
                <a href="${dish.photo}" target="_blank" class="dish-name">${dish.name}</a>
                <div class="dish-details">
                    <span class="dish-desc">${dish.desc}</span>
                    <span class="dish-price">${dish.price}</span>
                </div>
            </div>
        `);
    });

    $(this).on("click", () => {
        $dishesContainer.toggle();
        $(this).toggleClass("active");
    });
});
}

//Interactive visual feature to signal the user to scroll down the page in the reservation page
function initReservationScrollArrow() {
  const $scrollArrow = $("#reservationScrollArrow");
  const $nextSection = $(".next-section");

  //Bypassing if not needed
  if (!$scrollArrow.length || !$nextSection.length) {
      console.warn("Scroll arrow or next section not found.");
      return;
  }

  gsap.fromTo(
      ".reservation-arrow .dot",
      { y: -20, opacity: 0 }, 
      {
          y: 0, 
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.2, 
          repeat: -1, 
          repeatDelay: 0.5, 
      }
  );

  gsap.fromTo(
      ".reservation-arrow .arrow-down",
      { y: -20, opacity: 0 }, 
      {
          y: 0, 
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          repeat: -1, 
          repeatDelay: 0.5, 
      }
  );

  $scrollArrow.on("click", () => {
      $("html, body").animate(
          {
              scrollTop: $nextSection.offset().top,
          },
          800
      );
  });
}

//Reservation form interactions: fills the data one at the time by the user, checks for correct data input,
//displays the submit form, displays a message confirmation
function initReservationPage() {
  const $form = $("#reservationForm");

    //Bypassing if not needed
  if (!$form.length) {
      console.warn("Reservation form not found. Skipping reservation page initialization.");
      return;
  }

  const $steps = $(".form-step");
  const $summarySection = $("#summarySection");
  const $thankYouMessageBooking = $("#thankYouMessageBooking");
  const $summaryDetails = $("#summaryDetails");
  const $nextButton = $("#nextButton");
  const $backButton = $("#backButton");
  const $bookingText = $(".booking-text");
  let currentStep = 0;

  if (!$steps.length || !$summarySection.length || !$nextButton.length || !$backButton.length) {
      console.warn("Some reservation elements are missing. Skipping reservation page initialization.");
      return;
  }

  const validateText = (input) => /^[a-zA-Z\s]+$/.test(input.val().trim());

  const populateTimeOptions = () => {
      const $timeInput = $("#time");
      $timeInput.empty();

      for (let hour = 12; hour <= 21; hour++) {
          for (let minutes = 0; minutes < 60; minutes += 30) {
              const time = `${hour}:${minutes.toString().padStart(2, "0")}`;
              const displayTime = `${hour % 12 || 12}:${minutes.toString().padStart(2, "0")} ${
                  hour < 12 ? "AM" : "PM"
              }`;
              $timeInput.append(`<option value="${time}">${displayTime}</option>`);
          }
      }
  };

  $("#date").attr("min", new Date().toISOString().split("T")[0]);

  const showCurrentStep = () => {
      $steps.each((index, step) => {
          $(step).toggleClass("hidden", index !== currentStep);
      });

      $backButton.toggleClass("hidden", currentStep === 0);
      $nextButton.toggleClass("hidden", currentStep >= $steps.length);
  };

  const generateSummary = () => {
      const formData = new FormData($form[0]);
      const summary = `
          First Name: ${formData.get("firstName")}<br>
          Last Name: ${formData.get("lastName")}<br>
          Email: ${formData.get("email")}<br>
          Phone: ${formData.get("phone")}<br>
          Booking Date: ${formData.get("date")}<br>
          Booking Time: ${formData.get("time")}<br>
          Number of Guests: ${formData.get("guests")}<br>
          Special Requests: ${formData.get("requests") || "None"}
      `;
      $summaryDetails.html(summary);

      $backButton.addClass("hidden");
      $nextButton.addClass("hidden");
  };

  $nextButton.on("click", () => {
      const $currentInput = $steps.eq(currentStep).find("input, select, textarea");
      if ($currentInput.length && !$currentInput[0].checkValidity()) {
          $currentInput[0].reportValidity();
          return;
      }

      if ($currentInput.is("#firstName, #lastName") && !validateText($currentInput)) {
          alert("Please enter valid text without numbers or symbols.");
          return;
      }

      if (currentStep < $steps.length - 1) {
          currentStep++;
          showCurrentStep();
      } else {
          generateSummary();
          $steps.eq(currentStep).addClass("hidden");
          $summarySection.removeClass("hidden");
      }
  });

  $backButton.on("click", () => {
      if (currentStep > 0) {
          currentStep--;
          showCurrentStep();
      }
  });

  $("#editButton").on("click", () => {
      $summarySection.addClass("hidden");
      currentStep = $steps.length - 1;
      $steps.eq(currentStep).removeClass("hidden");
      showCurrentStep();
  });

  $form.on("submit", (e) => {
      e.preventDefault();

      $(".reservation-section").addClass("transparent-background");

      $summarySection.hide();

      $thankYouMessageBooking.removeClass("hidden").show();

      $bookingText.hide();

      $form[0].reset();
  });

  populateTimeOptions();
  showCurrentStep();
}

//Map API integration
function initMap() {
  const $mapElement = $("#map");

    //Bypassing if not needed
  if (!$mapElement.length) {
      console.warn("Map element not found. Skipping map initialization.");
      return;
  }

  const map = L.map("map").setView([51.526075, -0.109042], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const marker = L.marker([51.526075, -0.109042]).addTo(map);
  marker.bindPopup("<b>Roma Mia</b>").openPopup();

  marker.on("click", () => {
      window.open(
          `https://www.google.com/maps?q=${marker.getLatLng().lat},${marker.getLatLng().lng}`,
          "_blank"
      );
  });
}

//Weather API integration
function initWeatherAPI() {
  const apiKey = "49a873ef3a5e443599901715243112"; 
  const latitude = 51.526075; 
  const longitude = -0.109042; 
  const $weatherDetails = $("#weather-details");

    //Bypassing if not needed
  if (!$weatherDetails.length) {
      console.warn("Weather details container not found. Skipping weather API initialization.");
      return;
  }

  $.getJSON(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7`
  )
      .done((data) => {
          const forecast = data.forecast.forecastday;
          let weatherDetailsHTML = "<ul>";

          forecast.forEach((day) => {
              const iconUrl = `https:${day.day.condition.icon}`;
              const formattedDate = new Date(day.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
              });

              weatherDetailsHTML += `
              <li class="weather-item">
                  <strong class="weather-date">${formattedDate}</strong>
                  <img src="${iconUrl}" alt="${day.day.condition.text}" class="weather-icon" />
                  <span class="weather-temp">${day.day.avgtemp_c}°C</span>
              </li>`;
          });

          weatherDetailsHTML += "</ul>";
          $weatherDetails.html(weatherDetailsHTML);
      })
      .fail((error) => {
          console.error("Error fetching weather data:", error);
          $weatherDetails.html("<p>Error loading weather data.</p>");
      });
}

//About us hero message transition
function initSplitTypeAnimation() {

  //Checks if GSAP is working
  if (typeof SplitType === "undefined" || typeof gsap === "undefined") {
      console.warn("SplitType or GSAP is not loaded.");
      return;
  }

  const typeSplit = new SplitType("[animate]", {
      types: "lines, words, chars",
      tagName: "span",
  });

  gsap.from("[animate] .line", {
      y: "100%", 
      opacity: 0, 
      duration: 2, 
      ease: "power1.out", 
      stagger: 0.5, 
  });
}

//Interactive visual feature to signal the user to scroll down the page in the about page
function initAboutScrollArrow() {
  const $scrollArrow = $("#aboutScrollArrow");
  const $nextSection = $(".about-history-block");

  // Bypassing if nopt needed
  if (!$scrollArrow.length || !$nextSection.length) {
      console.warn("Scroll arrow or about-history-block not found.");
      return;
  }

  const updateArrowColor = () => {
      const bgColor = $("body").css("background-color");

      // Convert RGB to HEX
      const rgbToHex = (rgb) => {
          const [r, g, b] = rgb.match(/\d+/g).map(Number);
          return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
      };

      const hexColor = rgbToHex(bgColor);
      const isBackgroundWhite = hexColor === "#FFFFFF";

      $scrollArrow.css("--arrow-color", isBackgroundWhite ? "black" : "white");
  };

  updateArrowColor();

  const observer = new MutationObserver(updateArrowColor);
  observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

  gsap.fromTo(
      ".scroll-arrow .dot",
      { y: -20, opacity: 0 }, 
      {
          y: 0, 
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.2, 
          repeat: -1, 
          repeatDelay: 0.5, 
      }
  );

  gsap.fromTo(
      ".scroll-arrow .arrow-down",
      { y: -20, opacity: 0 }, 
      {
          y: 0, 
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          repeat: -1, 
          repeatDelay: 0.5, 
      }
  );

  $scrollArrow.on("click", () => {
      $("html, body").animate(
          {
              scrollTop: $nextSection.offset().top,
          },
          800
      );
  });
}

//About us images animations with GSAP
function initAboutPageImageAnimations() {
  
  //Bypassing if not needed
if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger is not loaded.");
    return;
}

gsap.registerPlugin(ScrollTrigger);

$(".about-image-wrapper img").each(function () {
    const imgElement = $(this).get(0); 

    gsap.fromTo(
        imgElement,
        { y: 100, opacity: 0 }, 
        {
            y: 0, 
            opacity: 1, 
            duration: 4, 
            ease: "power1.out", 
            scrollTrigger: {
                trigger: imgElement, 
                start: "top 90%", 
                end: "top 20%", 
                scrub: true, 
            },
        }
    );
});
}
