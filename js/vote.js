swal.fire('Please wait')
swal.showLoading()

firebase.auth().onAuthStateChanged(async (user) => {
    if(!user){
        window.location.href = "../"
    } else {
        $("#email").val(user.email)    
        firebase.database().ref('pendataan/').orderByChild('0').equalTo(user.email).once('value', function (snapshot) {
            var value = snapshot.val();
            console.log(value)
            if(!value){                   
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
            } else {  
                firebase.database().ref('token/').orderByChild('0').equalTo(user.email).once('value', function (snapshot) {
                    var value = snapshot.val();
                    console.log(value)
                    if(value){
                        snapshot.forEach(function(child) {
                            token = child.val()[1]
                        });
                        firebase.database().ref('vote/').orderByChild('0').equalTo(token).once('value', function (snapshot) {
                            var value = snapshot.val();
                            if(value){
                                window.location.href = "thankyou.html"
                            } else {                    
                                Swal.close()
                            }
                        });
                    } else {
                        Swal.close()
                    }
                });
            }
        });
    }
})

$(document).ready(function(){
    $("#token").val(generateToken())    
    $("#tokenku").val($("#token").val())
    $("#formVote").submit(function(e) {
        e.preventDefault();
		$(":submit").attr("disabled", true);
        swal.fire('Please wait')
        swal.showLoading()
        var tokenValues = $("#formToken").serialize();   
        var values = $(this).serialize();        		
		firebase.database().ref('token/').orderByChild('0').equalTo($("#email").val()).once('value', function (snapshot) {
			var value = snapshot.val();
			console.log(value)
			if(value){
				location.reload();
			} else {
				$.ajax({
					url: "https://docs.google.com/forms/d/e/1FAIpQLSev3RGwDkXT4WCoimhtFszLsfY2GIZtRnakJBZ2FEH1PcSisw/formResponse",
					type: "post",
					dataType: 'jsonp',
					crossDomain:true,
					data: tokenValues ,
					success: function (response) {
						console.log(response);
						vote(values);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus, errorThrown);
						vote(values);
					}
				});
			}
		});
    })

})

function vote(values){
    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfjj4Z_tx4X3tCPz2279X7lh3MXDAmqdap5fTjvEKMp2xePPg/formResponse",
        type: "post",
        dataType: 'jsonp',
        crossDomain:true,
        data: values ,
        success: function (response) {
            console.log(response);
            setTimeout(function(){ 
                swal.close();
                window.location.href = "thankyou.html"
            }, 2000);
            // voteSucces()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            setTimeout(function(){ 
                swal.close();
                window.location.href = "thankyou.html"
            }, 2000);
            // voteSucces()
        }
    });
}

// // function voteSucces(){
// //     var email = localStorage.getItem("email");
// //     var token = localStorage.getItem("token");
// //     firebase.database().ref('vote/').once('value', function (snapshot) {
// //         var value = snapshot.val();
// //         if(!value) value = ['0']
// //         firebase.database().ref('vote/' + value.length).set({
// //             email: email,
// //             token: token,
// //         });
// //         window.location.href = "thankyou.html"
// //     });
// // }



// $(document).ready(function(){
//     $("#formVote").submit(function(e) {
//         e.preventDefault();
//         window.location.href = "thankyou.html";
//     })
// })

function vote1(){
    Swal.fire({
      title: 'Apakah Anda Yakin memilih calon nomor urut 1?',
      html: "anda tidak dapat mengubah pilihan setelah vote",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, saya yakin'
    }).then((result) => {
        if (result.isConfirmed) {
            $('#vote').val('1');
            $( "#formVote" ).submit();
        }
    })
  }

function vote2(){
  Swal.fire({
    title: 'Apakah Anda Yakin memilih calon nomor urut 2?',
    html: "anda tidak dapat mengubah pilihan setelah vote",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, saya yakin'
  }).then((result) => {
        if (result.isConfirmed) {
            $('#vote').val('2');
            $( "#formVote" ).submit();
        }
  })
}

function vote3(){
    Swal.fire({
      title: 'Apakah Anda Yakin memilih calon nomor urut 3?',
      html: "anda tidak dapat mengubah pilihan setelah vote",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, saya yakin'
    }).then((result) => {
        if (result.isConfirmed) {
            $('#vote').val('3');
            $( "#formVote" ).submit();
        }
    })
  }