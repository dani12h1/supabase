import { API_KEY, ENDPOINT } from "./config.js";

document.querySelector("#post").addEventListener("click", post);
export function get() {
  fetch(ENDPOINT, {
    method: "get",
    headers: {
      apikey: API_KEY,
    },
  })
    .then((e) => e.json())
    .then((data) => {
      const t = document.querySelector("template").content;
      document.querySelector("main").innerHTML = "";
      data.forEach((wine) => {
        const copy = t.cloneNode(true);
        copy.querySelector("h2").textContent = wine.name;
        copy.querySelector("button.delete").addEventListener("click", () => {
          deleteWine(wine.id);
        });
        copy.querySelector("button.update").addEventListener("click", () => {
          patch(wine.id);
        });
        document.querySelector("main").appendChild(copy);
      });
    });
}
get();

export function post() {
  const newWine = {
    name: "Peter's Wine",
    grapes: ["pinor lightblue"],
    year: 1986,
    type: "white",
    origin: {
      country: "Denmark",
      region: "Nordsjælland",
    },
    isGood: true,
  };

  fetch(ENDPOINT, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY,
    },
    body: JSON.stringify(newWine),
  })
    .then((e) => e.json())
    .then((e) => get());
}

//DELETE
export function deleteWine(id) {
  fetch(ENDPOINT + "?id=eq." + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY,
    },
  })
    .then((e) => e.json())
    .then((e) => get());
}

export function patch(id) {
  const updates = {
    name: "Peter's Wine",
    isGood: true,
    type: "red",
  };

  fetch(ENDPOINT + "?id=eq." + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
    },
    body: JSON.stringify(updates),
  })
    .then((e) => e.json())
    .then((e) => get());
}

//Dropdown år
// let dateDropdown = document.getElementById("date-dropdown");

// let currentYear = new Date().getFullYear();
// let earliestYear = 1900;

// while (currentYear >= earliestYear) {
//   let dateOption = document.createElement("option");
//   dateOption.text = currentYear;
//   dateOption.value = currentYear;
//   dateDropdown.add(dateOption);
//   currentYear -= 1;
// }
