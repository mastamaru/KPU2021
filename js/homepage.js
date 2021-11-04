swal.fire("Please Wait")
swal.showLoading()

firebase.auth().onAuthStateChanged(async (user) => {
    if(user){
        console.log(user.email.slice(-9))
        if(user.email.slice(-9) != "ugm.ac.id"){
            // alert("bukan email ugm, silakan login ulang");
            swal.close()
            Swal.fire({
                icon: 'error',
                title: 'Bukan email  UGM',
                text: 'Mohon untuk menggunakan email UGM',
            }).then(()=>{
                firebase.auth().signOut().then(()=> {
                    console.log('logged out')
                }).catch((error) => {
                    console.log(error.message)
                })
            })
        } else {
            firebase.database().ref('pendataan/').orderByChild('0').equalTo(user.email).once('value', function (snapshot) {
                var value = snapshot.val();
                if(value){
                    firebase.database().ref('token/').orderByChild('0').equalTo(user.email).once('value', function (snapshot) {
                        var value = snapshot.val();
                        if(value){
                            snapshot.forEach(function(child) {
                                token = child.val()[1]
                            });
                            firebase.database().ref('vote/').orderByChild('0').equalTo(token).once('value', function (snapshot) {
                                var value = snapshot.val();
                                if(value){
                                    window.location.href = "pages/thankyou.html"
                                } else {                    
                                    window.location.href = "pages/vote.html"
                                }
                            });
                        } else {                    
                            window.location.href = "pages/vote.html"
                        }
                    });
                } else {                   
                    swal.close()
                    Swal.fire({
                        icon: 'error',
                        title: 'Anda belum terdaftar',
                        html: 'silakan mendaftarkan diri di <br /> sini: <a href="https://bit.ly/PendaftaranPemiluKMTETI2022" target="_blank">https://bit.ly/PendaftaranPemiluKMTETI2022</a>',
                    }).then(()=>{
                        firebase.auth().signOut().then(()=> {
                            console.log('logged out')
                        }).catch((error) => {
                            console.log(error.message)
                        })
                    })
                }
            });
        }
    } else {
        swal.close()
    }
})



// Set the date we're counting down to
var countDownDate = new Date("Nov 8, 2021 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer-icon").remove('fa-clock');
    document.getElementById("countdown").innerHTML = "Vote Now";
    document.getElementById("countdown").setAttribute('onclick', "login()");
  }
}, 1000);



$(document).ready(function(){ 
    $('#vote').on('click', function(e) {
        e.preventDefault();
        login();
    });
});