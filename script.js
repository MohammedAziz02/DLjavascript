var forupdate = null;
// fonction pour la validation d'un email evec les expressions régulière
function emailValide(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
// un petite test
const email1 = "email@exemple.com";
if (emailValide(email1)) {
  console.log("L'adresse e-mail est valide");
} else {
  console.log("L'adresse e-mail n'est pas valide");
}

// fonction pour la validation d'un numéro de tel avec les expression régulière
function telValide(tel) {
  const regex = /^06\d{8}$/;
  return regex.test(tel);
}
const tel1 = "0612345678";
if (telValide(tel1)) {
  console.log("Le numéro de téléphone est valide");
} else {
  console.log("Le numéro de téléphone n'est pas valide");
}

// function qui calcule le moyenne et mise a jour le champ moyenne
function calculerMoyenne() {
  // après avoir extraire le moyenne on aura un tableau de notes selon le nombre de champs qui on un nom "note[]"
  // après on fait la logique de calculer la moyenne.
  let notes = document.getElementsByName("note[]");
  let nombredenotes = notes.length;
  let somme = 0;
  for (let note of notes) {
    somme += parseInt(note.value);
  }
  let moyenne = somme / nombredenotes;
  document.getElementById("moyenne").value = moyenne;
  return moyenne;
}

// un variable qui prend en charge que on est sure que a chaque 
// création d'un autre champs càd l'ajout d'un autre div qui contient
// les champs label et input sera toujours le cas 
// si on clique sur le label le curseur automatiquement sera
// focusi sur l'input et aussi pour assurer que chaque div qui contient (field label input) à son propre id
// j'ai commencer par 2 parce que on a déja un field par défaut qui a comme id (note1)
var compteurDivNote = 2;
//  function pour l'ajout d'un champ de note en cliquant sur la button +
function ajoutChampNote() {
  // pour vérifier que tous les champs sont bien remplis
  // la logique que j'ai travaillé avec est comme suit :
  // j'ai crée un variable boolean isNotValid par défaut est false càd que tous les champs sont bien remplis.
  // on fait un boucle sur tous les champs de notes est lorque on trouve un champ vide càd le longuer de la valeur de
  // ce dernier est égale à 0. on affecte a cette variable (isNotValid) la valeur true.
  // et selon cette boolean soit on ajoute un nouveau champ soit on affiche un message d'erreur. 
  let isNotValid = false;
  const inputs = document.getElementsByName("note[]");
  for (let i = 0; i < inputs.length; i++) {
    const value = inputs[i].value;
    if (value.length == 0) {
      isNotValid = true;
      break;
    }
  }

  // si n'est pas valide on affiche un message d'erreur
  if (isNotValid) {
    document.getElementById("noteerror").innerText = "veuillez remplir les champs pour ajouter un nouveau champ";
  } else {
    // si elle est valide on ajout un nouveau champ
    let divnote = document.getElementsByName("divNote")[0];
    var divaajouter = document.createElement("div");
    //"divnote"+compteurDivNote pour differencier les differentes div que on ajouté
    divaajouter.setAttribute("id", "divnote" + compteurDivNote);
    divaajouter.setAttribute("class", "input-added")
    var label = document.createElement("label");
    label.setAttribute("for", "note" + compteurDivNote);
    label.setAttribute("name", "note");
    label.textContent = "Note " + compteurDivNote;
    divaajouter.append(label);
    // Créez un nouveau input et ajouter les attributs essentiels
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("name", "note[]");
    input.setAttribute("id", "note" + compteurDivNote);
    //j'ai met value égale à 0 pour que on ne tombe pas dans le problème : lorque on ajoute un champ de note l'énoncé de l'exercice
    // dit que le champ moyenne doit mis à jour automatiquement et c'est pas le cas car la logique que j'ai fait est d'appeler directement le
    // fonction calcuer moyenne après l'ajout d'un champ. donc après l'ajout d"un champ il ne contient auccun valeur ce qui donne un NaN dans le
    // calcul d'age
    input.setAttribute("value", 0);
    divaajouter.append(input);
    var xdelete = document.createElement("span");
    xdelete.setAttribute("class", "xfordelete");
    xdelete.setAttribute("id", "x" + compteurDivNote);
    xdelete.textContent = "x";
    divaajouter.append(xdelete);
    divnote.append(divaajouter);
    calculerMoyenne();
    document.getElementById("noteerror").innerText = "";
    compteurDivNote++;

  }
}
// l'évenement de la création d'un nouveau div
document.getElementById("ajouterNote").addEventListener("click", ajoutChampNote);

// le code qui permet de supprimer les inputs de note que nous avons ajouté en cliquant sur le bouton + et que 
// nous voulons les supprimer en cliquant sur le bouton x
// Event Delegation
document.getElementsByName("divNote")[0].addEventListener("click", function (event) {
  for (let i = 2; i < 100; i++) {
    if (event.target.matches("#x" + i)) {
      document.getElementById("divnote" + i).remove();
      calculerMoyenne();
    }
  }
});


function reset() {
  document.getElementById("nomerror").innerText = "";
  document.getElementById("prenomerror").innerText = "";
  document.getElementById("dateNaissanceerror").innerText = "";
  document.getElementById("filiereerror").innerText = "";
  document.getElementById("emailerror").innerText = "";
  document.getElementById("telerror").innerText = "";
  document.getElementById("noteerror").innerText = "";
}


function validate(event) {
  let isallowedtoenregistr = true;
  const nom = document.getElementById("nom");
  const prenom = document.getElementById("prenom");
  const dateNaissance = document.getElementById("dateNaissance");
  const filiere = document.getElementById("filiere");
  const email = document.getElementById("email");
  const tel = document.getElementById("tel");
  const notes = document.querySelectorAll("input[name='note[]']");
  // Empêcher la copie/coller des champs
  nom.addEventListener("paste", function (e) {
    e.preventDefault();
  });
  prenom.addEventListener("paste", function (e) {
    e.preventDefault();
  });
  filiere.addEventListener("paste", function (e) {
    e.preventDefault();
  });
  email.addEventListener("paste", function (e) {
    e.preventDefault();
  });
  tel.addEventListener("paste", function (e) {
    e.preventDefault();
  });

  // Vérification du champ Nom
  if (nom.value.length < 2) {
    var x = document.getElementById("nomerror");
    x.innerText = "le champ nom doit avoir plus de 2 caractères";
    isallowedtoenregistr = false;

  }

  // Vérification du champ Prénom
  if (prenom.value.length < 2) {
    var x = document.getElementById("prenomerror");
    x.innerText = "Le champ 'Prénom' doit contenir au moins deux caractères.";
    isallowedtoenregistr = false;

  }

  // Vérification du champ Date de naissance
  const age = new Date().getFullYear() - new Date(dateNaissance.value).getFullYear();
  if (isNaN(age) || age < 18) {
    var x = document.getElementById("dateNaissanceerror");
    x.innerText = " l’étudiant doit avoir 18 ou plus.";
    isallowedtoenregistr = false;

  }

  // Vérification du champ Filière
  if (filiere.value.length < 3) {
    var x = document.getElementById("filiereerror");
    x.innerText = "Le champ 'Filière' doit contenir au moins trois caractères.";
    isallowedtoenregistr = false;

  }

  // Vérification du champ E-mail
  if (!emailValide(email.value)) {
    var x = document.getElementById("emailerror");
    x.innerText = "Le champ 'E-mail' doit être une adresse e-mail valide.";
    isallowedtoenregistr = false;

  }

  // Vérification du champ Téléphone
  if (tel.value.length == 0 && !telValide(tel.value)) {
    var x = document.getElementById("telerror");
    x.innerText = "Le champ 'Téléphone' doit être un numéro de téléphone valide.";
    isallowedtoenregistr = false;

  }

  // pour vérifier les champs de note[]
  for (let i = 0; i < notes.length; i++) {
    if (isNaN(notes[i].value) || notes[i].value < 0 || notes[i].value > 20 || notes[i].value.length == 0) {
      document.getElementById("noteerror").innerHTML = "Veuillez saisir des notes valides (entre 0 et 20).";
      isallowedtoenregistr = false;

    }
  }

  // pour annuler le comportement par défaut du navigateur (l'envoi du formulaire au serveur)
  event.preventDefault();
  return isallowedtoenregistr;

}



// Fonction de validation du formulaire
function validerFormulaire(event) {
  // pour supprimer tous messages d'erreur que on a ajouté est vérifier encore une fois
  reset();
  let x = validate(event);
  if (!x) {
    return;
  } else {
    // pour ajouter un nouveau ligne au tableau
    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const dateNaissance = document.getElementById("dateNaissance");
    const filiere = document.getElementById("filiere");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");
    const notes = document.querySelectorAll("input[name='note[]']");
    let notevalue = "[";
    for (let note of notes) {
      notevalue += note.value + ",";
    }
    notevalue += "]";

    console.log("dans la fonction validerFormulaire "+forupdate);

    if (forupdate === null) {

      // accéder au dernier ligne dans le tableau
      var tableetudiant = document.querySelectorAll("#tableEtudiants tbody");

      // la création de la ligne avec les données de formulaire( nom, prénom, dateNaissance...)
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      td1.textContent = nom.value;
      var td2 = document.createElement("td");
      td2.textContent = prenom.value;
      var td3 = document.createElement("td");
      td3.textContent = dateNaissance.value;
      var td4 = document.createElement("td");
      td4.textContent = filiere.value;
      var td5 = document.createElement("td");
      td5.textContent = email.value;
      var td6 = document.createElement("td");
      td6.textContent = tel.value;
      var td7 = document.createElement("td");
      td7.textContent = notevalue;
      var td8 = document.createElement("td");
      td8.textContent = calculerMoyenne();

      // Create the button elements and set their content and attributes
      var modifierBtn = document.createElement("button");
      modifierBtn.textContent = "Modifier";
      modifierBtn.setAttribute("class", "modifier");
      var supprimerBtn = document.createElement("button");
      supprimerBtn.textContent = "Supprimer";
      supprimerBtn.setAttribute("class", "supprimer");

      // Create the table data element for the buttons and append the buttons to it
      var td9 = document.createElement("td");
      td9.appendChild(modifierBtn);
      td9.appendChild(supprimerBtn);

      // Append all the table data elements to the table row
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
      tr.appendChild(td8);
      tr.appendChild(td9);
      tableetudiant[tableetudiant.length - 1].insertAdjacentElement("beforeend", tr);
    } else {
        forupdate.children[0].textContent= document.getElementById("nom").value;
        forupdate.children[1].textContent= document.getElementById("prenom").value;
        forupdate.children[2].textContent= document.getElementById("dateNaissance").value;
        forupdate.children[3].textContent=  document.getElementById("filiere").value;
        forupdate.children[4].textContent=  document.getElementById("email").value;
        forupdate.children[5].textContent= document.getElementById("tel").value;
        // forupdate.children[6].textContent= document.getElementById("dateNaissance").value;
        forupdate.children[7].textContent= document.getElementById("moyenne").value;
    }
  }

}

// Écouteur d'événement sur la soumission du formulaire
document.getElementById("formEtudiant").addEventListener("submit", validerFormulaire);


// fonction pour la modification d'un étudiant
function modifierEtudiant(btn) {
  forupdate = btn.parentElement.parentElement;
  document.getElementById("nom").value = forupdate.children[0].textContent;
  document.getElementById("prenom").value = forupdate.children[1].textContent;
  document.getElementById("dateNaissance").value = forupdate.children[2].textContent;
  document.getElementById("filiere").value = forupdate.children[3].textContent;
  document.getElementById("email").value = forupdate.children[4].textContent;
  document.getElementById("tel").value = forupdate.children[5].textContent;
  // document.getElementById("note[]").value=forupdate.children[6];
  document.getElementById("moyenne").value = forupdate.children[7].textContent;
  console.log("dans la fonction modifierEtudiant "+forupdate);
}

//fonction pour la suppression d'un étudiant
function supprimerEtudiant(btn) {
  let parentofbtn_tr = btn.parentElement.parentElement;
  parentofbtn_tr.remove();
}

// pour l'ajout et la modification 
const tableEtudiants = document.querySelector('#tableEtudiants');
tableEtudiants.addEventListener('click', function (event) {
  const target = event.target;
  if (target.classList.contains('modifier')) {
    console.log("modifier")
    modifierEtudiant(target);
  } else if (target.classList.contains('supprimer')) {
    supprimerEtudiant(target);
    console.log("supprimer")
  }
});













