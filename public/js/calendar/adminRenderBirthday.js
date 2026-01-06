import { getArr, saveChanges } from "../api.js";
import { svgCancelRed, svgPencil } from "../svg.js";
import { monthArr, workBirthday } from "./adminAddEvents.js";

export function createModalChange(item, arr) {
  const birthday = new Date(item.birthday);
  const birthDate = birthday.getDate() + 1;
  const birthMonth = Number(birthday.getMonth());
  const birthYear = birthday.getFullYear();

  const modal = document.createElement("div"),
    modalContent = document.createElement("div"),
    modalTitle = document.createElement("h4"),
    modalForm = document.createElement("form"),
    formInputsWrap = document.createElement("div"),
    inputPostWrap = document.createElement("div"),
    inputPostInput = document.createElement("input"),
    inputPostLabel = document.createElement("label"),
    inputRankWrap = document.createElement("div"),
    inputRankInput = document.createElement("input"),
    inputRankLabel = document.createElement("label"),
    inputSurnameWrap = document.createElement("div"),
    inputSurnameInput = document.createElement("input"),
    inputSurnameLabel = document.createElement("label"),
    inputFirstnameWrap = document.createElement("div"),
    inputFirstnameInput = document.createElement("input"),
    inputFirstnameLabel = document.createElement("label"),
    inputLastnameWrap = document.createElement("div"),
    inputLastnameInput = document.createElement("input"),
    inputLastnameLabel = document.createElement("label"),
    inputBirthdayWrap = document.createElement("div"),
    inputBirthdayInput = document.createElement("input"),
    // inputBirthdayLabel = document.createElement("label"),
    modalBtnWrap = document.createElement("div"),
    modalExitBtn = document.createElement("button"),
    modalSaveBtn = document.createElement("button"),
    modalCloseBtn = document.createElement("button");

  modal.classList.add("modal");
  modalContent.classList.add("modal-content", "modal-content__birth-change");
  modalTitle.classList.add("birth__change-title");

  modalForm.classList.add("modal-change__form");
  formInputsWrap.classList.add("modal-change__form-wrap");
  inputPostWrap.classList.add("form__input-wrap");
  inputPostInput.classList.add("form__input-input");
  inputPostLabel.classList.add("form__input-label");
  inputRankWrap.classList.add("form__input-wrap");
  inputRankInput.classList.add("form__input-input");
  inputRankLabel.classList.add("form__input-label");
  inputSurnameWrap.classList.add("form__input-wrap");
  inputSurnameInput.classList.add("form__input-input");
  inputSurnameLabel.classList.add("form__input-label");
  inputFirstnameWrap.classList.add("form__input-wrap");
  inputFirstnameInput.classList.add("form__input-input");
  inputFirstnameLabel.classList.add("form__input-label");
  inputLastnameWrap.classList.add("form__input-wrap");
  inputLastnameInput.classList.add("form__input-input");
  inputLastnameLabel.classList.add("form__input-label");
  inputBirthdayWrap.classList.add("form__input-wrap");
  inputBirthdayInput.classList.add("modal-change__input-date");
  modalBtnWrap.classList.add("modal-change__btn-wrap");
  modalExitBtn.classList.add("modal-change__btn-exit", "btn-reset");
  modalSaveBtn.classList.add("modal-change__btn-save", "btn-reset");
  modalCloseBtn.classList.add("modal-change__btn-close", "btn-reset");

  modalTitle.textContent = "Изменение данных пользователя";
  modalExitBtn.innerHTML = svgCancelRed;
  modalSaveBtn.textContent = "Сохранить";
  modalCloseBtn.textContent = "Отмена";

  modalSaveBtn.type = "submit";

  inputPostInput.id = "birth-post";
  inputRankInput.id = "birth-rank";
  inputSurnameInput.id = "birth-surname";
  inputFirstnameInput.id = "birth-firstname";
  inputLastnameInput.id = "birth-lastname";
  inputBirthdayInput.id = "birth-date";
  inputPostInput.placeholder = "";
  inputRankInput.placeholder = "";
  inputSurnameInput.placeholder = "";
  inputFirstnameInput.placeholder = "";
  inputLastnameInput.placeholder = "";

  inputPostLabel.setAttribute("for", "birth-post");
  inputRankLabel.setAttribute("for", "birth-rank");
  inputSurnameLabel.setAttribute("for", "birth-surname");
  inputFirstnameLabel.setAttribute("for", "birth-firstname");
  inputLastnameLabel.setAttribute("for", "birth-lastname");
  inputBirthdayInput.type = "date";

  inputPostLabel.textContent = "Должность";
  inputRankLabel.textContent = "Звание";
  inputSurnameLabel.textContent = "Фамилия";
  inputFirstnameLabel.textContent = "Имя";
  inputLastnameLabel.textContent = "Отчество";
  inputBirthdayInput.value = new Date(birthYear, birthMonth, birthDate)
    .toISOString()
    .split("T")[0];

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  if (item.post === inputPostLabel.textContent) {
    inputPostInput.value = "";
  } else inputPostInput.value = item.post;

  if (item.rank === inputRankLabel.textContent) {
    inputRankInput.value = "";
  } else inputRankInput.value = item.rank;

  if (item.surname === inputSurnameLabel.textContent) {
    inputSurnameInput.value = "";
  } else inputSurnameInput.value = item.surname;

  if (item.firstname === inputFirstnameLabel.textContent) {
    inputFirstnameInput.value = "";
  } else inputFirstnameInput.value = item.firstname;

  if (item.lastname === inputLastnameLabel.textContent) {
    inputLastnameInput.value = "";
  } else inputLastnameInput.value = item.lastname;

  modalSaveBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    for (const person of arr) {
      if (person.id === item.id) {
        person.post =
          inputPostInput.value.trim().charAt(0).toUpperCase() +
          inputPostInput.value.trim().slice(1);
        person.rank = inputRankInput.value.trim().toLowerCase();
        person.surname =
          inputSurnameInput.value.trim().charAt(0).toUpperCase() +
          inputSurnameInput.value.trim().slice(1).toLowerCase();
        person.firstname =
          inputFirstnameInput.value.trim().charAt(0).toUpperCase() +
          inputFirstnameInput.value.trim().slice(1).toLowerCase();
        person.lastname =
          inputLastnameInput.value.trim().charAt(0).toUpperCase() +
          inputLastnameInput.value.trim().slice(1).toLowerCase();
        person.birthday = inputBirthdayInput.value;
      }
    }
    await saveChanges("../script/calendar/saveBirthday.php", arr);
    modal.style.display = "none";
    const birthArr = await getArr("../json/birthdays.json");

    renderBirthDay(birthArr, document.querySelector(".table-tbody"));
  });

  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    for (const person of arr) {
      if (person.id === item.id) {
        person.post = inputPostInput.value;
        person.rank = inputRankInput.value;
        person.surname = inputSurnameInput.value;
        person.firstname = inputFirstnameInput.value;
        person.lastname = inputLastnameInput.value;
        person.birthday = inputBirthdayInput.value;
      }
    }
    await saveChanges("../script/calendar/saveBirthday.php", arr);
    modal.style.display = "none";
    const birthArr = await getArr("../json/birthdays.json");

    renderBirthDay(birthArr, document.querySelector(".table-tbody"));
  });

  modalCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
  });

  modalExitBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.keyCode === 27) {
      modal.style.display = "none";
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });

  inputPostWrap.append(inputPostInput, inputPostLabel);
  inputRankWrap.append(inputRankInput, inputRankLabel);
  inputSurnameWrap.append(inputSurnameInput, inputSurnameLabel);
  inputFirstnameWrap.append(inputFirstnameInput, inputFirstnameLabel);
  inputLastnameWrap.append(inputLastnameInput, inputLastnameLabel);
  inputBirthdayWrap.append(inputBirthdayInput);

  formInputsWrap.append(
    inputPostWrap,
    inputRankWrap,
    inputSurnameWrap,
    inputFirstnameWrap,
    inputLastnameWrap,
    inputBirthdayWrap
  );
  modalBtnWrap.append(modalSaveBtn, modalCloseBtn);
  modalForm.append(formInputsWrap, modalBtnWrap);
  modalContent.append(modalTitle, modalForm, modalExitBtn);
  modal.append(modalContent);
  document.body.append(modal);

  inputPostInput.focus();
  modalContent.addEventListener("click", (event) => {
    for (const label of modalContent.getElementsByTagName("label")) {
      if (event.target === label) {
        label.previousElementSibling.focus();
      }
    }
  });

  return { modalForm };
}

export function renderBirthDay(arr, parentElement) {
  parentElement.innerHTML = "";
  let count = 0;
  for (const item of arr) {
    count++;
    renderBirthItem(item, parentElement, count, arr);
  }
}

export function renderBirthItem(item, parentElement, count, arr) {
  const birthday = new Date(item.birthday);
  const birthDate = birthday.getDate(),
    birthMonth = monthArr[birthday.getMonth()],
    birthYear = birthday.getFullYear();

  const itemWrap = document.createElement("tr"),
    itemNumber = document.createElement("td"),
    itemPost = document.createElement("td"),
    itemRank = document.createElement("td"),
    itemName = document.createElement("td"),
    itemNameWrap = document.createElement("div"),
    itemBirthday = document.createElement("td"),
    itemButton = document.createElement("td"),
    surnameSpan = document.createElement("span"),
    nameSpan = document.createElement("span"),
    itemButtonWrap = document.createElement("div"),
    itemButtonChange = document.createElement("button"),
    itemButtonRemove = document.createElement("button");

  itemButtonWrap.classList.add("birth__item-btn-wrapper");
  itemButtonChange.classList.add("item-btn-change", "btn-reset");
  itemButtonRemove.classList.add("item-btn-remove", "btn-reset");

  itemWrap.classList.add("item-wrap");
  itemNumber.classList.add("item-number");
  itemPost.classList.add("item-post");
  itemName.classList.add("item-name");
  itemNameWrap.classList.add("item-name-wrap");
  itemBirthday.classList.add("item-birth");
  itemButton.classList.add("item-button");

  itemButtonChange.innerHTML = svgPencil;
  itemButtonRemove.innerHTML = svgCancelRed;

  itemNumber.textContent = count;
  itemPost.textContent = item.post;
  itemRank.textContent = item.rank;
  surnameSpan.textContent = item.surname;
  nameSpan.textContent = `${item.firstname} ${item.lastname}`;
  itemBirthday.textContent = `${birthDate} ${birthMonth} ${birthYear}`;

  itemButtonChange.addEventListener("click", async () => {
    let forChangeArr = await getArr("../json/birthdays.json");
    createModalChange(item, forChangeArr);
  });

  itemButtonRemove.addEventListener("click", async () => {
    if (confirm("Вы уверены, что хотите удалить пользователя?")) {
      console.table(arr);
      let newArr = await getArr("../json/birthdays.json");
      newArr = arr.filter((i) => i.id !== item.id);
      await saveChanges("../script/calendar/saveBirthday.php", newArr);
      const birthArr = await getArr("../json/birthdays.json");
      console.table(birthArr);
      renderBirthDay(birthArr, document.querySelector(".table-tbody"));
    }
  });

  itemNameWrap.append(surnameSpan, nameSpan);
  itemName.append(itemNameWrap);
  itemButtonWrap.append(itemButtonChange, itemButtonRemove);
  itemButton.append(itemButtonWrap);
  itemWrap.append(
    itemNumber,
    itemPost,
    itemRank,
    itemName,
    itemBirthday,
    itemButton
  );
  parentElement.append(itemWrap);
}
