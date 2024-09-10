$(document).ready(function () {
    $.validator.addMethod("dateFR", function (value, element) {
        return this.optional(element) || /^\d{2}\/\d{2}\/\d{4}$/.test(value);       //_______REGEX date de naissance____________*     
    }, "Veuillez entrer une date au format jj/mm/aaaa.");


    // *******************************************************************************************************************************************



    $.validator.addMethod("emailRegex", function (value, element) {
        return this.optional(element) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);     //         REGEX adresse email
    }, "Veuillez entrer une adresse email valide.");


    //********************************************************************************************************************************************

    $("#formValidation").validate({                           // Fonction qui détecte si les champs de saisie sont remplis correctement
        rules: {
            nom: {
                minlength: 2,           // NOM
                required: true
            },
            prenom: {
                minlength: 2,           // PRENOM
                required: true
            },
            date: {
                required: true,         // DATE DE NAISSANCE
                dateFR: true
            },
            email: {
                required: true,         // Adresse EMAIL
                email: true,
                emailRegex: true
            },
            genre: {                    // GENRE
                required: true
            },
            photo: {                    // PHOTO
                required: true
            }
        },
        messages: {                                             // Message généré si les champs ne sont pas remplis correctement
            nom: {
                minlength: "Votre nom doit comporter plus de deux caractères",           // NOM
                required: "Nom obligatoire"
            },
            prenom: {
                minlength: "Votre prénom doit comporter plus de deux caractères",        // PRENOM
                required: "Prénom obligatoire"
            },
            date: {
                required: "VOUS ETES NE QUAND ?",                                       // DATE DE NAISSANCE
                dateFR: "Veuillez rentrer une date de naissance correcte"
            },                           
            email: {
                required: "Adresse e-mail obligatoire",                                // Adresse EMAIL
                email: "Veuillez entrer votre adresse e-mail",
                emailRegex: "Veuillez entrer votre adresse e-mail"
            },
            genre: "Veuillez sélectionner votre genre",                                   // GENRE
            photo: {
                required: "Veuillez sélectionner une photo d'identité au format valide (.png, .gif, .jpg, .jpeg)"   // PHOTO
            }
        },


        //************************************************************************************************************************************

        errorElement: "div",                                     //  Fonction qui génére le message d'erreur pour les champs de saisie
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.next("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid').removeClass('is-valid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass('is-valid').removeClass('is-invalid');
        },
        submitHandler: function (form) {                                           // Message de confirmation pour l'utilisateur
            if (confirm("Confirmez-vous que toutes les informations saisies sont correctes ?")) 
                {window.location.href = 'https://www.impots.gouv.fr/accueil';}     // Renvoie à une page internet


            //     {
            //     form.submit();                   Fonction pour soumettre le formulaire si il était fonctionnel 
            // }  
                
        
 }
    });
});

//**********************************************************************************************************************************


function setupRadioAlerts() {
    var genreRadios = document.querySelectorAll('input[name="genre"]');   // Boite d'alerte pour les boutons sélecteur de genre
    genreRadios.forEach(function (radio) {
        radio.addEventListener('change', function () {
            alert("Vous avez choisi: " + this.value);
        });
    });
}

window.onload = setupRadioAlerts;

//**************************************************************************************************************************************


$('#photo').on('change', function () {                           // Fonction pour charger la photo d'identité
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});


//*********************************************************************************************************************************** */