//selektory przypisujace elementy do pól
var btn = document.querySelector('.add');
var remove = document.querySelector('.draggable');

//zostaje uruchomiony kiedy obiekt zaczyna byc przesuwany
function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
};

//zostaje uruchomiony, kiedy przeciagany element zostanie przesunięty na pole, gdzie może być on upuszczony
function dragEnter(e) {
  e.preventDefault();
  this.classList.add('over');
}

//uruchamia się, kiedy element zostanie przesunięty poza pole, gdzie może być upuszczony
function dragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  this.classList.remove('over');
}

//element jest w trakcie przeciągania nad polem możliwym do upuszczenia
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}
//odpala się po upuszczeniu elementu
function dragDrop(e) {
  e.preventDefault();
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

//operacja przeciągania jest kończona
function dragEnd(e) {
  e.preventDefault();
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}

//dodawanie efektów
function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
  el.addEventListener('dragstart', drag, false);
}
//dodawanie eventów do stworzonego obiektu
var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});

var i = 1;
//dodawanie obiektów do listy
function addNewItem() {
  var newItem = document.querySelector('.input').value;
  if (newItem != '') {
    document.querySelector('.input').value = '';
    var li = document.createElement('li');
    var attr = document.createAttribute('draggable');
    var ul = document.querySelector('ul');
    var nod = document.createAttribute('id');
    nod.value = 'valueadd'+i;
    i++;
    li.className = 'draggable';
    attr.value = 'true';
    li.setAttributeNode(nod);
    li.setAttributeNode(attr);
    li.appendChild(document.createTextNode(newItem));
    ul.appendChild(li);
    addEventsDragAndDrop(li);
  }
}

btn.addEventListener('click', addNewItem);

//funkcje dla pola upuszczania
function allowDrop(ev)
{
ev.preventDefault();
}
function drag(ev)
{
ev.dataTransfer.setData("Text",ev.target.id);
}
function drop(ev)
{
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
var el = document.getElementById(data);
el.parentNode.removeChild(el);
}

//zapisywanie ustawionej listy do arraylist
function saveToArray(){
var ul = document.getElementsByTagName('ul');
            var li = ul[0].getElementsByTagName('li');
            var array = new Array();
            for (var i = 0; i < li.length; i++) {
                array.push(li[i].innerText)
            }
              //tworzenie pliku mozliwego do pobrania z naszą listą
              blob = new Blob([array], { type: 'text/plain' }),
              a = document.createElement('a');
              a.download = "mojaLista.txt";
              a.href = (window.webkitURL || window.URL).createObjectURL(blob);
              a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
              a.click();
          }
