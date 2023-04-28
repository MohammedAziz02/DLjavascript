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
// une petite test
const tel1 = "0612345678";
if (telValide(tel1)) {
  console.log("Le numéro de téléphone est valide");
} else {
  console.log("Le numéro de téléphone n'est pas valide");
}


// cette variable va nous aide pour savoir est ce que l'utilisateur veux modifier ou ajouter un étudiant
// la logique est comme suit: si l'utilisateur clique sur la boutton modifier cette variable prend comme valeur le parent du parent de la boutton qui est (tr) la ligne qui 
// contient les informations(nom,prénom...).
var forupdate = null;

// function qui calcule le moyenne 
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
  return moyenne;
}


// un variable qui prend en charge que on est sure que a chaque 
// création d'un autre champs càd l'ajout d'un autre div qui contient
// les champs label et input sera toujours le cas 
// si on clique sur le label le curseur automatiquement sera
// focusi sur l'input et aussi pour assurer que chaque div qui contient (field label input) à son propre id
// j'ai commencer par 2 parce que on a déja un field par défaut qui a comme id (note1)
// et aussi chaque création d'un nouveau label prend comme valeur Note + N°(compteurDivNote)
var compteurDivNote = 2;
//  function pour l'ajout d'un champ de note en cliquant sur la button +
function ajoutChampNote(value = "") {
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

  console.log(inputs);

  // si n'est pas valide on affiche un message d'erreur
  if (isNotValid) {
    document.getElementById("noteerror").innerText = "veuillez remplir les champs pour ajouter un nouveau champ";
  } else {
    // si elle est valide on ajout un nouveau champ
    // ici on récupère le div qui contient le label et input , pourqoi? : pour ajouter les autres label et input que l'on va créer avec javascript dedant.
    // pourquoi dedant et pas dehors : juste pour préserver le style css.
    let divnote = document.getElementsByName("divNote")[0];

    var divaajouter = document.createElement("div");
    //"divnote"+compteurDivNote pour differencier les differentes div que on ajouté : donc pour donner a chaque div son id.
    divaajouter.setAttribute("id", "divnote" + compteurDivNote);
    // l'ajout des attributs principales
    divaajouter.setAttribute("class", "input-added")
    var label = document.createElement("label");
    // meme que div pour donner a chaque note son propre id.
    label.setAttribute("for", "note" + compteurDivNote);
    label.setAttribute("name", "note");
    label.textContent = "Note " + compteurDivNote;
    divaajouter.append(label);
    // Créez un nouveau input et ajouter les attributs essentiels
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("name", "note[]");
    input.setAttribute("id", "note" + compteurDivNote);
    input.setAttribute("value", value);
    divaajouter.append(input);
    // pour les inputs que on a jouté nous meme, l'énoncé dit qu'il faut un moyenne pour le supprimer
    // donc l'idée qui j'ai implémenté est d'ajouter un span qui prend comme valeur (X), et comme id son propre id qui est convenable avec l'input de note ==> càd si input de note 
    // a comme id=note2 alors  l'id de cette span sera "x2". qui facilite la supression de chaque input spécifique. avec la propagation des évéenements.
    var xdelete = document.createElement("span");
    xdelete.setAttribute("class", "xfordelete");
    xdelete.setAttribute("id", "x" + compteurDivNote);
    xdelete.textContent = "x";
    divaajouter.append(xdelete);
    divnote.append(divaajouter);

    // lorsque l'utilisateur veut ajouter un input après qu'il a tenter d'jouter un input et les autres qui existent sont vide. on doit supprimer le message d'erreur.
    document.getElementById("noteerror").innerText = "";
    // après chaque création de Div qui contient le label note + n° et input on doit incrémenter cette competeur pour préserver l'ordre
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
      document.getElementById("moyenne").value = calculerMoyenne();
    }
  }
});

// chaque modification de input moyenne influence la modification de input de moyenne.
// j'ai utilisé la propagation des évenements.
document.getElementsByName("divNote")[0].addEventListener("input", function () {
  document.getElementById("moyenne").value = calculerMoyenne();
});


// fonction pour réinsialiser les valeurs des spans d'erreurs. 
function resetErrorfield() {
  document.getElementById("nomerror").innerText = "";
  document.getElementById("prenomerror").innerText = "";
  document.getElementById("dateNaissanceerror").innerText = "";
  document.getElementById("filiereerror").innerText = "";
  document.getElementById("emailerror").innerText = "";
  document.getElementById("telerror").innerText = "";
  document.getElementById("noteerror").innerText = "";
}

// parce que  il ya beacoup de répétition pour avoir les fiels de la formaulire.
function extraireFormFieldsAsObject() {
  let FormFieldsAsObject = {};
  FormFieldsAsObject.nom = document.getElementById("nom");
  FormFieldsAsObject.prenom = document.getElementById("prenom");
  FormFieldsAsObject.dateNaissance = document.getElementById("dateNaissance");
  FormFieldsAsObject.filiere = document.getElementById("filiere");
  FormFieldsAsObject.email = document.getElementById("email");
  FormFieldsAsObject.tel = document.getElementById("tel");
  FormFieldsAsObject.notes = document.querySelectorAll("input[name='note[]']");
  FormFieldsAsObject.moyenne = document.getElementById("moyenne");
  return FormFieldsAsObject;
}

// fonction pour réinsialiser les valeurs des input après l'ajout ou la modification. 
function reset() {
  let fields = extraireFormFieldsAsObject();
  fields.nom.value = "";
  fields.prenom.value = "";
  fields.filiere.value = "";
  fields.email.value = "";
  fields.tel.value = "";
  fields.moyenne.value = "";
  fields.dateNaissance.value = "";
  fields.notes[0].value = "";
  for (let i = 1; i < fields.notes.length; i++) {
    if (fields.notes[i].parentElement) {
      fields.notes[i].parentElement.remove();
    }
  }

  forupdate = null;

}







// fonction pour la validation de formualire
//isallowedtoenregistr est un variable sa valeur par défaut est true càd on suppose que l'utilisateur a bien saisis tous les champs.
// si un champs ne vérifie pas les spécifications de l'exercice on lui affecte la valeur false;
function verifierFormulaire(event) {
  let isallowedtoenregistr = true;
  // pour extraire les champs de Formulaire
  let formFields = extraireFormFieldsAsObject();

  // Empêcher la copie/coller des champs
  formFields.nom.addEventListener("paste", function (e) {
    e.preventDefault();
  });
  formFields.prenom.addEventListener("paste", function (e) {
    e.preventDefault();
  });
  formFields.filiere.addEventListener("paste", function (e) {
    e.preventDefault();
  });
  formFields.email.addEventListener("paste", function (e) {
    e.preventDefault();
  });
  formFields.tel.addEventListener("paste", function (e) {
    e.preventDefault();
  });

  // Vérification du champ Nom
  if (formFields.nom.value.length < 2) {
    var x = document.getElementById("nomerror");
    x.innerText = "le champ nom doit avoir plus de 2 caractères";
    isallowedtoenregistr = false;
  }

  // Vérification du champ Prénom
  if (formFields.prenom.value.length < 2) {
    var x = document.getElementById("prenomerror");
    x.innerText = "Le champ 'Prénom' doit contenir au moins deux caractères.";
    isallowedtoenregistr = false;

  }

  // Vérification du champ Date de naissance
  const age = new Date().getFullYear() - new Date(formFields.dateNaissance.value).getFullYear();
  if (isNaN(age) || age < 18) {
    var x = document.getElementById("dateNaissanceerror");
    x.innerText = " l’étudiant doit avoir 18 ou plus.";
    isallowedtoenregistr = false;

  }

  // Vérification du champ Filière
  if (formFields.filiere.value.length < 3) {
    var x = document.getElementById("filiereerror");
    x.innerText = "Le champ 'Filière' doit contenir au moins trois caractères.";
    isallowedtoenregistr = false;

  }

  // Vérification du champ E-mail
  if (!emailValide(formFields.email.value)) {
    var x = document.getElementById("emailerror");
    x.innerText = "Le champ 'E-mail' doit être une adresse e-mail valide.";
    isallowedtoenregistr = false;

  }

  // Vérification du champ Téléphone
  if (formFields.tel.value.length == 0 && !telValide(formFields.tel.value)) {
    var x = document.getElementById("telerror");
    x.innerText = "Le champ 'Téléphone' doit être un numéro de téléphone valide.";
    isallowedtoenregistr = false;

  }

  // pour vérifier les champs de note[]
  for (let i = 0; i < formFields.notes.length; i++) {
    if (isNaN(formFields.notes[i].value) || formFields.notes[i].value < 0 || formFields.notes[i].value > 20 || formFields.notes[i].value.length == 0) {
      document.getElementById("noteerror").innerText = "Veuillez saisir des notes valides (entre 0 et 20).";
      isallowedtoenregistr = false;

    }
  }

  // pour annuler le comportement par défaut du navigateur (l'envoi du formulaire au serveur)
  event.preventDefault();

  return isallowedtoenregistr;

}



// Fonction de validation du formulaire
function validerFormulaire(event) {

  resetErrorfield();
  let x = verifierFormulaire(event);

  // si il y'a des erreurs lors de l'envoi de la formulaire on remplit les champs des erreurs(span) que j'ai ajouté et on fait rien (return)
  if (!x) {
    return;
  }
  // sinon on commence la logique de l'ajout ou la modification de l'étudiant dans la table
  else {
    let formFields = extraireFormFieldsAsObject();
    // notevalue est le variable qui doit ajouté au tableau la colonne (notes)
    let notevalue = "[";
    for (let note of formFields.notes) {
      notevalue += note.value + ",";
    }
    notevalue += "]";

    // si l'utilisateur n'a pas cliquer sur le button modifier càd la valeur globale du variable forupdate sera toujours null ===> on comprend que c'est un nouveau étudiant
    // on commence la logique de  l'ajout de l'étudiant dans la table
    if (forupdate === null) {
      // accéder au dernier ligne dans le tableau
      var tableetudiant = document.querySelectorAll("#tableEtudiants tbody");

      // la création de la ligne avec les données de formulaire( nom, prénom, dateNaissance...)
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      td1.textContent = formFields.nom.value;
      var td2 = document.createElement("td");
      td2.textContent = formFields.prenom.value;
      var td3 = document.createElement("td");
      td3.textContent = formFields.dateNaissance.value;
      var td4 = document.createElement("td");
      td4.textContent = formFields.filiere.value;
      var td5 = document.createElement("td");
      td5.textContent = formFields.email.value;
      var td6 = document.createElement("td");
      td6.textContent = formFields.tel.value;
      var td7 = document.createElement("td");
      td7.textContent = notevalue;
      var td8 = document.createElement("td");
      td8.textContent = calculerMoyenne();

      // la création des buttons avec leurs attributs
      var modifierBtn = document.createElement("button");
      modifierBtn.textContent = "Modifier";
      modifierBtn.setAttribute("class", "modifier");
      var supprimerBtn = document.createElement("button");
      supprimerBtn.textContent = "Supprimer";
      supprimerBtn.setAttribute("class", "supprimer");

      var td9 = document.createElement("td");
      td9.appendChild(modifierBtn);
      td9.appendChild(supprimerBtn);

      // ajouter tous les cellules au ligne
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
      tr.appendChild(td8);
      tr.appendChild(td9);
      // l'ajout de ligne au dernier case du tableau
      tableetudiant[tableetudiant.length - 1].insertAdjacentElement("beforeend", tr);
    }
    // sinon si la valeur de forupdate n'est pas null càd l'utilisateur a déja cliqué sur le bouton modifier on fait la procédure de la modification     
    else {
      // forupdate représente la ligne tr 
      forupdate.children[0].textContent = formFields.nom.value;
      forupdate.children[1].textContent = formFields.prenom.value;
      forupdate.children[2].textContent = formFields.dateNaissance.value;
      forupdate.children[3].textContent = formFields.filiere.value;
      forupdate.children[4].textContent = formFields.email.value;
      forupdate.children[5].textContent = formFields.tel.value;
      let notevalue = "[";
      for (let note of formFields.notes) {
        notevalue += note.value + ",";
      }
      notevalue += "]";
      forupdate.children[6].textContent = notevalue;
      forupdate.children[7].textContent = formFields.moyenne.value;
    }
    reset();


  }



}

// événement sur la soumission du formulaire
document.getElementById("formEtudiant").addEventListener("submit", validerFormulaire);


// fonction pour la modification d'un étudiant
function modifierEtudiant(btn) {
  forupdate = btn.parentElement.parentElement;
  let formFields = extraireFormFieldsAsObject();
  formFields.nom.value = forupdate.children[0].textContent;
  formFields.prenom.value = forupdate.children[1].textContent;
  formFields.dateNaissance.value = forupdate.children[2].textContent;
  formFields.filiere.value = forupdate.children[3].textContent;
  formFields.email.value = forupdate.children[4].textContent;
  formFields.tel.value = forupdate.children[5].textContent;
  formFields.moyenne.value = forupdate.children[7].textContent;
  // pour la charge de notes dans inputs de notes.
  let combiendenote = forupdate.children[6].textContent;
  const regex = /\d+/g;
  const notesinNotestd = combiendenote.match(regex);
  //charger la première note dans l'input deja existe (input statique par défaut)
  document.getElementById("note1").value = notesinNotestd[0];

  notesinNotestd.slice(1).forEach((n) => {
    ajoutChampNote(n);
  })

}

//fonction pour la suppression d'un étudiant
function supprimerEtudiant(btn) {
  // on a passé la button comme arguement donc son parent est (td) et le parent de (td) c'est tr donc on supprime  la ligne
  let parentofbtn_tr = btn.parentElement.parentElement;
  parentofbtn_tr.remove();
}

// pour l'ajout et la modification 
// j'ai utilisé la propagation des évenements càd j'ai séléctioner le parent dans ce cas est le tableau.
//j'ai créer un evenement click sur le parent qui doit etre propager sur leur enfants. et dans ce cas j'ai fait un condition
// si l'enfant a une class modifier alors c'est surement la button modifier  alors j'ai appelé la function modifierEtudiant
//si l'enfant a une class supprimer alors c'est surement la button supprimer alors j'ai appelé la button supprimerEtudiant 
const tableEtudiants = document.querySelector('#tableEtudiants');
// Define the event listener function
function handleClick(event) {
  const target = event.target;
  if (target.classList.contains('modifier')) {
    modifierEtudiant(target);
  } else if (target.classList.contains('supprimer')) {
    supprimerEtudiant(target);
  }
}
tableEtudiants.addEventListener('click', handleClick);















