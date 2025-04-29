const ENDPOINT = "http://localhost:3000";
const uniCards = document.querySelector("#uniCards");
const ixtisasCards = document.querySelector("#ixtisasCards");

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
               <i class="fa-solid fa-file-pen pen"></i></div>
              </div>`;
      });
    } else {
      parent.innerHTML = "Universitet siyahisi tapilmadi.";
    }
  });
};

showData("/university", uniCards);
showData("/ixtisaslar", ixtisasCards);

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

// const getUniversitetler = () => {
//   axios.get(ENDPOINT + "/university").then(({ data }) => {
//     if (data && data.length > 0) {
//       data.forEach(({ id, code, name }) => {
//         uniCards.innerHTML += ` <div class="card">
//             <h2>${code}</h2>
//             <p>${name}</p>
//           </div>`;
//       });
//     } else {
//       uniCards.innerHTML = "Universitet siyahisi tapilmadi.";
//     }
//   });
// };
// getUniversitetler();

// const getIxtisaslar = () => {
//   axios.get(ENDPOINT + "/ixtisaslar").then(({ data }) => {
//     if (data && data.length) {
//       data.forEach(({ id, code, name }) => {
//         ixtisasCards.innerHTML += `  <div class="card">
//                 <h2>${code}</h2>
//                 <p>${name}</p>
//               </div>`;
//       });
//     } else {
//       ixtisasCards.innerHTML = "Ixtisas siyahisi tapilmadi.";
//     }
//   });
// };
// getIxtisaslar();
