var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const fruit = this.parentNode.parentNode.childNodes[1].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)

        fetch('fruits', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'fruit': fruit,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const fruit = this.parentNode.parentNode.childNodes[1].innerText
        fetch('fruits', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'fruit': fruit
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

//user can input their favorite fruit
//each fruit is stored in the data base as well as the amount of votes for top fruits
//user can delete fruit
//put request will update number of likes
//post will create a new post in database with property of fruit name
//get will get info of fruit name from database and render in the DOM
//delete will delete from database and then the DOM
