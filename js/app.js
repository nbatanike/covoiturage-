/*****************************
 * MENU HAMBURGER MOBILE
 *****************************/
const mobileMenu = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");
if(mobileMenu){
    mobileMenu.addEventListener("click", () => {
        navList.classList.toggle("active");
    });
}

/*****************************
 * INSCRIPTION UTILISATEUR
 *****************************/
const formInscription = document.getElementById("formInscription");
if (formInscription) {
    formInscription.addEventListener("submit", function(e){
        e.preventDefault();
        const photoInput = document.getElementById("photo");
        const reader = new FileReader();
        reader.onload = function() {
            const utilisateur = {
                nom: document.getElementById("nom").value,
                prenom: document.getElementById("prenom").value,
                ville: document.getElementById("ville").value,
                telephone: document.getElementById("telephone").value,
                email: document.getElementById("email").value,
                ni: document.getElementById("ni").value,
                code: document.getElementById("code").value,
                photo: reader.result
            };
            let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
            const existe = utilisateurs.find(u => u.email === utilisateur.email);
            if (existe) { alert("Email déjà utilisé."); return; }
            utilisateurs.push(utilisateur);
            localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
            alert("Inscription réussie !");
            window.location.href = "connexion.html";
        };
        if(photoInput.files.length){
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            reader.onload();
        }
    });
}

/*****************************
 * CONNEXION UTILISATEUR
 *****************************/
const formConnexion = document.getElementById("formConnexion");
if (formConnexion) {
    formConnexion.addEventListener("submit", function(e){
        e.preventDefault();
        const email = document.getElementById("emailConnexion").value;
        const code = document.getElementById("codeConnexion").value;
        let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
        const utilisateur = utilisateurs.find(u => u.email===email && u.code===code);
        if(!utilisateur){ alert("Email ou code incorrect."); return; }
        localStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateur));
        alert("Connexion réussie !");
        window.location.href = "index.html";
    });
}

/*****************************
 * PUBLIER UN TRAJET
 *****************************/
const formTrajet = document.getElementById("formTrajet");
if(formTrajet){
    formTrajet.addEventListener("submit", function(e){
        e.preventDefault();
        const utilisateurConnecte = JSON.parse(localStorage.getItem("utilisateurConnecte"));
        if(!utilisateurConnecte){ alert("Veuillez vous connecter d'abord."); return; }
        const trajet = {
            depart: document.getElementById("depart").value,
            arrivee: document.getElementById("arrivee").value,
            dateDepart: document.getElementById("dateDepart").value,
            heure: document.getElementById("heure").value,
            rendezvous: document.getElementById("rendezvous").value,
            whatsapp: document.getElementById("whatsapp").value,
            montant: document.getElementById("montant").value,
            photo: utilisateurConnecte.photo || ""
        };
        let trajets = JSON.parse(localStorage.getItem("trajets")) || [];
        trajets.push(trajet);
        localStorage.setItem("trajets", JSON.stringify(trajets));
        alert("Trajet publié !");
        window.location.href = "liste-trajets.html";
    });
}

/*****************************
 * AFFICHER LES TRAJETS
 *****************************/
const listeTrajetsDiv = document.getElementById("listeTrajets");
if(listeTrajetsDiv){
    let trajets = JSON.parse(localStorage.getItem("trajets")) || [];
    if(trajets.length===0){ listeTrajetsDiv.innerHTML="<p>Aucun trajet publié.</p>"; }
    else{
        trajets.forEach(t=>{
            const div = document.createElement("div");
            div.classList.add("carte");
            div.innerHTML=`
                ${t.photo ? `<img src="${t.photo}" class="miniature">` : ''}
                <p><strong>Départ :</strong> ${t.depart}</p>
                <p><strong>Arrivée :</strong> ${t.arrivee}</p>
                <p><strong>Date :</strong> ${t.dateDepart}</p>
                <p><strong>Heure :</strong> ${t.heure}</p>
                <p><strong>Rendez-vous :</strong> ${t.rendezvous}</p>
                <p><strong>WhatsApp :</strong> ${t.whatsapp}</p>
                <p><strong>Montant :</strong> ${t.montant} FCFA</p>`;
            listeTrajetsDiv.appendChild(div);
        });
    }
}

/*****************************
 * RECHERCHE DE TRAJETS
 *****************************/
const btnRecherche = document.getElementById("btnRecherche");
const resultatsDiv = document.getElementById("resultats");
if(btnRecherche){
    btnRecherche.addEventListener("click", function(){
        const ville = document.getElementById("villeRecherche").value.trim().toLowerCase();
        let trajets = JSON.parse(localStorage.getItem("trajets")) || [];
        let filtres = trajets.filter(t=>t.depart.toLowerCase()===ville);
        resultatsDiv.innerHTML="";
        if(filtres.length===0){ resultatsDiv.innerHTML="<p>Aucun trajet trouvé pour cette ville.</p>"; }
        else{
            filtres.forEach(t=>{
                const div = document.createElement("div");
                div.classList.add("carte");
                div.innerHTML=`
                    ${t.photo ? `<img src="${t.photo}" class="miniature">` : ''}
                    <p><strong>Départ :</strong> ${t.depart}</p>
                    <p><strong>Arrivée :</strong> ${t.arrivee}</p>
                    <p><strong>Date :</strong> ${t.dateDepart}</p>
                    <p><strong>Heure :</strong> ${t.heure}</p>
                    <p><strong>Rendez-vous :</strong> ${t.rendezvous}</p>
                    <p><strong>WhatsApp :</strong> ${t.whatsapp}</p>
                    <p><strong>Montant :</strong> ${t.montant} FCFA</p>`;
                resultatsDiv.appendChild(div);
            });
        }
    });
}

/*****************************
 * AVIS DES VISITEURS
 *****************************/
const formAvis = document.getElementById("formAvis");
const listeAvisDiv = document.getElementById("listeAvis");

function afficherAvis(){
    let avis = JSON.parse(localStorage.getItem("avis")) || [];
    listeAvisDiv.innerHTML="";
    avis.forEach(a=>{
        const div=document.createElement("div");
        div.classList.add("carte");
        div.innerHTML=`<p><strong>${a.nom} :</strong> ${a.message}</p>`;
        listeAvisDiv.appendChild(div);
    });
}
if(listeAvisDiv) afficherAvis();
if(formAvis){
    formAvis.addEventListener("submit", function(e){
        e.preventDefault();
        const avis = {
            nom: document.getElementById("nomAvis").value,
            message: document.getElementById("messageAvis").value
        };
        let avisExistants = JSON.parse(localStorage.getItem("avis")) || [];
        avisExistants.push(avis);
        localStorage.setItem("avis", JSON.stringify(avisExistants));
        formAvis.reset();
        afficherAvis();
    });
}
