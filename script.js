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

// un variable qui prend en charge que on est sure que a chaque 
// création d'un autre champs càd l'ajout d'un autre div qui contient
// les champs label et input sera toujours le cas 
// si on clique sur le label le curseur automatiquement sera
// focusi sur l'input
var compteurDivNote = 2;


//  function pour l'ajout d'un champ de note en cliquant sur la button +
function ajoutChampNote() {

  //j'ai travailler avec queryselector parceque normalement pour ajouter des divNote qui on le label note est numérote
  // il faut toujour accéder au dernier divNote pour ajouter un autre divNote après lui pour que l'ordre de label Note sera comme
  // note 1 --> note 2 --> note 3 ... et non pas note 1 --> note 3 --> note 2  
  var divs = document.querySelectorAll('div[name="divNote"]');
  var lastDiv = divs[divs.length - 1];

  // pour vérifier que tous les champs sont bien remplis
  let isNotValid = false;
  const inputs = document.getElementsByName("note[]");
  for (let i = 0; i < inputs.length; i++) {
    const value = inputs[i].value;
    if (value.length == 0) {
      isNotValid = true;
      break;
    }

  }

  if (isNotValid) {
    document.getElementById("adderror").innerText = "veuillez remplir les champs pour ajouter un nouveau champ";
  } else {
    // Créez un nouveau divNote et ajouter les attributs essentiels
    // var nouveauDivNote = document.createElement("div");
    // nouveauDivNote.setAttribute("class", "form-field single-line");
    // nouveauDivNote.setAttribute("name", "divNote");
    // Ajoutez les éléments enfants au nouveau divNote 
    //  Créez un nouveau label et ajouter les attributs essentiels
    var label = document.createElement("label");
    label.setAttribute("for", "note" + compteurDivNote);
    label.setAttribute("name", "note");
    label.textContent = "Note " + compteurDivNote;
    divs.appendChild(label);
    // Créez un nouveau input et ajouter les attributs essentiels
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("name", "note[]");
    input.setAttribute("id", "note" + compteurDivNote);
    divs.appendChild(input);
    var xdelete = document.createElement("span");
    xdelete.setAttribute("class", "xfordelete");
    xdelete.setAttribute("id", compteurDivNote);
    xdelete.textContent = "x";
    divs.appendChild(xdelete);
    // Ajoutez le nouveau divNote après le parent
    // lastDiv.after(nouveauDivNote);
    // après que on a bien créer le divNote et tous on doit supprimer le text dans le span de l'erreur
    document.getElementById("adderror").innerText = "";
    compteurDivNote++;
  }
}
// l'évenement de la création d'un nouveau div
document.getElementById("ajouterNote").addEventListener("click", ajoutChampNote);








