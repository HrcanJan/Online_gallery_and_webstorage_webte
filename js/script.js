var section = document.querySelector("section");
const filter = document.querySelector("#filter");
const backdrop = document.querySelector("#backdrop");
const modal = document.querySelector("#modal");
const storedFilterValue = localStorage.getItem("filter");

backdrop.addEventListener("click", () => {
  backdrop.style.display = "none";
});

filter.value = storedFilterValue;

let sectionStorage = [];

filter.addEventListener("input", event => {
  localStorage.setItem("filter", event.target.value);
  loadImages(event.target.value);
})

const drop = () => {
  
}

const loadImages = (filterString) => {
  section.innerHTML = '';
  sectionStorage = [];
    fetch("img/images.json")
      .then(res => res.json())
      .then(data => {
        data.forEach(image => {
          let des = `${image.description}`;
          if(image.title.indexOf(filterString) != -1 || des.indexOf(filterString) != -1)
          {
            const diva = document.createElement("a");
            diva.setAttribute("href", `./img/${image.filename}`);
            diva.setAttribute("data-lightbox", "myGallery");
            diva.setAttribute("data-title", "Name: " + `${image.filename}` + "<html><br></html>Title: " + `${image.title}` +
            "<html><br></html>Description: " + `${image.description}`);

            const img = document.createElement("img");
            img.src = `./img/${image.filename}`;
            img.height = 200;
            img.width = 200;
            img.style = "object-fit:cover";
            img.style = "border:1px solid black";

            sectionStorage.push(img);
            diva.addEventListener("dragend", drop);
            diva.appendChild(img);

            section.appendChild(diva);
          }
        })
      })
}

loadImages(storedFilterValue === null ? "" : storedFilterValue);

new Sortable(section, {
  animation: 150,
  ghostClass: 'blue-background-class'
});

lightbox.option({
  'resizeDuration': 100,
  'wrapAround': true
})
