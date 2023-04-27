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
function calculerMoyenne(){
  let notes=document.getElementsByName("note[]");
  console.log(notes);
  let nombredenotes=notes.length;
  let somme=0;
  for(let note of notes  ){
    somme+=parseInt(note.value);
  }
  let moyenne=somme/nombredenotes;
  console.log(moyenne);
  document.getElementById("moyenne").value=moyenne;
}


// un variable qui prend en charge que on est sure que a chaque 
// création d'un autre champs càd l'ajout d'un autre div qui contient
// les champs label et input sera toujours le cas 
// si on clique sur le label le curseur automatiquement sera
// focusi sur l'input
var compteurDivNote = 2;


//  function pour l'ajout d'un champ de note en cliquant sur la button +
function ajoutChampNote() {
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
    let divnote = document.getElementsByName("divNote")[0];
    var divaajouter=document.createElement("div");
    divaajouter.setAttribute("id","divnote"+compteurDivNote);
    divaajouter.setAttribute("class","input-added")
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
    input.setAttribute("value",0); 
    divaajouter.append(input);
    var xdelete = document.createElement("span");
    xdelete.setAttribute("class", "xfordelete");
    xdelete.setAttribute("id", "x" + compteurDivNote);
    xdelete.textContent = "x";
    divaajouter.append(xdelete);
    divnote.append(divaajouter);
    calculerMoyenne();
    document.getElementById("adderror").innerText = "";
    compteurDivNote++;
    
  }
}
// l'évenement de la création d'un nouveau div
document.getElementById("ajouterNote").addEventListener("click", ajoutChampNote);
// le code qui permet de supprimer les inputs de note que nous avons ajouté en cliquant sur le bouton + et que 
// nous voulons les supprimer en cliquant sur le bouton x
document.getElementsByName("divNote")[0].addEventListener("click", function (event) {
  for (let i = 2; i < 100; i++) {
    if (event.target.matches("#x"+i)) {
      document.getElementById("divnote"+i).remove();
      calculerMoyenne();
    }
  }
});


function test(){

  calculerMoyenne();
}






