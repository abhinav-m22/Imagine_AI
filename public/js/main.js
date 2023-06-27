var loader = document.getElementById("PRE");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

const popup = document.getElementById("popup");

function closePopUp() {
  popup.classList.remove("open-popup");
}

function openPopUp(text) {
  document.getElementById("text").innerHTML = text;
  popup.classList.add("open-popup");
}

function onSubmit(e) {
  if (window.location.href == "/signup" || window.location.href == "/login") {
    return false;
  }
  e.preventDefault();

  //clearing the message from box after submission:
  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  const API_KEY = document.querySelector("#api-key").value; //API Key, this value can be passed as paramerter in the function as well...

  const apiRegex = /^sk-.+$/;

  let text = "";

  switch (true) {
    case prompt === "":
      text = "Please add some text";
      openPopUp(text);
      return;

    case API_KEY === "":
      text = "Please add your API Key";
      openPopUp(text); //if API Key is not added
      return;

    case !apiRegex.test(API_KEY):
      text = "Please add correct API Key";
      openPopUp(text); //if API Key is not added
      return;
  }

  const response = generateImageRequest(prompt, API_KEY, size);

  //   console.log(response);
}

async function generateImageRequest(prompt, API_KEY, size) {
  try {
    // showLoading()
    showSpinner();

    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        API_KEY,
        size,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // hideLoading();
      removeSpinner();

      errorFromServer = data.error.message;

      console.log(data.error.message);

      throw new Error(`The image was not generated, ${errorFromServer}`);
    }

    //Displaying Image in the Frontend:
    const imageUrl = data.data;
    document.querySelector("#image").src = imageUrl;
    // hideLoading();
    removeSpinner();
  } catch (error) {
    openPopUp(error);
    return error;
  }
}

//Spinner Show and Remove:
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
if (document.querySelector("#image-form") != null)
  document.querySelector("#image-form").addEventListener("submit", onSubmit);
// Surprise Button
const surpriseMePrompts = [
  "an armchair in the shape of an avocado",
  "a surrealist dream-like oil painting by Salvador Dalí of a cat playing checkers",
  "teddy bears shopping for groceries in Japan, ukiyo-e",
  "an oil painting by Matisse of a humanoid robot playing chess",
  "panda mad scientist mixing sparkling chemicals, digital art",
  "a macro 35mm photograph of two mice in Hawaii, they're each wearing tiny swimsuits and are carrying tiny surf boards, digital art",
  "3D render of a cute tropical fish in an aquarium on a dark blue background, digital art",
  "an astronaut lounging in a tropical resort in space, vaporwave",
  "an oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background",
  "a stained glass window depicting a hamburger and french fries",
  "a pencil and watercolor drawing of a bright city in the future with flying cars",
  "a sunlit indoor lounge area with a pool with clear water and another pool with translucent pastel pink water, next to a big window, digital art",
  "a fortune-telling shiba inu reading your fate in a giant hamburger, digital art",
  '"a sea otter with a pearl earring" by Johannes Vermeer',
  "an oil pastel drawing of an annoyed cat in a spaceship",
  "a painting of a fox in the style of Starry Night",
  "a bowl of soup that looks like a monster, knitted out of wool",
  "A plush toy robot sitting against a yellow wall",
  "A synthwave style sunset above the reflecting water of the sea, digital art",
  "Two futuristic towers with a skybridge covered in lush foliage, digital art",
  "A 3D render of a rainbow colored hot air balloon flying above a reflective lake",
  "A comic book cover of a superhero wearing headphones",
  "A centered explosion of colorful powder on a black background",
  "A photo of a Samoyed dog with its tongue out hugging a white Siamese cat",
  "A photo of a white fur monster standing in a purple room",
  "A photo of Michelangelo's sculpture of David wearing headphones djing",
  "A Samurai riding a Horse on Mars, lomography.",
  "A modern, sleek Cadillac drives along the Gardiner expressway with downtown Toronto in the background, with a lens flare, 50mm photography",
  "A realistic photograph of a young woman with blue eyes and blonde hair",
  "A man standing in front of a stargate to another dimension",
  "Spongebob Squarepants in the Blair Witch Project",
  "A velociraptor working at a hotdog stand, lomography",
  "A man walking through the bustling streets of Kowloon at night, lit by many bright neon shop signs, 50mm lens",
  "A BBQ that is alive, in the style of a Pixar animated movie",
  "A futuristic cyborg dance club, neon lights",
  "The long-lost Star Wars 1990 Japanese Anime",
  "A hamburger in the shape of a Rubik’s cube, professional food photography",
  "A Synthwave Hedgehog, Blade Runner Cyberpunk",
  "An astronaut encountering an alien life form on a distant planet, photography",
  "A Dinosaur exploring Cape Town, photography",
  "A Man falling in Love with his Computer, digital art",
  "A photograph of a cyborg exploring Tokyo at night, lomography",
  "Dracula walking down the street of New York City in the 1920s, black and white photography",
  "Synthwave aeroplane",
  "A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm",
  "A Space Shuttle flying above Cape Town, digital art",
];

function surpriseMe() {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  document.getElementById("prompt").value = randomPrompt;
}

const surpriseMeBtn = document.getElementById("surpriseMeBtn");
if (surpriseMeBtn != null) surpriseMeBtn.addEventListener("click", surpriseMe);

//Display Floating In Image cards on Homepage
const cards = document.querySelectorAll(".float-in");
const options = {
  threshold: 0.5,
};

const animateCards = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
};

const observer = new IntersectionObserver(animateCards, options);

cards.forEach((card) => {
  observer.observe(card);
});

// toggle navbar
const nav = document.querySelector("#mainNav");
const toggleNavbar = () => {
  nav.classList.toggle("hide-sm");
};
