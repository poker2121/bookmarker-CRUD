//^ URL favorite sites
//?===================

var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var alertDialog = document.getElementById("alertDialog");
var closeDialogBtn = document.getElementById("closeDialog");
var bookmarkList;

//?======================================================================
if (localStorage.getItem("bookmarkList") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayBookmark();
  console.log(bookmarkList);
} else {
  bookmarkList = [];
}

//?======================================================================
// Dialog Part
function showDialog() {
  alertDialog.showModal();
}

closeDialogBtn.addEventListener("click", () => {
  alertDialog.close();
});
//?======================================================================
// Add bookmark part

function addbookmark() {
  var name = bookmarkNameInput.value.trim();
  var url = bookmarkUrlInput.value.trim();


  if (name === "" || url === "") {
 
    alertDialog.showModal();
    return; 
  }


  var bookmark = {
    name: name,
    url: url,
  };


  bookmarkList.push(bookmark);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  clearInput();
  displayBookmark();
}

//?=======================================================================
// clear data
function clearInput() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;
}
//?=======================================================================
// Display bookmark Function
function displayBookmark() {
  var cartoona = ``;
  for (var i = 0; i < bookmarkList.length; i++) {
    cartoona += `
      <tr>
        <th class="text-capitalize text-center align-middle">${i + 1}</th>
        <th class="text-capitalize text-center align-middle">${bookmarkList[i].name}</th>
        <th class="text-capitalize text-center align-middle"> 
          <a href="${bookmarkList[i].url}" class="btn btn-warning" target="_blank"> <i class="fa-solid fa-eye"></i> Visit</a>
        </th>
        <th class="text-capitalize text-center align-middle">
          <button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button>
        </th>
      </tr>
      `;
  }

  tableContent.innerHTML = cartoona;
}
//?=======================================================================
// Delete bookmark Function
function deleteBookmark(deleteIndex) {

  bookmarkList.splice(deleteIndex, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayBookmark();
}


