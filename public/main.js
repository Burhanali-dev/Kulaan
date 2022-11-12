var trash = document.getElementsByClassName("fa-trash-o");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const businessName = this.parentNode.parentNode.childNodes[1].innerText
    const location = this.parentNode.parentNode.childNodes[3].innerText
    const services = this.parentNode.parentNode.childNodes[5].innerText
    const comments = this.parentNode.parentNode.childNodes[7].innerText
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleteBusinessName: businessName,
        deleteLocation: location,
        deleteServices: services,
        deleteComments: comments,
      }),
    }).then(function (response) {
      window.location.reload()
    })
  });
});












