/*
 * EDIT YOUR WEDDING DETAILS HERE.
 * Leave a value blank ("") to keep the polished "coming soon" state.
 */
const WEDDING = {
  date: "", // Example: "2027-09-18T16:00:00-04:00"
  dateDisplay: "", // Example: "SEPTEMBER 18, 2027"
  location: "", // Example: "LONG ISLAND, NEW YORK"
  story: "",
  ceremony: { time: "", venue: "", address: "", mapUrl: "" },
  reception: { time: "", venue: "", address: "", mapUrl: "" },
  dressCode: "Formal Attire",
  dressNote: "",
  travelCopy: "",
  hotelUrl: "",
  thingsToDoUrl: "",
  rsvpCopy: "",
  rsvpUrl: "",
  rsvpDeadline: "", // Example: "Please reply by August 1, 2027"
  registryCopy: "",
  registryUrl: ""
};

const $ = (selector) => document.querySelector(selector);
const setText = (selector, value) => { if (value && $(selector)) $(selector).textContent = value; };
const setLink = (selector, url, label) => {
  const el = $(selector);
  if (!el || !url) return;
  el.href = url;
  el.removeAttribute("aria-disabled");
  if (label) el.firstChild.textContent = label + " ";
};

setText("[data-wedding-date-display]", WEDDING.dateDisplay);
setText("[data-wedding-location]", WEDDING.location);
setText("[data-story]", WEDDING.story);
setText("[data-ceremony-time]", WEDDING.ceremony.time);
setText("[data-reception-time]", WEDDING.reception.time);
setText("[data-dress-code]", WEDDING.dressCode);
setText("[data-dress-note]", WEDDING.dressNote);
setText("[data-travel-copy]", WEDDING.travelCopy);
setText("[data-rsvp-copy]", WEDDING.rsvpCopy);
setText("[data-rsvp-deadline]", WEDDING.rsvpDeadline);
setText("[data-registry-copy]", WEDDING.registryCopy);

const venueText = (item) => [item.venue, item.address].filter(Boolean).join("\n");
const ceremonyVenue = venueText(WEDDING.ceremony);
const receptionVenue = venueText(WEDDING.reception);
if (ceremonyVenue) $("[data-ceremony-venue]").innerText = ceremonyVenue;
if (receptionVenue) $("[data-reception-venue]").innerText = receptionVenue;
setLink("[data-ceremony-map]", WEDDING.ceremony.mapUrl);
setLink("[data-reception-map]", WEDDING.reception.mapUrl);
setLink("[data-hotel-link]", WEDDING.hotelUrl);
setLink("[data-things-link]", WEDDING.thingsToDoUrl);
setLink("[data-rsvp-link]", WEDDING.rsvpUrl, "RSVP now");
setLink("[data-registry-link]", WEDDING.registryUrl);

const menuButton = $(".menu-button");
const nav = $("#site-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

if (WEDDING.date) {
  const weddingTime = new Date(WEDDING.date).getTime();
  const fields = {
    days: $("[data-days]"), hours: $("[data-hours]"),
    minutes: $("[data-minutes]"), seconds: $("[data-seconds]")
  };
  const updateCountdown = () => {
    const distance = weddingTime - Date.now();
    if (distance <= 0) {
      $("[data-countdown]").innerHTML = "<p>Today is the day!</p>";
      $("[data-countdown-note]").textContent = "Let’s celebrate Phil & Kat.";
      return;
    }
    fields.days.textContent = Math.floor(distance / 86400000);
    fields.hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
    fields.minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
    fields.seconds.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
}