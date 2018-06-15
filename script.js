
var btn = document.querySelector('.add');
var remove = document.querySelector('.draggable');

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
};


function dragEnter(e) {
  e.preventDefault();
  this.classList.add('over');
}

function dragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  this.classList.remove('over');
}


function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function dragDrop(e) {
  e.preventDefault();
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}


function dragEnd(e) {
  e.preventDefault();
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}


function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
  el.addEventListener('dragstart', drag, false);
}

var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});

var i = 1;
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


function saveToArray(){
var ul = document.getElementsByTagName('ul');
var li = ul[0].getElementsByTagName('li');
var array = new Array();
for (var i = 0; i < li.length; i++) {
   array.push(li[i].innerText)
    }
             
blob = new Blob([array], { type: 'text/plain' }),
a = document.createElement('a');
a.download = "mojaLista.txt";
a.href = (window.webkitURL || window.URL).createObjectURL(blob);
a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
a.click();
}
