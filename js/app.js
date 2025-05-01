const ENDPOINT = "http://localhost:3000";
const uniCards = document.querySelector("#uniCards");
const addNewCode = document.querySelector("#addNewCode");
const addNewName = document.querySelector("#addNewName");
const ixtisasCards = document.querySelector("#ixtisasCards");
const addNewUsersForm = document.querySelector("#addNewUsersForm");
const addNewUsersSelect = document.querySelector("#addNewUsersSelect");

// get
const showData = (url, parent) => {
  parent.innerHTML = "";
  axios.get(ENDPOINT + url).then(({ data }) => {
    if (data && data.length > 0) {
      data.forEach(({ id, code, name }) => {
        parent.innerHTML += ` <div class="card">
               <div> 
               <h2>${code}</h2>
                <p>${name}</p>
               </div>
               <div><i class="fa-solid fa-trash trash" onclick="deleteTrash('${id}' , '${url}')"></i>
               <i class="fa-solid fa-file-pen pen" onclick="editPen('${id}' , '${url}')"></i></div>
              </div>`;
      });
    } else {
      parent.innerHTML = "Universitet siyahisi tapilmadi.";
    }
  });
};

showData("/university", uniCards);
showData("/ixtisaslar", ixtisasCards);

// delete
const deleteTrash = (id, url) => {
  Swal.fire({
    title: "Eminsiniz?",
    text: "Silseniz bir daha geri qaytara bilmeyeceksiniz!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Beli, silinsin!",
    cancelButtonText: "legv et",
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(ENDPOINT + url + "/" + id).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Silindi!",
            text: "Melumatlariniz silindi.",
            icon: "success",
          });

          if (url === "/university") {
            showData("/university", uniCards);
          } else if (url === "/ixtisaslar") {
            showData("/ixtisaslar", ixtisasCards);
          }
        }
      });
    }
  });
};

// add
addNewUsersForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newUser = {
    code: addNewCode.value,
    name: addNewName.value,
  };

  const url = addNewUsersSelect.value == 0 ? "/university" : "/ixtisaslar";
  const parent = addNewUsersSelect.value == 0 ? uniCards : ixtisasCards;

  axios.post(ENDPOINT + url, newUser).then((res) => {
    addNewCode.value = "";
    addNewName.value = "";
    addNewCode.focus();

    showData(url, parent);
  });
});

// edit
const editPen = (id, url) => {
  axios.get(ENDPOINT + url + "/" + id).then(({ data }) => {
    const newCode = prompt("Yenisini qeyd edin.", data.code);

    if (newCode === null) return;

    const newName = prompt("", data.name);

    if (newCode) {
      const newData = {
        code: newCode,
        name: newName,
      };

      axios.put(ENDPOINT + url + "/" + id, newData).then((res) => {
        if (res.status === 200) {
          const parent = addNewUsersSelect.value == 0 ? uniCards : ixtisasCards;

          showData(url, parent);
        } else {
        }
      });
    }
  });
};
