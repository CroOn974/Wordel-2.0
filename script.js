var mot_tapper ="";
var mot_selec = "";
var num_ligne = 1;
var ligne_max = 6;
var num_lettre = 0;
var long_mot = 5
var tab_couleur = [];
var list_lettre = [];
var lettre_mot_tapper = "";
var lettre_mot_selec = "";
var list_button = [];
var tab_mot_tapper = [];
var tab_mot_selec = [];
var ligne = "";
var continuer = true
var bouton_clavier = []
var tab_lettre = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

select_mot();

//clavier physique
window.addEventListener("keydown", function (event) {

    ligne = "mot_" + num_ligne;

    //récupere l'element ayant pour id mot_x x etant le numero de la ligne
    list_lettre = this.document.getElementById(ligne).children;

    //verifie si c'est un lettre
    if (event.code.includes('Key') && num_lettre < 5 && continuer) {

        lettre_tapper = event.key;

        ajout_lettre(lettre_tapper);

    //semicolon est le code de la lettre M
    } else if(event.code.includes('Semicolon') && num_lettre < 5 && continuer){

        lettre_tapper = event.key;
        
        ajout_lettre(lettre_tapper);
        
    } else if(event.code.includes('Backspace') && num_lettre > 0 && continuer){

        effacer_lettre()

    } else if(event.code.includes('Enter') && num_lettre == 5 && continuer){

        entrer_mot();

    }

});

function aiWrite(lettre){

        ligne = "mot_" + num_ligne;
        //récupere l'element ayant pour id mot_x x etant le numero de la ligne
        list_lettre = this.document.getElementById(ligne).children;

        //verifie si c'est un lettre
        if (tab_lettre.includes(lettre) && num_lettre < 5 && continuer) {

            ajout_lettre(lettre);
    
        
        } else if(lettre == 'Backspace' && num_lettre > 0 && continuer){
    
            effacer_lettre()
    
        } else if( lettre == 'Enter' && num_lettre == 5 && continuer){
    
            entrer_mot();
    
        }else{
            console.log('test');
        }

}

//ajoute une balise p et un lettre a un div
function ajout_lettre (lettre_tapper){

    let node = document.createElement('p'); 
    node.innerHTML = lettre_tapper;

    list_lettre[num_lettre].appendChild(node);

    mot_tapper += lettre_tapper.toUpperCase();
    num_lettre += 1;

}

//efface une lettre
function effacer_lettre(){

    num_lettre -= 1
    list_lettre[num_lettre].firstChild.remove();

     //supprime le dernier caractere en retournant la chaine de caractere sans le dernier element
    mot_tapper = mot_tapper.substring(0, mot_tapper.length - 1);
        
}


function entrer_mot(){

    if(tab_mots.includes(mot_tapper)){

        valide();
        num_ligne += 1;
        colorisation();
        etat_du_jeu();
        reset();

    }else{
        alert("le mot existe pas")
    }

}

//fonction qui verifie le mot
function valide(){

    // split les deux mots dans un tableau
    tab_mot_tapper =  mot_tapper.split('');
    tab_mot_selec = mot_selec.split('');

    for (let i = 0; i < long_mot; i++) {

        //selection une lettre de chaque mot
        let lettre_mot_tapper = tab_mot_tapper[i];
        let lettre_mot_selec = tab_mot_selec[i];

        //verifie si la lettre fait partie du mot
        let lettre_existe = tab_mot_selec.includes(lettre_mot_tapper);

        //check si la lettre est dans le mot
        if (lettre_existe) {

            //check si la lettre est dans la bonne position
            if(lettre_mot_tapper == lettre_mot_selec){

                tab_couleur[i] = "v";

            }else{

                tab_couleur[i] = "na";

            }

        //la lettre n'est pas présent dans le mot    
        } else {
            
            tab_couleur.push("n");

        }

    }

    console.log(tab_couleur);
    autre_lettre();

    
}

//applique les classe selon existence ou non de la lettre
function colorisation(){

    for (let x = 0; x < tab_couleur.length; x++) {
        
        switch (tab_couleur[x]) {
            case "v":
                list_lettre[x].classList.add("correcte");
                document.querySelector('[data-id="Key' + tab_mot_tapper[x].toLowerCase() + '"]').classList.add("correcte"); 
                break;

            case "o":
                list_lettre[x].classList.add("existe");
                document.querySelector('[data-id="Key' + tab_mot_tapper[x].toLowerCase() + '"]').classList.add("existe"); 
                break;

            case "n":
                list_lettre[x].classList.add("existe_pas");
                document.querySelector('[data-id="Key' + tab_mot_tapper[x].toLowerCase() + '"]').classList.add("existe_pas"); 
                break;

            default:
                break;
        }

    }

}

function etat_du_jeu(){

    if (mot_tapper == mot_selec){

        modal_fin("Félicitation");
        continuer = false


    }else if(num_ligne == ligne_max){

        modal_fin("Oupss");
        continuer = false

    }

}

//selection du mot a trouver
function select_mot(){
    mot_selec = tab_mots[getRandomInt(tab_mots.length)].toUpperCase();
    console.log(mot_selec);
}
//fonction qui retourne un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//reste variable
function reset(){
    num_lettre = 0
    lettre_tappez = "";
    mot_tapper = "";
    tab_couleur = [];
    
}
//function nombre occurence d'une lettre dans le mots
function nombre_occurence(lettre,tableau){
    
    let nb_lettre_occurence = 0;

    for (let y = 0; y < tableau.length; y++) {
        
        if (lettre == tableau[y]) {
            nb_lettre_occurence += 1 ;
        }
        
    }

    return nb_lettre_occurence;

}

function autre_lettre(){
    let nb_lettre = 0;
    let nb_occurence_select = 0;
    for (let z = 0; z < tab_couleur.length; z++) {
        
        if(tab_couleur[z] == "na"){

            lettre = tab_mot_tapper[z];

            console.log(lettre);

            nb_occurence_select = nombre_occurence(lettre,tab_mot_selec);

            console.log(nb_occurence_select);

            for (let w = 0; w < tab_couleur.length; w++) {
              
                if((tab_couleur[w] == "v" || tab_couleur[w] == "o") && lettre == tab_mot_tapper[w]){

                    nb_occurence_select = nb_occurence_select + -1;

                }

            }
            console.log("avant coleur " + nb_occurence_select);
            if (nb_occurence_select > 0) {
                
                tab_couleur[z] = "o";

            }

        }
  
    }
    
}

//modal de fin
function modal_fin(resultat){

    let espace_modal = document.getElementById("resultat");
    
    //cree balise h3 et y ajoute du texte
    let h3_text = document.createElement('h3');
    h3_text.innerHTML = resultat ;

    //ajoute la balise au modale
    espace_modal.appendChild(h3_text);

    //cree balise p et y ajoute du texte
    let p_text = document.createElement('p');
    p_text.innerHTML = "le mot etait: " + mot_selec;

    //ajoute la balise au modale
    espace_modal.appendChild(p_text);

    let myModal = new bootstrap.Modal(document.getElementById('modal_stat'));
    
    myModal.show();

    
}



